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
    };

    this.handleClick = this.handleClick.bind(this);
  }
  isNumber(val) {
    return !isNaN(Number(val));
  }
  // Functions here:
  handleClick(btnVal) {

    if(isNumber(btnVal)){
      
    }
    else {

    }
    this.setState({
      currentDisplay: btnVal
    });
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
            <button className='col-9' id="clear" value='CLR' onClick={() => this.handleClick('CLR')}>clear</button>
            <button className='col-3' id="multiply" value='x' onClick={() => this.handleClick('x')}>X</button>
            {/* second row */}
            <button className='col-3' id="seven" value='7' onClick={() => this.handleClick('7')}>7</button>
            <button className='col-3' id="eight" value='8' onClick={() => this.handleClick('8')}>8</button>
            <button id="nine" className='col-3' value='9' onClick={() => this.handleClick('9')}>9</button>
            <button className='col-3' id="divide" value='/' onClick={() => this.handleClick('/')}>/</button>
            {/* Third row */}
            <button className='col-3' id="four" value='4' onClick={() => this.handleClick('4')}>4</button>
            <button className='col-3' id="five" value='5' onClick={() => this.handleClick('5')}>5</button>
            <button className='col-3' id="six" value='6' onClick={() => this.handleClick('6')}>6</button>
            <button className='col-3' id="subtract" value='-' onClick={() => this.handleClick('-')}>-</button>
            {/* Fourth row */}
            <button className='col-3' id="one" value='1' onClick={() => this.handleClick('1')}>1</button>
            <button className='col-3' id="two" value='2' onClick={() => this.handleClick('2')}>2</button>
            <button className='col-3' id="three" value='3' onClick={() => this.handleClick('3')}>3</button>
            <button className='col-3' id="add" value='+' onClick={() => this.handleClick('+')}>+</button>
            {/* Fifth row */}
            <button className='col-6' id="zero" value='0' onClick={() => this.handleClick('0')}>0</button>
            <button className='col-3' id="decimal" value='.' onClick={() => this.handleClick('.')}>.</button>
            <button className='col-3' id="equals" value='=' onClick={() => this.handleClick('=')}>=</button>
          </div>
        </div>
        <h1>Coded by <a target='_blank' href='https://andreslaverde.com/' style={{ color: 'darkcyan' }}>Andres Laverde</a></h1>
      </div>
    );
  }
}

export default App;
