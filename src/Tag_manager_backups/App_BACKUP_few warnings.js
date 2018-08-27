import React from 'react';
import './App.css';

class Page extends React.Component {

  matchObject = {};

  config_json() {
    //////////////
    const modules = JSON.parse('[{"name":"ddl","dependancies":["tha"]},{"name":"tha"},{"name":"dca","dependancies":["ddl","tha"]}]');
    const clickthrough = JSON.parse('{"name":"clickthrough","pattern":"clickthrough","strategy":"document_selector","transfer_method":"pixel","type":"","ddl_component_mappings":{"component_name":"page","referrer":"referrer","location":"destinationURL","title":"page_title"}}');
    const ddl_mapping = JSON.parse('{"component_name":"page","referrer":"referrer","location":"destinationURL","title":"page_title"}');

    const tag_data = {
      896: {
        base_campaign_id: "241",
        email_campaign_id: "243",
        basket_timeout: "1800"
      },
      pixel_src: "//platform3.cloud-iq.com.au/cartrecovery/",
      domain: "australianonlinecarparts.com.au",
      multi_bytes: "false"
    };

    const starter = {
      default_request: {
        pattern: 'page',
        strategy: 'document_selector',
        page_load: 'true',
        wait_on_load: 'true',
      },
      page_load: {
        pattern: 'page',
        strategy: 'document_selector',
        page_load: 'true',
        wait_on_load: 'true',
      },
      category_page: {
        strategy: 'query_selector',
        pattern: 'body',
        cart_started: 'true',
        product_viewed: 'true',
        type: 'click',
        wait_on_load: 'true',
      },
      product_page: {
        strategy: 'document_selector',
        pattern: 'page',
        product_viewed: 'true',
        wait_on_load: 'true',
      },
      product_page_click: {
        strategy: 'query_selector',
        pattern: 'body',
        cart_started: 'true',
        wait_on_load: 'true',
        type: 'click',
      },
      confirmation_page: {
        pattern: 'page',
        strategy: 'document_selector',
        cart_started: 'true',
        page_load: 'true',
      },
      basket_total_capture: {
        pattern: 'page',
        strategy: 'document_selector',
        page_load: 'true',
        params: {
          extra_fields: {
            cloudiqBasketPayment: "credit_card"
          }
        },
        custom_function: 'ciqdca.total_capture',
        wait_on_load: 'true'
      },
      basket_capture: {
        pattern: 'page',
        strategy: 'document_selector',
        type: 'group_only',
        transmission_group: 'basket_page_total_capture',
        custom_function: 'ciqdca.basket_capture',
      },
      total_capture: {
        pattern: 'page',
        strategy: 'document_selector',
        custom_function: 'ciqdca.total_capture',
        transmission_group: 'basket_capture'
      },
      payment_method: {
        strategy: 'query_selector',
        pattern: 'body',
        type: 'click',
        custom_function: 'ciqdca.payment_capture',
        wait_on_load: 'true',
      },
      order_number: {
        strategy: 'document_selector',
        pattern: 'page',
        cart_started: 'true',
        event_mode: 'cancel'
      },
      order_number_capture: {
        strategy: 'document_selector',
        pattern: 'page',
        event_mode: 'cancel',
        cart_started: 'true',
        wait_on_load: 'true',
        custom_function: 'ciqdca.order_number'
      },
      login_capture_click_blur: {
        strategy: 'query_selector',
        pattern: 'body',
        start_session: 'true',
        wait_on_load: 'true'
      },
      transmission_target: {
        strategy: 'document_selector',
        pattern: 'page',
        type: 'group_only',
        custom_function: 'ciqdca.mixed_inputs_capture'
      },
      discount_code_capture: {
        strategy: 'query_selector',
        pattern: 'body',
        type: 'blur',
        cart_started: 'true',
        wait_on_load: 'true'
      },
      paypal_express_shortcut: {
        strategy: 'query_selector',
        pattern: 'body',
        type: 'click',
        params: {
          extra_fields: {
            cloudiqBasketPayment: "paypalExpressShortcut"
          }
        },
        cart_started: 'true',
        wait_on_load: 'true',
      },
      extra_capture: {
        strategy: 'query_selector',
        pattern: 'body',
        type: '',
        custom_function: 'ciqdca.mixed_inputs_capture',
        wait_on_load: 'true'
      },
      innerText_capture: {
        strategy: 'document_selector',
        pattern: 'page',
        type: '',
        custom_function: 'ciqdca.innerText_capture',
        wait_on_load: 'true'
      }
    };

    const allPages = {
      0: {
        name: 'Category',
        status: 'disabled',
        inputs: {
          match: {
            page_match: '',
            element_match: 'form.buying-options',
            element_exclude: '#main-image',
            page_exclude: '',
          },
          add_to_basket: '.addtocart',
        }
      },
      1: {
        name: 'ProductPage',
        status: 'enabled',
        inputs: {
          match: {
            element_match: '#main-image',
          },
          add_to_basket: '.addtocart',
        }
      },
      2: {
        name: 'Login',
        status: 'enabled',
        inputs: {
          click: '#login [name=submit]',
          match: {
            page_match: '/_myacct',
          },
          fields: {
            cloudiqConsumerEmail: '[name=username]'
          }
        }
      },
      3: {
        name: 'Register',
        status: 'enabled',
        inputs: {
          click: '#register [name=submit]',
          match: {
            page_match: '/_myacct',
          },
          fields: {
            cloudiqConsumerEmail: '[name=reg_email]',
          }
        }
      },
      4: {
        name: 'BasketPage',
        status: 'disabled',
        inputs: {
          match: {
            page_match: '/cart',
          },
          basket_container: '.CartContents.Stylize.General > tbody > tr',
          basket: {
            cloudiqProductImage: 'a img',
            cloudiqProductName: '.ProductName a',
            cloudiqProductQuantity: '[id^=quantity-qty]',
            cloudiqProductPrice: '.CartItemIndividualPrice',
            cloudiqProductTotal: '.CartItemTotalPrice .ProductPrice',
          },
          cloudiqBasketTotal: '.SubTotal.gtotal .ProductPrice',
          paypalExpressShortcut: '#PayPalExpressCheckoutButton',
          cloudiqDiscountCode: '#cartCouponCode'
        }
      },
      5: {
        name: 'MiniBasket',
        status: 'enabled',
        inputs: {
          match: {
            element_match: '#neto-dropdown #cartcontents li .left img',
          },
          basket_container: '#neto-dropdown #cartcontents li',
          basket: {
            cloudiqProductImage: '.left img',
            cloudiqProductName: '.right .title',
            cloudiqProductPrice: '.right .price',
          },
          cloudiqBasketTotal: '#neto-dropdown b:nth-child(5)'
        }
      },
      6: {
        name: 'CheckoutLogin',
        status: 'disabled',
        inputs: {
          match: {
            page_match: '/Page Match0',
            element_match: '#Element Match0',
          },
          click: '#Element',
          fields: {
            cloudiqConsumerEmail: '#Email input Id'
          },
          cloudiqBasketTotal: '#Basket total',
          cloudiqBasketSubTotal: '#Basket subtotal'
        }
      },
      7: {
        name: 'CheckoutRegister',
        status: 'disabled',
        inputs: {
          match: {
            page_match: '/Page Match0',
            element_match: '#Element Match0',
          },
          click: '#Element',
          fields: {
            cloudiqConsumerEmail: '#Email input Id',
            cloudiqConsumerFirstName: '#Name input Id',
            cloudiqConsumerLastName: '#Last name input Id',
            cloudiqConsumerNumber: '#Phone input Id',
            cloudiqConsumerZipCode: '#postcode input Id',
          },
          cloudiqRecallID: '#recallID',
          cloudiqBasketTotal: '#Basket total',
          cloudiqBasketSubTotal: '#Basket subtotal'
        }
      },
      8: {
        name: 'CheckoutPayment',
        status: 'disabled',
        inputs: {
          match: {
            page_match: '/Page Match0',
            element_match: '#Element Match0',
          },
          cloudiqBasketPayment: '#Payment_method',
          cloudiqDiscountCode: '#DiscountCode',
        }
      },
      9: {
        name: 'ConfirmationPage',
        status: 'enabled',
        inputs: {
          match: {
            page_match: '/ConfirmationPage Match0',
            element_match: '#ConfirmationElement Match0',
          },
          cloudiqOrderNumber: '#OrderElement',
          cloudiqBasketTotal: '#LastTotal'
        }
      },
      10: {
        name: 'AccountPage',
        status: 'disabled',
        inputs: {
          match: {
            page_match: '/Page Match0',
            element_match: '#Element Match0',
          },
          cloudiqRecallID: '#recallID',
          fields: {
            cloudiqConsumerEmail: '#Email input Id',
          }
        }
      }
    };
    //////////////////
    /** assign */

    const app_id = Object.keys(tag_data)[0];
    let transmission_group = [],
      stringName, totalTargetLabel;
    let targets_json = this.initializeJSON(modules, app_id, tag_data);
    let targetList = targets_json.targets[app_id];
    targetList.clickthrough = JSON.stringify(clickthrough);
    Object.keys(allPages).forEach((label) => {
      const currentPage = allPages[label];
      if (currentPage.status === 'enabled') { //if page enabled creates the page_load event by default
        let pageMatch = currentPage.inputs.match;
        if (currentPage.inputs.hasOwnProperty('cloudiqBasketTotal') || currentPage.inputs.hasOwnProperty('cloudiqBasketSubTotalTotal')) { //saves the name of the target we want to attach the total_capture to
          totalTargetLabel = currentPage.name;
        }
        let target_label = currentPage.name.replace(/\s/g, '_');
        //create defaultRequest
        this.concatTarget(ddl_mapping, targetList, target_label, starter.page_load, pageMatch, null, null);
        transmission_group.push(target_label); //builds the transmission group array by default
        console.log(targetList[target_label]);
        if (target_label.match(/checkout|confirmation/i)) {
          delete targetList[target_label].start_session; // fix
          targetList[target_label].cart_started = 'true';
        }
        let currentInputs = currentPage.inputs;
        //for (let key in currentInputs){
        Object.keys(currentInputs)
          .filter(key => currentInputs[key] && key === 'match')
          .map((key) => this.buildEmptyMatchObject(currentInputs[key])); // creates the logic of the fields

        Object.keys(currentInputs)
          .filter(key => currentInputs[key] && key !== 'fields' && key !== 'click' && key !== 'match')
          .map((key) => { //configures the inputs that don't need a transmission group and need a specific behaviour
            switch (key) {
              case 'cloudiqBasketPayment':
                this.targetMapping(targetList[target_label], starter.payment_method, currentPage, null, key);
                targetList[target_label].pattern = currentInputs[key];
                break;
              case 'cloudiqOrderNumber':
                this.targetMapping(targetList[target_label], starter.order_number, currentPage, null, key);
                delete targetList[target_label].wait_on_load;
                /*create the satellite target*/
                stringName = 'order_number_capture';
                this.concatTarget(ddl_mapping, targetList, stringName, starter.order_number_capture, currentInputs, pageMatch, 'cloudiq');
                break;
              case 'basket_container':
              case 'basket':
                stringName = 'total_capture_' + target_label;
                this.targetMapping(targetList[target_label], starter.basket_total_capture, currentInputs, null, 'cloudiqBasket');
                currentPage.name.match(/Mini/) ? delete targetList[target_label].page_load : null;
                console.log(target_label.match(/MiniBasket/));

                /*create the satellite target*/
                stringName = 'basket_capture_' + target_label;
                this.concatTarget(ddl_mapping, targetList, stringName, starter.basket_capture, currentInputs, null, 'basket');
                targetList[stringName].transmission_group = target_label;
                break;
              case 'cloudiqBasketTotal':
              case 'cloudiqBasketSubTotal':
                if (!this.isBasket(target_label)) {
                  stringName = 'total_capture_' + totalTargetLabel;
                  this.concatTarget(ddl_mapping, targetList, stringName, starter.total_capture, currentInputs, null, 'cloudiqBasket');
                  targetList[stringName].transmission_group = totalTargetLabel;
                }
                break;
              case 'cloudiqDiscountCode':
                stringName = 'discount_code_capture_' + target_label;
                let discount_code_ddl_mapping = this.addToDDL(ddl_mapping, this.sanitizeNameId(currentInputs[key]), key);
                /* creates a separate target to capture the discount code through ddl mapping*/
                this.concatTarget(discount_code_ddl_mapping, targetList, stringName, starter.discount_code_capture, currentInputs, pageMatch, key);
                targetList[stringName].pattern = currentInputs[key];
                delete targetList[stringName][key];
                break;
              case 'add_to_basket':
                switch (currentPage.name) {
                  case 'Category':
                    targetList[target_label] = this.targetMapping(targetList[target_label], starter.category_page, currentPage, null, key);
                    delete targetList[target_label].page_load;
                    break;
                  case 'ProductPage':
                    targetList[target_label] = this.targetMapping(targetList[target_label], starter.product_page, currentPage, null, key);
                    target_label = target_label + '_click';
                    targetList = this.concatTarget(ddl_mapping, targetList, target_label, starter.product_page_click, pageMatch, null, null);
                    break;
                  default:
                    break;
                }
                targetList[target_label].pattern = currentInputs.add_to_basket;
                break;
              case 'paypalExpressShortcut':
                stringName = 'paypal_express_shortcut_' + target_label;
                this.concatTarget(ddl_mapping, targetList, stringName, starter.paypal_express_shortcut, currentInputs, pageMatch, key);
                targetList[stringName].pattern = currentInputs[key];
                delete targetList[stringName][key];
                break;
              default:
                /*set the fallback behaviour of an input to capture innerText */
                stringName = key + '_capture_' + target_label;
                this.concatTarget(null, targetList, stringName, starter.innerText_capture, currentInputs, pageMatch, key);
                /*targetList[stringName].pattern = currentInputs[key];//do not delete*/
                break;
            }
            transmission_group = []; // we don't need the above values for any transmission group
          });

        Object.keys(currentInputs)
          .filter(key => key === 'fields' || key === 'click') // if blur or click -> need to create a copy of the target
          .map((key) => {
            key = (key === 'fields' ? 'blur' : 'click');
            target_label = currentPage.name.replace(/\s/g, '_') + '_' + key;
            this.concatTarget(ddl_mapping, targetList, target_label, starter.login_capture_click_blur, pageMatch, null, null);
            targetList[target_label].type = key;
            targetList[target_label].pattern = (key === 'blur' ? this.stringify_array(Object.values(currentInputs.fields)) : currentInputs.click);
            transmission_group.push(target_label);
            if (key === 'blur') { // only there is a blur we need to create a transmission group
              const target_label = currentPage.name.replace(/\s/g, '_') + '_capture';
              this.concatTarget(ddl_mapping, targetList, target_label, starter.transmission_target, null, null, null);
              targetList[target_label].fields = currentPage.inputs.fields;
              targetList[target_label].transmission_group = this.stringify_array(transmission_group);
              //////
              transmission_group = [];
            }
            return;
          });
      }
      return;
    });
    this.concatTarget(ddl_mapping, targetList, 'default_page_load', starter.default_request, this.getDefaultPageMatch(targetList), null, null);
    this.excludeConfirmationPage(targetList);
    targets_json = this.sanitize_json(JSON.stringify(targets_json));
    //console.log(targets_json);
    return targets_json;
  }

