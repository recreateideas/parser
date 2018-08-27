
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class Page extends React.Component {
  constructor(){
    super();
    this.state = {
      start_input: "fill me in!",
      greeting: "My first React App!!",
      items:[]
    }
  }
  ajaxCall(){
    fetch('https://swapi.co/api/people/?format=json', {
      method: 'get',
      dataType: 'json'
    }).then()
  .then(response => response.json())
  .then(({results:items}) => this.setState({items}))
  }
  componentDidMount() {
    this.ajaxCall()
  }
  
  render(){
    console.log(this.state.items);
    return(
      <div>
        <div id='header'></div>
        <HeaderWrapper greeting={this.state.greeting}/>
        <Form style='border=2px' text={this.state.start_input} />
        <table>
          <tbody>
            <th>Starwars:</th>
            {this.state.items.map(item => <tr><td key={item.name}>{item.name}</td></tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

class HeaderWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      text: null
    }
  }
  increment(){
    let num = this.state.num + 1;
    this.setState({
      num: num
    })
  }
  mount(){
    ReactDOM.render(<Header greeting={this.props.greeting} click={this.increment.bind(this)} val={this.state.num}>Children<div>{this.state.num}</div></Header>, document.getElementById('header'))
  }
  unmount(){
    ReactDOM.unmountComponentAtNode(document.getElementById('header'))
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.num % 5 === 0;
  }
  componentDidMount() {
    console.log('mounted')
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(`updated`)
  }
  render(){
    return(
      <div>
        <Button click={this.mount.bind(this)}>Mount</Button>
        <Button click={this.unmount.bind(this)}>Unmount</Button>
        <Button click={() => this.setState({num:0})}>Clear</Button>
        <div>{this.state.num}</div>
      </div>
    )
  }
  
}
 class Header extends React.Component {
   constructor(props){
     super(props);
     this.state = {
       text: null,
       head: 10
     }
   }
  text = this.props.greeting;
  componentWillMount(){
    console.log('componenetWillMount')
  }
   render(){
     console.log('render');
     return(
       <div>
        <h1>{this.text}<Heart /></h1>
        <Button click={this.props.click}>Increment</Button>
         <div>{this.props.children}</div>
       </div>
     )
   }
  
   componentDidMount(){
     console.log('componentDidMount')
   }
   componentWillUnmount(){
     console.log('componentWillUnmount')
   }
   componentWillReceiveProps(nextProps) {
     console.log(nextProps)
   }
 }

 class Form extends React.Component {
   constructor(props){
     super(props);
     this.state = {
       text: this.props.text,
       text2: this.props.text,
       currentEvent: '- - -'
     }
     this.eventUpdate = this.eventUpdate.bind(this)
   }
   alertme(){
    alert(this.state.text);
   }
   eventUpdate(e){
    this.setState({currentEvent: e.type})
   }
    typing() {
      console.log(ReactDOM.findDOMNode(this.a));
      this.setState({
        text: ReactDOM.findDOMNode(this.a).value,
        text2: ReactDOM.findDOMNode(this.b).value
      })
    }
  render() {
    return (
      <div>
        <Widget inputRef={claudio => this.a = claudio} text={this.state.text} update={this.typing.bind(this)} eventUp={this.eventUpdate}/><br/><br/>
        <Button click={this.alertme.bind(this)}>I <Heart/> Alerts!</Button>
        <Print title={this.state.text}/>
        <Widget inputRef={component => this.b = component} text={this.state.text2} update={this.typing.bind(this)}/><br/><br/>
        <Print title={this.state.text2}/>
        <Print title={this.state.currentEvent}/>
      </div>
    );
  }
 }
//  ---------- PRINT --------------
 const Print = (props) => <h1>Print: {props.title}</h1>
 Print.propTypes={
   title: function(props,propName, componentName){
     if(!(propName in props)){
       return new Error (`missing ${propName}`);
     }
     if (props[propName].length < 0) {
       return new Error(`${propName} was too short`);
     }
   }
 }
// ---------------------------------
 const Button = (props) => <button onClick={props.click}>{props.children}</button>
 const Heart = (props) => <span>&hearts;</span>
 const Widget = (props) => {
   return (
    <input
      ref={props.inputRef}
      type='text'
      placeholder= {props.text} 
      onChange={props.update}
      onClick={props.eventUp}
    />
   )
 }

export default Page;
