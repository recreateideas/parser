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
      targets: {
        0: {
          name: 'Category',
          status: 'enabled',
          inputs: {
            page_match: '/Page Match',
            element_match: '#Element Match',
            page_exclude: '/Page Exclude',
            element_exclude: '#Element Exclude',
            click: '#Add to Basket',
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
            click: '#Add to Basket',
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
            click: '#Add to Basket',
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

    const app_id = Object.keys(root.tag_data)[0];
    const tag_data = JSON.stringify(root.tag_data);
    let transmission_group = '',
      transmission, event, tag_count = 1;
    targets_json.modules = modules;
    targets_json.tag_data = tag_data;
    targets_json.targets = {};
    targets_json.targets[app_id] = {};
    let targets = root.targets;
    targets_json.targets[app_id]['clickthrough'] = JSON.stringify(clickthrough);
    Object.keys(targets).map((label, index) => {
      if (targets[label].status === 'enabled') {
        let label_index = index;
        let target_label = targets[label].name.replace(/\s/g, '_') /*label_index.toFixed(1).toString()*/ ;
        console.log(target_label);
        targets_json.targets[app_id][target_label] = {}; //creates the page_load event by default
        targets_json.targets[app_id][target_label].name = target_label;
        targets_json.targets[app_id][target_label].pattern = 'page';
        targets_json.targets[app_id][target_label].strategy = 'document_selector';
        targets_json.targets[app_id][target_label].page_load = 'true';
        targets_json.targets[app_id][target_label].wait_on_load = 'true'; //exclude cancel
        let last_label = target_label;
        let buffer = {};
        Object.keys(targets[label].inputs).map((key, value) => {
          if (key !== 'fields' && key !== 'click' && key !== 'payment') {
            targets_json.targets[app_id][target_label][key] = buffer[key] = targets[label].inputs[key];
            if (key === 'cloudiqBasketPayment') {
              targets_json.targets[app_id][target_label].strategy = 'query_selector';
              targets_json.targets[app_id][target_label].type = 'click';
              targets_json.targets[app_id][target_label].pattern = targets[label].inputs.cloudiqBasketPayment;
              targets_json.targets[app_id][target_label].custom_function = 'ciqdca.payment_capture';
            }
            if (key === 'cloudiqOrderNumber') {
              targets_json.targets[app_id][target_label].strategy = 'document_selector';
              targets_json.targets[app_id][target_label].type = '';
              targets_json.targets[app_id][target_label].pattern = 'page';
              targets_json.targets[app_id][target_label].custom_function = 'ciqdca.order_number';
              delete targets_json.targets[app_id][target_label].wait_on_load;
            }
            if (key === 'basket' || key.match(/cloudiqBasket/)) {
              //target_label = 'basket_capture';
              targets_json.targets[app_id][target_label].strategy = 'document_selector';
              targets_json.targets[app_id][target_label].type = '';
              targets_json.targets[app_id][target_label].pattern = 'page';
              targets_json.targets[app_id][target_label].cart_started = 'true';
              targets_json.targets[app_id][target_label].custom_function = 'ciqdca.basket_capture';
              delete targets_json.targets[app_id][target_label].cloudiqBasketTotal;
              delete targets_json.targets[app_id][target_label].cloudiqBasketSubTotal;
              //target_label = 'total_capture';
              let stringName = 'total_capture_' + target_label;
              targets_json.targets[app_id][stringName] = {};
              targets_json.targets[app_id][stringName].name = target_label;
              targets_json.targets[app_id][stringName].pattern = 'page';
              targets_json.targets[app_id][stringName].type = 'group_only';
              targets_json.targets[app_id][stringName].strategy = 'document_selector';
              targets_json.targets[app_id][stringName].cloudiqBasketTotal = targets[label].inputs.cloudiqBasketTotal;
              targets_json.targets[app_id][stringName].cloudiqBasketSubTotal = targets[label].inputs.cloudiqBasketSubTotal;
              targets_json.targets[app_id][stringName].transmission_group = target_label;
              targets_json.targets[app_id][stringName].custom_function = 'ciqdca.total_capture';
            }
          } else {
            let transmission = true;
            event = (key === 'fields' ? 'blur' : 'click');
            label_index++; //creates the blur/click target
            target_label = targets[label].name.replace(/\s/g, '_') + /*'_' + label_index.toFixed(1).toString() +*/ '_' + event;
            targets_json.targets[app_id][target_label] = {};
            targets_json.targets[app_id][target_label].name = target_label;
            targets_json.targets[app_id][target_label].type = event;
            //console.log(targets[label]);
            let pattern = (key === 'fields' ? this.stringify_array(Object.values(targets[label].inputs.fields)) : targets[label].inputs.click);
            targets_json.targets[app_id][target_label].pattern = pattern;
            targets_json.targets[app_id][target_label].strategy = 'query_selector';
            Object.keys(buffer).map((keybuff, i) => {
              targets_json.targets[app_id][target_label][keybuff] = buffer[keybuff];
            });
            !target_label.match(/confirmation/i) ? targets_json.targets[app_id][target_label].wait_on_load = 'true' : null;
            targets_json.targets[app_id][target_label].ddl_component_mappings = ddl_mapping;
            transmission === true ? transmission_group += target_label + ',' : null;
            if (transmission === true) { //creates the transmission group target
              target_label = targets[label].name.replace(/\s/g, '_') + /* '_' + label_index.toFixed(1).toString() +*/ '_capture';
              targets_json.targets[app_id][target_label] = {};
              targets_json.targets[app_id][target_label].name = target_label;
              targets_json.targets[app_id][target_label].pattern = 'page';
              targets_json.targets[app_id][target_label].strategy = 'document_selector';
              targets_json.targets[app_id][target_label].fields = targets[label].inputs.fields;
              targets_json.targets[app_id][target_label].transmission_group = transmission_group;
              let func = (target_label.match(/basket/i) ? 'ciqdca.basket_capture' : target_label.match(/total/i) ? 'ciqdca.total_capture' : target_label.match(/payment/i) ? 'ciqdca.payment_capture' : 'ciqdca.mixed_inputs_capture');
              targets_json.targets[app_id][target_label].custom_function = func;
              //targets_json.targets[app_id][target_label].ddl_component_mappings = ddl_mapping;
              ////
              transmission = null;
              transmission_group = '';
            }
          }
        });
        targets_json.targets[app_id][last_label].ddl_component_mappings = ddl_mapping;
      }
    });
    /*fix:
      wait_on_load
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
    return ( <
      div >
      <
      /div>
    )
  }
}


export default Page;
