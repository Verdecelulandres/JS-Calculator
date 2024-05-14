import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstValue: '',
      secondValue: '',
      mathOp: '',
      currentDisplay: '0',
      operationDisplay: ''
    }
  }
  render() {
    return (
      <div className="App">
        <div className='calculator-body'>
          <div id='display' className='display-container'>
     
            <div className='full-operation'></div>
            <div className='current-value'>{this.state.currentDisplay}</div>
        
          </div>
          <div className='btn-container'>
            {/* First row */}
            <button className='col-9' id="clear">clear</button>
            <button className='col-3'  id="multiply">X</button>
            {/* second row */}
            <button className='col-3' id="seven">7</button>
            <button className='col-3' id="eight">8</button>
            <button id="nine" className='col-3'>9</button>
            <button className='col-3' id="divide">/</button>
            {/* Third row */}
            <button className='col-3' id="four">4</button>
            <button className='col-3' id="five">5</button>
            <button className='col-3' id="six">6</button>
            <button className='col-3'  id="subtract">-</button>
            {/* Fourth row */}
            <button className='col-3' id="one">1</button>
            <button className='col-3' id="two">2</button>
            <button className='col-3' id="three">3</button>
            <button className='col-3' id="add">+</button>
            {/* Fifth row */}
            <button className='col-6' id="zero">0</button>
            <button className='col-3' id="decimal">.</button>
            <button className='col-3' id="equals">=</button>
          </div>
        </div>
        <h1>Coded by <a target='_blank'  href='https://andreslaverde.com/' style={{color: 'darkcyan'}}>Andres Laverde</a></h1>
      </div>
    );
}
}

export default App;
