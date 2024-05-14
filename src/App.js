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
          <div className='display'>
            <div className='full-operation'></div>
            <div className='current-value'>{this.state.currentDisplay}</div>
          </div>
          <div className='btn-container'>
            {/* First row */}
            <button id="clear"></button>
            <button id="multiply"></button>
            {/* second row */}
            <button id="seven"></button>
            <button id="eight"></button>
            <button id="nine"></button>
            <button id="divide"></button>
            {/* Third row */}
            <button id="four"></button>
            <button id="five"></button>
            <button id="six"></button>
            <button id="subtract"></button>
            {/* Fourth row */}
            <button id="one"></button>
            <button id="two"></button>
            <button id="three"></button>
            <button id="add"></button>
            {/* Fifth row */}
            <button id="zero"></button>
            <button id="decimal"></button>
            <button id="equals"></button>
          </div>
        </div>
      </div>
    );
}
}

export default App;