  isBasket(target) {
    if (target.match(/BasketPage/) || target.match(/MiniBasket/))
      return true;
    else return;
  }

  buildEmptyMatchObject(object) {
    Object.keys(object)
      .filter(field => Object.keys(this.matchObject).indexOf(field) === -1)
      .map(field => {
        return this.matchObject[field] = [];
      });
  }

  addToDDL(ddl_mapping, key, value) {
    let new_ddl_mapping = Object.assign({}, ddl_mapping);
    new_ddl_mapping[key] = value;
    return new_ddl_mapping;
  }

  excludeConfirmationPage(targetList) {
    let confirmationPageMatch = this.getPageMatchObject(targetList.ConfirmationPage);
    let invertedPageMatch = this.invertPageMatch(confirmationPageMatch);
    Object.keys(targetList)
      .filter(key => key !== 'default_page_load' && key !== 'ConfirmationPage' && key !== 'order_number_capture')
      .map((key) => {
        return Object.keys(targetList[key])
          .filter(field => this.isMatchField(field))
          .map((field) => { //if it has a match field append the correspondent inverted page match
            return invertedPageMatch[field] ?
              (targetList[key][field] = this.stringify_array(targetList[key][field] + ',' + this.stringify_array(invertedPageMatch[field])),
                targetList = this.assignObjectIfAbsent(invertedPageMatch, targetList, key)) :
              targetList = this.assignObjectIfAbsent(invertedPageMatch, targetList, key);
          });
      });
    return targetList;
  }

