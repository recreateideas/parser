import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';


class Page extends React.Component {



handle_pages(){
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
       name: "Default Page",
       status: "enabled",
       inputs: {
         page_exclude: "/Page Match",
         element_exclude: "#Element Match",
         events: {
           blur: ["#selector1", "#selector2"],
           click: ["#selector3", "#selector4"]
         }
       }
     },
     1: {
       name: "Category Page",
       status: "enabled",
       inputs: {
         page_match: "/Page Match",
         element_match: "#Element Match",
         events: {
           click: ["#Add to Basket"]
         }
       }
     },
     2: {
       name: "Product Page",
       status: "enabled",
       inputs: {
         page_match: "Page Match",
         element_match: "#Element Match",
         events: {
           click: ["#Add to Basket"]
         }
       }
     },
     3: {
       name: "Login Page",
       status: "enabled",
       inputs: {
         page_match: "/Page Match",
         element_match: "#Element Match",
         events: {
           blur: ["#Email input Id"]
         }
       }
     },
     4: {
       name: "Register Page",
       status: "enabled",
       inputs: {
         page_match: "/Page Match",
         element_match: "#Element Match",
         events: {
           blur: ["#Email input Id", "#Name input Id", "#Last name input Id", "#Phone input Id"],
           click: ["#submit"]
         }
       }
     },
     5: {
       name: "Basket Page",
       status: "enabled",
       inputs: {
         page_match: "/Page Match",
         element_match: "#Element Match",
         events: {
           load: ["#Basket element", "#Product image", "#Product name", "#Product quantity", "#Product price", "#Product total", "#Basket total"],
           click: ["#submit"]
         }
       }
     },
     6: {
       name: "Mini Basket",
       status: "enabled",
       inputs: {
         page_match: "/Page Match",
         element_match: "#Element Match",
         events: {
           load: ["#Basket element", "#Product image", "#Product name", "#Product quantity", "#Product price", "#Product total", "#Basket total"],
           click: ["#submit"]
         }
       }
     },
     7: {
       name: "Checkout page login",
       status: "enabled",
       inputs: {
         page_match: "/Page Match",
         element_match: "#Element Match",
         events: {
           blur: ["#Email input Id"],
           load: ["#Basket total"]
         }
       }
     },
     8: {
       name: "Checkout page Register",
       status: "enabled",
       inputs: {
         page_match: "/Page Match",
         element_match: "#Element Match",
         events: {
           blur: ["#Email input Id", "#Name input Id", "#Last name input Id", "#Phone input Id"],
           click: ["#submit"],
           load: ["#Basket total"]
         }
       }
     },
     9: {
       name: "Checkout page Payment",
       status: "enabled",
       inputs: {
         page_match: "/Page Match",
         element_match: "#Element Match",
         events: {
           blur: ["#Payment input"]
         }
       }
     },
     10: {
       name: "Confirmation Page",
       status: "enabled",
       inputs: {
         page_match: "/Page Match",
         element_match: "#Element Match"
       }
     }
   }
 };


  const app_id = Object.keys(root.tag_data)[0];
  const tag_data = JSON.stringify(root.tag_data);
  let transmission_group;
  targets_json.modules = modules;
  targets_json.tag_data = tag_data;
  targets_json.targets = {};
  targets_json.targets[app_id] = {};
  let targets = root.targets;
  targets_json.targets[app_id]['clickthrough'] = JSON.stringify(clickthrough);
  Object.keys(targets).map((label,index) => {
    let label_index = index;
    let target_label = targets[label].name.replace(/\s/g,'_') + '_' + label_index.toFixed(1).toString();
    console.log(target_label);
    if (targets[label].status === 'enabled') {
      targets_json.targets[app_id][target_label] = {}; //creates the page_load event by default
      targets_json.targets[app_id][target_label].page_load = 'true';
      targets_json.targets[app_id][target_label].name = target_label;
      targets_json.targets[app_id][target_label].ddl_component_mappings = ddl_mapping;
      Object.keys(targets[label].inputs).map((key,value) => {
        if (key === 'events'){
            let transmission = (Object.keys(targets[label].inputs.events).indexOf("blur") !== -1 || Object.keys(targets[label].inputs.events).indexOf("load") !== -1 ? true : false);
            transmission ? transmission_group = '' : null;
            //console.log(transmission);
            Object.keys(targets[label].inputs.events).map((event,i) => {
                label_index++;
                target_label = targets[label].name.replace(/\s/g, '_') + '_' + label_index.toFixed(1).toString()+'_'+event;
                targets_json.targets[app_id][target_label] = {};
                targets_json.targets[app_id][target_label].name = target_label;
                targets_json.targets[app_id][target_label].type = event;
                targets_json.targets[app_id][target_label].pattern = this.stringify_array(targets[label].inputs.events[event]);
                targets_json.targets[app_id][target_label].strategy = 'query_selector';
                targets_json.targets[app_id][target_label].ddl_component_mappings = ddl_mapping;
                transmission ? transmission_group += target_label+',' : null;
            });
            transmission_group = transmission_group.replace(/,$/, '');
            console.log(transmission_group);
        }
        else 
          targets_json.targets[app_id][target_label][key] = targets[label].inputs[key];
      });
  
      switch (target_label){
        case 'Default Page':

          break;
      }
    }
  });



///////////////////
targets_json = this.sanitize_json(JSON.stringify(targets_json));
console.log(targets_json);
return targets_json;
}

stringify_array(array){
  let string='';
  array.map((value,i)=>{
    string += value+',';
  });
  string = string.replace(/,$/,'');
  return string
}

sanitize_json(string){
  string = string.replace(/\\"/gm, '"').replace(/"{/gm, '{').replace(/}"/gm, '}');
  return string;
}

  render() {
    {this.handle_pages()}
    return (
      <div>
      </div>
    )
  }
}


export default Page;
