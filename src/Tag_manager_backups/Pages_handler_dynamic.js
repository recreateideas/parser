import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';


class Page extends React.Component {



  handle_pages() {
    let modules = JSON.parse('[{"name":"ddl","dependancies":["tha"]},{"name":"tha"},{"name":"dca","dependancies":["ddl","tha"]}]');
    let clickthrough = JSON.parse('{"name":"clickthrough","pattern":"clickthrough","strategy":"document_selector","transfer_method":"pixel","type":"","ddl_component_mappings":{"component_name":"page","referrer":"referrer","location":"destinationURL","title":"page_title"}}');
    let ddl_mapping = JSON.parse('{"component_name":"page","referrer":"referrer","location":"destinationURL","title":"page_title"}');
    var root = {
      tag_data: {
        11392: {
          baseAppId: "9178",
          base_campaign_id: "2796",
          email_campaign_id: "2798",
          basket_timeout: "1800"
        },
        pixel_src: "//platform.cloud-iq.com.au/cartrecovery/",
        domain: "www.candlemaking-au.com",
        multi_bytes: "false"
      },
      pages: {
        0: {
          name: 'Category',
          status: 'enabled',
          match: {
            page_match: '/Page Match',
            element_match: '#Element Match',
          },
          inputs: {
            add_to_basket: '#Add to Basket',
          }
        },
        1: {
          name: 'ProductPage',
          status: 'enabled',
          match: {
            page_match: '/Page Match',
            element_exclude: '#Element Match',
          },
          inputs: {
            add_to_basket: '#Add to Basket',
          }
        },
        2: {
          name: 'Login',
          status: 'enabled',
          match: {
            page_match: '/Page Match',
            element_match: '#Element Match',
          },
          inputs: {
            click: '#Login Submit',
            blur: {
              cloudiqConsumerEmail: '#Email input Id'
            }
          }
        },
        3: {
          name: 'Register',
          status: 'enabled',
          match: {
            page_match: '/Page Match',
            element_match: '#Element Match',
          },
          inputs: {
            click: '#Element',
            blur: {
              cloudiqConsumerEmail: '#Email input Id',
              cloudiqConsumerFirstName: '#Name input Id',
              cloudiqConsumerLastName: '#Last name input Id',
              cloudiqConsumerNumber: '#Phone input Id',
              cloudiqConsumerZipCode: '#postcode input Id',
            }
          }
        },
        4: {
          name: 'BasketPage',
          status: 'enabled',
          match: {
            page_exclude: '/Page Match',
            element_match: '#Element Match',
          },
          inputs: {
            basket: {
              container: '#Basket element',
              cloudiqProductImage: '#Product image',
              cloudiqProductName: '#Product name',
              cloudiqProductQuantity: '#Product quantity',
              cloudiqProductPrice: '#Product price',
              cloudiqProductTotal: '#Product total',
            },
            cloudiqBasketTotal: '#Basket total',
            cloudiqBasketSubTotal: '#Basket subtotal'
          }
        },
        5: {
          name: 'MiniBasket',
          status: 'enabled',
          match: {
            page_match: '/Page Match',
            element_match: '#Element Match',
          },
          inputs: {
            basket: {
              container: '#Basket element',
              cloudiqProductImage: '#Product image',
              cloudiqProductName: '#Product name',
              cloudiqProductQuantity: '#Product quantity',
              cloudiqProductPrice: '#Product price',
              cloudiqProductTotal: '#Product total',
            },
            cloudiqBasketTotal: '#Basket total',
            cloudiqBasketSubTotal: '#Basket subtotal'
          }
        },
        6: {
          name: 'CheckoutLogin',
          status: 'enabled',
          match: {
            page_match: '/Page Match',
            element_match: '#Element Match',
          },
          inputs: {
            click: '#Element',
            blur: {
              cloudiqConsumerEmail: '#Email input Id'
            },
            cloudiqBasketTotal: '#Basket total',
            cloudiqBasketSubTotal: '#Basket subtotal'
          }
        },
        7: {
          name: 'CheckoutRegister',
          status: 'enabled',
          match: {
            page_match: '/Page Match',
            element_match: '#Element Match',
          },
          inputs: {
            click: '#Element',
            blur: {
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
          status: 'enabled',
          match: {
            page_match: '/Page Match',
            element_match: '#Element Match',
          },
          inputs: {
            cloudiqBasketPayment: '#Payment_method',
            cloudiqDiscountCode: '#DiscountCode',
          }
        },
        9: {
          name: 'ConfirmationPage',
          status: 'enabled',
          match: {
            page_match: '/Page Match',
            element_match: '#Element Match',
          },
          inputs: {
            cloudiqOrderNumber: '#OrderElement',
            cloudiqBasketTotal: '#LastTotal'
          }
        }/*,
         10: {
             name: 'AccountPage',
             status: 'enabled',
             match: {
                 page_match: '/Page Match',
                 element_match: '#Element Match',
             },
             inputs: {
                cloudiqRecallID: '#recallID',
                 cloudiqOrderNumber: '#OrderElement',
                 blur: {
                         cloudiqConsumerEmail: '#Email input Id',
                 }
             }
         }* //*works*/
      }
    };

    const starter = {
      page_load: {
        pattern: 'page',
        strategy: 'document_selector',
        page_load: 'true',
        wait_on_load: 'true',
      },
      category_page: {
        strategy: 'query_selector',
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
      basket_page: {
        pattern: 'page',
        strategy: 'document_selector',
        cart_started: 'true',
        page_load: 'true',
        custom_function: 'ciqdca.basket_capture',
        wait_on_load: 'true',
      },
      total_capture: {
        pattern: 'page',
        type: 'group_only',
        strategy: 'document_selector',
        custom_function: 'ciqdca.total_capture',
        transmission_group: 'basket_capture'
      },
      payment_method: {
        strategy: 'query_selector',
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
        start_session: 'true',
        wait_on_load: 'true'
      },
      transmission_target: {
        strategy: 'document_selector',
        pattern: 'page',
        type: 'group_only',
        custom_function: 'ciqdca.mixed_inputs_capture'
      },
      discount_code_capture:{
        strategy: 'query_selector',
        type: 'blur',
        custom_function: 'ciqdca.capture_discount_code',
        cart_started: 'true',
        wait_on_load: 'true'
      },
      extra_capture: {
        strategy: 'query_selector',
        type: '',
        custom_function: 'ciqdca.mixed_inputs_capture',
        wait_on_load: 'true'
      },
      innerText_capture: {
        strategy: 'query_selector',
        type: '',
        custom_function: 'ciqdca.innerText_capture',
        wait_on_load: 'true'
      }
    };

    const app_id = Object.keys(root.tag_data)[0];
    let transmission_group = [], stringName;
    let targets_json = this.initializeJSON(modules,app_id,root);
    let targetsList = targets_json.targets[app_id];
    targetsList.clickthrough = JSON.stringify(clickthrough);

    Object.keys(root.pages).map((label) => {
      const currentPage = root.pages[label];
      if (currentPage.status === 'enabled') {               //if page enabled creates the page_load event by default
        let target_label = currentPage.name.replace(/\s/g, '_');
        targetsList = this.concatTarget(ddl_mapping, targetsList, target_label, starter.page_load, currentPage.match, null, null);
        transmission_group.push(target_label);              //builds the transmission group array by default
        let currentInputs = currentPage.inputs;
        Object.keys(currentInputs).map((key, value) => {    //configures the inputs that by default don't need a transmission group
          if (key !== 'blur' && key !== 'click') {
            switch (key) {
              case 'cloudiqBasketPayment':
                targetsList[target_label] = this.targetMapping(targetsList[target_label], starter.payment_method, currentPage, null, key);
                targetsList[target_label].pattern = currentInputs[key];
                break;
              case 'cloudiqOrderNumber':
                targetsList[target_label] = this.targetMapping(targetsList[target_label], starter.order_number, currentPage, null, key);
                delete targetsList[target_label].wait_on_load;
                /*create the satellite target*/
                stringName = 'order_number_capture';
                targetsList = this.concatTarget(null, targetsList, stringName, starter.order_number_capture, currentPage.match, currentInputs, null);
                break;
              case 'basket':
                targetsList[target_label] = this.targetMapping(targetsList[target_label], starter.basket_page, currentPage, null, 'cloudiqBasket');
                currentPage.name.match(/Mini/) ? delete targetsList[target_label].page_load : null;
                targetsList[target_label].basket = currentInputs.basket;
                /*create the satellite target*/
                stringName = 'total_capture_' + target_label;
                targetsList = this.concatTarget(null, targetsList, stringName, starter.total_capture, currentInputs, null, 'cloudiqBasket');
                targetsList[stringName].transmission_group = target_label;
                break;
              case 'cloudiqBasketTotal':
              case 'cloudiqBasketSubTotal':
                if (currentPage.name === 'ConfirmationPage') targetsList['ConfirmationPage'][key] = currentInputs[key]; //current page is ConfirmationPage I append the field to the capturing satellite target
                else {
                  stringName = 'total_capture_' + target_label;
                  targetsList = this.concatTarget(null, targetsList, stringName, starter.total_capture, currentInputs, null, 'cloudiqBasket');
                  targetsList[stringName].transmission_group = target_label;
                }
                break;
              case 'cloudiqDiscountCode':
                stringName = 'discount_code_capture_' + target_label;
                targetsList = this.concatTarget(null, targetsList, stringName, starter.discount_code_capture, currentInputs, currentPage.match, key);
                targetsList[stringName].pattern = currentInputs[key];
                break;
              case 'add_to_basket':
                switch (currentPage.name) { 
                  case 'Category':
                    targetsList[target_label] = this.targetMapping(targetsList[target_label], starter.category_page, currentPage, null, key);
                    delete targetsList[target_label].page_load;
                    break;
                  case 'ProductPage':
                    targetsList[target_label] = this.targetMapping(targetsList[target_label], starter.product_page, currentPage, null, key);
                    target_label = target_label + '_click';
                    targetsList = this.concatTarget(ddl_mapping, targetsList, target_label, starter.product_page_click, currentPage.match, null, null);
                    break;
                  default: break;
                }
                targetsList[target_label].pattern = currentInputs.add_to_basket;
                break;
              default:
                stringName = key + '_capture_' + target_label;
                targetsList = this.concatTarget(null, targetsList, stringName, starter.extra_capture, currentInputs, currentPage.match, key);
                targetsList[stringName].pattern = currentInputs[key];
              break;
            }
            transmission_group = [];  // clears the transmission group if the fields don't require it
          }
          else if (key === 'blur' || key === 'click') {     // if blur or click -> need to create a copy of the target
            target_label = currentPage.name.replace(/\s/g, '_') + '_' + key;
            targetsList = this.concatTarget(ddl_mapping, targetsList, target_label, starter.login_capture_click_blur, currentPage.match, null, null);
            targetsList[target_label].type = key;
            targetsList[target_label].pattern = (key === 'blur' ? this.stringify_array(Object.values(currentInputs.blur)) : currentInputs.click);
            transmission_group.push(target_label);
            if (key === 'blur') {                           // only there is a blur we need to create a transmission group
              const target_label = currentPage.name.replace(/\s/g, '_') + '_capture';
              targetsList = this.concatTarget(null, targetsList, target_label, starter.transmission_target, null, null, null);
              targetsList[target_label].fields = currentPage.inputs.blur;
              targetsList[target_label].transmission_group = this.stringify_array(transmission_group);
              //////
              transmission_group = [];
            }
          }
        });
      }
    });

    targets_json = this.sanitize_json(JSON.stringify(targets_json));
    console.log(targets_json);
    return targets_json;
  }

  initializeJSON(modules, app_id, root) {
    const tag_data = JSON.stringify(root.tag_data);
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
    if (map1) Object.keys(map1).map((value) => { target[value] = map1[value]; }); // map page settings
    if (map2) Object.keys(map2).map((input) => { // map page inputs
        if (includeOnly) input.match(includeOnly) ? target[input] = map2[input] : null;
        else target[input] = map2[input]; });
    if (map3) Object.keys(map3).map((value) => { target[value] = map3[value];});  // map page settings
    return target;
  }

  stringify_array(array) {
    let string = ''
    array.map((value, i) => { string += value + ','; });
    return string.replace(/,$/, '');
  }

  sanitize_json(string) {
    return string.replace(/\\"/gm, '"').replace(/"{/gm, '{').replace(/}"/gm, '}');
  }

  render() {
    return (
      <div >{this.handle_pages() }</div>
    )
  }
}

export default Page;


/*fix:
  update discount code to be captured with mixed_inputs_capture
  add default_request
  add innerText capture
  adjust custom functions
  currency (add to starter)
  exclude confirmation page from all other pages
*/
