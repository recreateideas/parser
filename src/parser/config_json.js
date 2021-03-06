import * as config from './config';
import { concatTarget, initializeJSON, buildEmptyMatchObject, targetMapping, stringify_array, getDefaultPageMatch, excludeConfirmationPage, isBasket, addToDDL, sanitizeNameId, sanitize_json } from './helpers';
import * as data from './pages_data';  //<-- change here

const configJson = (pages) => {

		const {modules, clickthrough, ddl_mapping,starter} = config, {app_id} = data.tag_data;
	
		let tag_data = {
			pixel_src: data.tag_data.pixel_src,
			domain: data.tag_data.domain,
			multi_bytes: data.tag_data.multi_bytes,
			[app_id]:{
				base_campaign_id: data.tag_data.base_campaign_id,
				email_campaign_id: data.tag_data.email_campaign_id,
				basket_timeout: data.tag_data.basket_timeout,
				base_campaign_id: data.tag_data.base_campaign_id,
			}
		};
		if(data.tag_data.baseAppId) tag_data[app_id]['baseAppId'] = data.tag_data.baseAppId;	
	
		let transmission_group = [], stringName, totalTargetLabel;
		let targets_json = initializeJSON(modules, app_id, tag_data);
		let targetList = targets_json.targets[app_id];
	
		targetList.clickthrough = JSON.stringify(clickthrough);
		Object.keys(pages).forEach((label) => {
			const currentPage = pages[label];
			if (currentPage.status === 'enabled') { //if page enabled creates the page_load event by default
				let currentInputs = currentPage.inputs, pageMatch = currentInputs.match;
				if (currentInputs.hasOwnProperty('cloudiqBasketTotal') || currentInputs.hasOwnProperty('cloudiqBasketSubTotalTotal')) { //saves the name of the target we want to attach the total_capture to
					totalTargetLabel = currentPage.name;
				}
				let target_label = currentPage.name.replace(/\s/g, '_');
				if (currentInputs.hasOwnProperty('fields')) { 				//create defaultRequest
					concatTarget(ddl_mapping, targetList, target_label, starter.page_load, pageMatch, null, null);
				}
				else {
					concatTarget(ddl_mapping, targetList, target_label, starter.no_page_load, pageMatch, null, null);
				}
				transmission_group.push(target_label); //builds the transmission group array by default
				if (target_label.match(/checkout|confirmation/i)) {
					delete targetList[target_label].start_session; // fix
					targetList[target_label].cart_started = 'true';
				}
				//for (let key in currentInputs){
				Object.keys(currentInputs)
					.filter(key => currentInputs[key] && key === 'match')
					.map((key) => buildEmptyMatchObject(currentInputs[key])); // creates the logic of the fields
	
				Object.keys(currentInputs)
					.filter(key => currentInputs[key] && key !== 'fields' && key !== 'click' && key !== 'match')
					.forEach((key) => { //configures the inputs that don't need a transmission group and need a specific behaviour
						switch (key) {
							case 'cloudiqBasketPayment':
								// this.targetMapping(targetList[target_label], starter.payment_method, currentPage, null, key);
								// targetList[target_label].pattern = currentInputs[key];
								stringName = 'payment_capture_' + target_label;
								concatTarget(ddl_mapping, targetList, stringName, starter.payment_method, currentInputs, pageMatch, key);
								targetList[stringName].pattern = currentInputs[key];
								break;
							case 'cloudiqOrderNumber':
								targetMapping(targetList[target_label], starter.order_number, currentPage, null, key);
								delete targetList[target_label].wait_on_load;
								/*create the satellite target*/
								stringName = 'order_number_capture';
								concatTarget(ddl_mapping, targetList, stringName, starter.order_number_capture, currentInputs, pageMatch, 'cloudiqOrderNumber');
								break;
							case 'basket_container':
							case 'basket':
								stringName = 'total_capture_' + target_label;
								currentPage.name.match(/Mini/) ? targetMapping(targetList[target_label], starter.mini_basket_total_capture, currentInputs, null, 'cloudiqBasket'):
								targetMapping(targetList[target_label], starter.basket_total_capture, currentInputs, null, 'cloudiqBasket');

								/*create the satellite target*/
								stringName = 'basket_capture_' + target_label;
								concatTarget(ddl_mapping, targetList, stringName, starter.basket_capture, currentInputs, null, 'basket');
								targetList[stringName].transmission_group = target_label;
								break;
							case 'cloudiqBasketTotal':
							case 'cloudiqBasketSubTotal':
								if (!isBasket(target_label)) {
									stringName = 'total_capture_' + totalTargetLabel;
									concatTarget(ddl_mapping, targetList, stringName, starter.total_capture, currentInputs, null, "Total");
									targetList[stringName].transmission_group = totalTargetLabel;
								}
								break;
							case 'cloudiqDiscountCode':
								stringName = 'discount_code_capture_' + target_label;
								let discount_code_ddl_mapping = addToDDL(ddl_mapping, sanitizeNameId(currentInputs[key]), key);
								/* creates a separate target to capture the discount code through ddl mapping*/
								concatTarget(discount_code_ddl_mapping, targetList, stringName, starter.discount_code_capture, currentInputs, pageMatch, key);
								targetList[stringName].pattern = currentInputs[key];
								delete targetList[stringName][key];
								break;
							case 'add_to_basket':
								switch (currentPage.name) {
									case 'Category':
										targetList[target_label] = targetMapping(targetList[target_label], starter.category_page, currentPage, null, key);
										delete targetList[target_label].page_load;
										break;
									case 'ProductPage':
										targetList[target_label] = targetMapping(targetList[target_label], starter.product_page, currentPage, null, key);
										target_label = target_label + '_click';
										targetList = concatTarget(ddl_mapping, targetList, target_label, starter.product_page_click, pageMatch, null, null);
										break;
									default:
										break;
								}
								targetList[target_label].pattern = currentInputs.add_to_basket;
								break;
							case 'paypalExpressShortcut':
								stringName = 'paypal_express_shortcut_' + target_label;
								concatTarget(ddl_mapping, targetList, stringName, starter.paypal_express_shortcut, currentInputs, pageMatch, key);
								targetList[stringName].pattern = currentInputs[key];
								delete targetList[stringName][key];
								break;
							default:
								/*set the fallback behaviour of an input to capture innerText */
								stringName = key + '_capture_' + target_label;
								concatTarget(null, targetList, stringName, starter.innerText_capture, currentInputs, pageMatch, key);
								/*targetList[stringName].pattern = currentInputs[key];//do not delete*/
								break;
						}
						transmission_group = []; // we don't need the above values for any transmission group
					});

				Object.keys(currentInputs)
					.filter(key => key === 'fields' || key === 'click') // if blur or click -> need to create a copy of the target
					.forEach((key) => {
						key = (key === 'fields' ? 'blur' : 'click');
						target_label = currentPage.name.replace(/\s/g, '_') + '_' + key;
						currentPage.name.match(/checkout/i) ?
							concatTarget(ddl_mapping, targetList, target_label, starter.checkout_field_capture, pageMatch, null, null) :
							concatTarget(ddl_mapping, targetList, target_label, starter.field_capture, pageMatch, null, null);
						targetList[target_label].type = key;
						targetList[target_label].pattern = (key === 'blur' ? stringify_array(Object.values(currentInputs.fields)) : currentInputs.click);
						transmission_group.push(target_label);
						if (key === 'blur') { // only there is a blur we need to create a transmission group
							const target_label = currentPage.name.replace(/\s/g, '_') + '_capture';
							concatTarget(ddl_mapping, targetList, target_label, starter.transmission_target, null, null, null);
							targetList[target_label].fields = currentPage.inputs.fields;
							targetList[target_label].transmission_group = stringify_array(transmission_group);
							//////
							transmission_group = [];
						}
						return;
					});
			}
			return;
		});
		concatTarget(ddl_mapping, targetList, 'default_page_load', starter.default_request, getDefaultPageMatch(targetList), null, null);
		excludeConfirmationPage(targetList);
		targets_json = sanitize_json(JSON.stringify(targets_json));
		//copy
		const copyJSON = document.createElement('input');
		document.body.appendChild(copyJSON);
		copyJSON.setAttribute('value', targets_json);
		copyJSON.select();
		document.execCommand('copy');
		document.body.removeChild(copyJSON);	
	return targets_json;   //<-- comment here
	}
	export default configJson;
