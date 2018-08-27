import React from 'react';
import configJson from './parser/config_json';
import * as data from './parser/pages_data';

import './App.css';
//const pages = data.pages;
//const tag_data = data.tag_data;

class Page extends React.Component {

  render() {
    return ( <div> {
      configJson(data.pages)
    } </div>)
  }
}

export default Page;


/*fix:
   add async behaviour
   add innerText capture
   currency(add to starter)
*/
