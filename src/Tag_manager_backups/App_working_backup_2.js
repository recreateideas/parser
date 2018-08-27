import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';


class Page extends React.Component {



  handle_pages() {
    let targets_json = {};
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
            inputs: {
              page_match: '/Page Match',
              element_match: '#Element Match',
              page_exclude: '/Page Exclude',
              element_exclude: '#Element Exclude',
              add_to_basket: '#Add to Basket',
            }
          },
          1: {
            name: 'Product',
            status: 'enabled',
            inputs: {
              page_match: 'Page Match',
              element_match: '#Element Match',
              page_exclude: '/Page Exclude',
              element_exclude: '#Element Exclude',
              add_to_basket: '#Add to Basket',
            }
          },
          2: {
            name: 'Login',
            status: 'enabled',
            inputs: {
              page_match: '/Page Match',
              element_match: '#Element Match',
              page_exclude: '/Page Exclude',
              element_exclude: '#Element Exclude',
              click: '#Login Submit',
              fields: {
                cloudiqConsumerEmail: '#Email input Id'
              }
            }
          },
          3: {
            name: 'Register',
            status: 'enabled',
            inputs: {
              page_match: '/Page Match',
              element_match: '#Element Match',
              page_exclude: '/Page Exclude',
              element_exclude: '#Element Exclude',
              click: '#Element',
              fields: {
                cloudiqConsumerEmail: '#Email input Id',
                cloudiqConsumerFirstName: '#Name input Id',
                cloudiqConsumerLastName: '#Last name input Id',
                cloudiqConsumerNumber: '#Phone input Id',
                cloudiqConsumerZipCode: '#postcode input Id',
              }
            }
          },
          4: {
            name: 'Basket',
            status: 'enabled',
            inputs: {
              page_match: '/Page Match',
              element_match: '#Element Match',
              page_exclude: '/Page Exclude',
              element_exclude: '#Element Exclude',
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
            name: 'Mini Basket',
            status: 'enabled',
            inputs: {
              page_match: '/Page Match',
              element_match: '#Element Match',
              page_exclude: '/Page Exclude',
              element_exclude: '#Element Exclude',
              container: '#Basket element',
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
            name: 'Checkout login',
            status: 'enabled',
            inputs: {
              page_match: '/Page Match',
              element_match: '#Element Match',
              page_exclude: '/Page Exclude',
              element_exclude: '#Element Exclude',
              cloudiqConsumerEmail: '#Email input Id',
              click: '#Element',
              fields: {
                cloudiqConsumerEmail: '#Email input Id'
              },
              cloudiqBasketTotal: '#Basket total',
              cloudiqBasketSubTotal: '#Basket subtotal'
            }
          },
          7: {
            name: 'Checkout Register',
            status: 'enabled',
            inputs: {
              page_match: '/Page Match',
              element_match: '#Element Match',
              page_exclude: '/Page Exclude',
              element_exclude: '#Element Exclude',
              click: '#Element',
              fields: {
                cloudiqConsumerEmail: '#Email input Id',
                cloudiqConsumerFirstName: '#Name input Id',
                cloudiqConsumerLastName: '#Last name input Id',
                cloudiqConsumerNumber: '#Phone input Id',
                cloudiqConsumerZipCode: '#postcode input Id',
              },
              cloudiqBasketTotal: '#Basket total',
              cloudiqBasketSubTotal: '#Basket subtotal'
            }
          },
          8: {
            name: 'Checkout Payment',
            status: 'enabled',
            inputs: {
              page_match: '/Page Match',
              element_match: '#Element Match',
              page_exclude: '/Page Exclude',
              element_exclude: '#Element Exclude',
              cloudiqBasketPayment: '#Payment_method'
            }
          },
          9: {
            name: 'Confirmation',
            status: 'enabled',
            inputs: {
              page_match: '/Page Match',
              element_match: '#Element Match',
              page_exclude: '/Page Exclude',
              element_exclude: '#Element Exclude',
              cloudiqOrderNumber: '#Element'
            }
          }
        }
      };


    const page_load = {
      pattern: 'page',
      strategy: 'document_selector',
      page_load: 'true',
      wait_on_load: 'true',
    };

    const category_page = {
      strategy: 'query_selector',
      product_viewed: 'true',
      cart_started: 'true',
      product_viewed: 'true',
      type: 'click',
      wait_on_load: 'true',
    };
    