  assignObjectIfAbsent(invertedPageMatch, targetList, key) {
    Object.keys(invertedPageMatch)
      .filter(matchValue => targetList[key][matchValue] = this.stringify_array(invertedPageMatch[matchValue]))
      .map((matchValue) => {
        return targetList[key][matchValue] = this.stringify_array(invertedPageMatch[matchValue]);
      });
    return targetList;
  }

  getPageMatchObject(ConfirmationPage) {
    let confirmationPageMatch = {};
    ConfirmationPage ?
      Object.keys(ConfirmationPage)
      .filter(key => this.isMatchField(key))
      .map((key) => {
        if (Object.keys(confirmationPageMatch).indexOf(key) === -1) {
          confirmationPageMatch[key] = [];
        }
        confirmationPageMatch[key].push(ConfirmationPage[key])

      }) : null;
    return confirmationPageMatch;
  }

  isMatchField(field) {
    if (field.match('_match') || field.match('_exclude'))
      return true;
    else return false;
  }

  invertPageMatch(pageMatch) {
    let invertedObject = {};
    Object.keys(pageMatch).map((key) => {
      return invertedObject = this.appendToInvertedObject(key, pageMatch, invertedObject);
    });
    return invertedObject;
  }

  getDefaultPageMatch(targetList) {
    let defaultMatch = this.matchObject;
    Object.keys(targetList)
      .filter(target => !targetList[target].type)
      .map((target) => {
        return Object.keys(targetList[target])
          .filter(key => Object.keys(defaultMatch).indexOf(key) !== -1)
          .map((key) => {
            return defaultMatch = this.appendToInvertedObject(key, targetList[target], defaultMatch);
          });
      });
    return (defaultMatch);
  }