    const product_page = {
      strategy: 'query_selector',
      product_viewed: 'true',
      wait_on_load: 'true',
    };

    const product_page_click = {
      strategy: 'query_selector',
      product_viewed: 'true',
      cart_started: 'true',
      wait_on_load: 'true',
    };
    const confirmation_page = {
      pattern: 'page',
      strategy: 'document_selector',
      cart_started: 'true',
      page_load: 'true',
    };

    const basket_page = {
      pattern: 'page',
      strategy: 'document_selector',
      cart_started: 'true',
      page_load: 'true',
      custom_function: 'ciqdca.basket_capture',
      wait_on_load: 'true',
    };

    const total_capture = {
      pattern: 'page',
      type: 'group_only',
      strategy: 'document_selector',
      custom_function: 'ciqdca.total_capture',
      type: 'group_only',
      transmission_group: 'basket_capture'
    };

    const payment_method = {
      strategy: 'query_selector',
      type: 'click',
      custom_function: 'ciqdca.payment_capture',
      wait_on_load: 'true',
    };

    /*const login_register = {
      wait_on_load: 'true',
    };

    const checkout_login_register = {
      wait_on_load: 'true',
    };*/

    const order_number = {
      strategy: 'document_selector',
      pattern: 'page',
      cart_started: 'true',
      custom_function: 'ciqdca.basket_capture',
    };



    const app_id = Object.keys(root.tag_data)[0];
    const tag_data = JSON.stringify(root.tag_data);
    let transmission_group = [],
      transmission, event,excluded_keys=[];
    targets_json.modules = modules;
    targets_json.tag_data = tag_data;
    targets_json.targets = {};
    targets_json.targets[app_id] = {};
    let pages = root.pages;
    targets_json.targets[app_id]['clickthrough'] = JSON.stringify(clickthrough);
    Object.keys(pages).map((label) => {
        if (pages[label].status === 'enabled') {
          let target_label = pages[label].name.replace(/\s/g, '_');
          //console.log(target_label);
          let new_target = targets_json.targets[app_id][target_label] = {}; //creates the page_load event by default
          targets_json.targets[app_id][target_label].name = target_label;
          Object.keys(page_load).map((value) => {
            return new_target[value] = page_load[value];
          });
          let last_label = target_label;
          let buffer = {};
          Object.keys(pages[label].inputs).map((key, value) => {
              if (key !== 'fields' && key !== 'click') { //handles the targets that by default don't need a transmission group
                targets_json.targets[app_id][target_label][key] = buffer[key] = pages[label].inputs[key];
                excluded_keys.push(key);
                console.log(buffer);
                switch(key){
                  case 'cloudiqBasketPayment':
                      Object.keys(payment_method).map((value) => {
                        return targets_json.targets[app_id][target_label][value] = payment_method[value];
                      });
                      targets_json.targets[app_id][target_label].pattern = pages[label].inputs.cloudiqBasketPayment;
                  break;
                  case 'cloudiqOrderNumber':
                      Object.keys(order_number).map((value) => {
                        return targets_json.targets[app_id][target_label][value] = order_number[value];
                      });
                      delete targets_json.targets[app_id][target_label].wait_on_load;
                  break;
                  case 'basket':
                  case String(key.match(/cloudiqBasket/)):
                      Object.keys(basket_page).map((value) => {
                       targets_json.targets[app_id][target_label][value] = basket_page[value];
                      });
                      delete targets_json.targets[app_id][target_label].cloudiqBasketTotal;
                      delete targets_json.targets[app_id][target_label].cloudiqBasketSubTotal;
                      let stringName = 'total_capture_' + target_label;
                      targets_json.targets[app_id][stringName] = {};
                      targets_json.targets[app_id][stringName].name = target_label;
                      Object.keys(total_capture).map((value) => {
                        targets_json.targets[app_id][stringName][value] = total_capture[value];
                      });
                      targets_json.targets[app_id][stringName].cloudiqBasketTotal = pages[label].inputs.cloudiqBasketTotal;
                      targets_json.targets[app_id][stringName].cloudiqBasketSubTotal = pages[label].inputs.cloudiqBasketSubTotal;
                      targets_json.targets[app_id][stringName].transmission_group = target_label;
                  break;
                  case 'add_to_basket':
                      switch (pages[label].name) {
                        case 'Category':
                          Object.keys(category_page).map((value) => {
                            targets_json.targets[app_id][target_label][value] = category_page[value];
                          });
                          targets_json.targets[app_id][target_label].pattern = pages[label].inputs.add_to_basket;
                          delete targets_json.targets[app_id][target_label].add_to_basket;
                          break;
                        case 'Product':
                          Object.keys(product_page).map((value) => {
                            targets_json.targets[app_id][target_label][value] = product_page[value];
                          });
                          targets_json.targets[app_id][target_label].pattern = pages[label].inputs.add_to_basket;
                          delete targets_json.targets[app_id][target_label].add_to_basket;
                          let stringName = target_label + '_click';
                          targets_json.targets[app_id][stringName] = {};
                          targets_json.targets[app_id][stringName].name = target_label;
                          Object.keys(product_page_click).map((value) => {
                            targets_json.targets[app_id][stringName][value] = product_page_click[value];
                          });
                          Object.keys(buffer).map((keybuff, i) => {
                            if (excluded_keys.indexOf(keybuff) !== -1) {
                              targets_json.targets[app_id][stringName][keybuff] = buffer[keybuff];
                            }
                          });
                        break;
                        default: break;
                      }
                  break
                  default: break;
                }
              } else { //need to create transmission group 
                let transmission = true;
                event = (key === 'fields' ? 'blur' : 'click');
                //label_index++; //creates the blur/click target
                target_label = pages[label].name.replace(/\s/g, '_') + /*'_' + label_index.toFixed(1).toString() +*/ '_' + event;
                targets_json.targets[app_id][target_label] = {};
                targets_json.targets[app_id][target_label].name = target_label;
                targets_json.targets[app_id][target_label].type = event;
                //console.log(pages[label]);
                let pattern = (key === 'fields' ? this.stringify_array(Object.values(pages[label].inputs.fields)) : pages[label].inputs.click);
                targets_json.targets[app_id][target_label].pattern = pattern;
                targets_json.targets[app_id][target_label].strategy = 'query_selector';
                pages[label].name.match(/Register|Login/) && !pages[label].name.match(/Checkout/) ?
                  targets_json.targets[app_id][target_label].session_sterted = 'true' : null;
                Object.keys(buffer).map((keybuff, i) => {
                  if (excluded_keys.indexOf(keybuff) !== -1) {
                    targets_json.targets[app_id][target_label][keybuff] = buffer[keybuff];
                  }
                });
                targets_json.targets[app_id][target_label].ddl_component_mappings = ddl_mapping;
                transmission_group.push(target_label);
                if (transmission === true && event === 'blur') { //creates the transmission group target
                  targets_json.targets[app_id] = this.create_transmission_group(targets_json.targets[app_id], pages[label], transmission_group);
                  transmission = false;
                  transmission_group = [];
                }
            }
          });
        targets_json.targets[app_id][last_label].ddl_component_mappings = ddl_mapping;
      }
      return;
    });


  /*fix:
    add default_rquest
    remove trans)_group for click
    transmission group
    CST,PV etc.
    total_capture
    */

  targets_json = this.sanitize_json(JSON.stringify(targets_json));
  console.log(targets_json);
  return targets_json;
}

create_transmission_group(element, page, transmission_group) {
  const target_label = page.name.replace(/\s/g, '_') + /* '_' + label_index.toFixed(1).toString() +*/ '_capture';
  element[target_label] = {};
  element[target_label].name = target_label;
  element[target_label].pattern = 'page';
  element[target_label].strategy = 'document_selector';
  element[target_label].fields = page.inputs.fields;
  element[target_label].transmission_group = this.stringify_array(transmission_group);
  let func = (target_label.match(/basket/i) ? 'ciqdca.basket_capture' : target_label.match(/total/i) ? 'ciqdca.total_capture' : target_label.match(/payment/i) ? 'ciqdca.payment_capture' : 'ciqdca.mixed_inputs_capture');
  element[target_label].custom_function = func;
  return element
}

stringify_array(array) {
  let string = '';
  array.map((value, i) => {
    string += value + ',';
  });
  string = string.replace(/,$/, '');
  return string
}

sanitize_json(string) {
  string = string.replace(/\\"/gm, '"').replace(/"{/gm, '{').replace(/}"/gm, '}');
  return string;
}

render() {
  {
    this.handle_pages()
  }
  return (
  <div >
    {
      this.handle_pages()
    }
    </div>
  )
}
}


export default Page;