  appendToInvertedObject(key, originalObject, invertedObject) {
    let label = this.invertExclude(key);
    !invertedObject[label] ? invertedObject[label] = [] : null;
    if (invertedObject[label].indexOf(originalObject[key]) === -1) invertedObject[label].push(originalObject[key]);
    return invertedObject;
  }

  invertExclude(key) {
    let label, keyArr = [];
    keyArr = key.split('_');
    label = keyArr[0] + '_' + (keyArr[1] === 'match' ? 'exclude' : 'match');
    return label;
  }

  initializeJSON(modules, app_id, tag_data) {
    tag_data = JSON.stringify(tag_data);
    let element = {};
    element.modules = modules;
    element.tag_data = tag_data;
    element.targets = {};
    element.targets[app_id] = {};
    return element;
  };

  concatTarget(ddl_mapping, element, label, map1, map2, map3, includeOnly) {
    element[label] = {};
    element[label].name = label;
    element[label] = this.targetMapping(element[label], map1, map2, map3, includeOnly);
    ddl_mapping ? element[label].ddl_component_mappings = ddl_mapping : null;
    return element;
  }

  targetMapping(target, map1, map2, map3, includeOnly) {
    if (map1) Object.keys(map1).map((input) => {
      return target[input] = (typeof (input) === 'object' ? this.stringify_array(map1[input]) : map1[input]);
    });
    if (map2) Object.keys(map2).map((input) => {
      if (includeOnly) {
        if (input.match(includeOnly)) {
          target[input] = map2[input];
        }
      } else target[input] = (typeof (map2[input]) === 'object' ? this.stringify_array(map2[input]) : map2[input]);
    });
    if (map3) Object.keys(map3).map((input) => {
      return target[input] = (typeof (input) === 'object' ? this.stringify_array(map3[input]) : map3[input]);
    });
    return target;
  }

  stringify_array(array) {
    let string = '';
    if (typeof (array) === 'object') {
      array.filter(value => value && value !== '')
        .map((value, i) => string += value + ',');
    } else string = array;
    string = string.replace(/,$/, '').replace(/^,/, '');
    return string;
  }

  sanitizeNameId(string) {
    string = string.replace(/^#/, '');
    string = string.replace(/^\[name=/, '').replace(/\]$/, '');
    return string;
  }

  sanitize_json(string) {
    return string.replace(/\\"/gm, '"').replace(/"{/gm, '{').replace(/}"/gm, '}');
  }


  render() {
    return ( < div > {
      this.config_json()
    } < /div>)
  }
}

export default Page;


/*fix:
   add async behaviour
   add innerText capture
   currency(add to starter)
*/
