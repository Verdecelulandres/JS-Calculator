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
    this.isNumber = this.isNumber.bind(this);
    this.resetValues = this.resetValues.bind(this);
    this.storingNums =this.storingNums.bind(this);
  }

  //When user clicks clear the state is returned to initial values
  resetValues() {
    this.setState({
      firstValue: '',
      secondValue: '',
      mathOp: '',
      currentDisplay: '0',
      operationDisplay: ''
    });
  }
  //Returns true if the string provided is a umber and false otherwise
  isNumber(val) {
    return !isNaN(Number(val));
  }

  //stores first and second values to wait for the "equals" call
  storingNums(num) {
    //If the 1st val is empty we just store the number passed
    if(this.state.firstValue === ''){
      this.setState({
        firstValue: num,
        currentDisplay: num,
        operationDisplay: this.state.operationDisplay + num
      });

      //If there is no Math Operation defined then we want to continue concatenating numbers
    }else if(this.state.mathOp === ''){
      this.setState({
        firstValue: this.state.firstValue + num,
        currentDisplay: this.state.currentDisplay + num,
        operationDisplay: this.state.operationDisplay + num
      });
    }
  }


  // Gets the button value and redirects to the correct function
  handleClick(btnVal) {

    if(this.isNumber(btnVal)){
      this.storingNums(btnVal);
    }
    else {
      switch(btnVal){
        case 'CLR':
          this.resetValues();
          break;
        case '=':
          //Do some stuff
          break;
        case '.':
          //Do some stuff
          break;
        default:
          //any other math op
          break;
      }
    }
  
  }

  render() {
    return (
      <div className="App">
        <div className='calculator-body'>
          <div id='display' className='display-container'>
            <div className='full-operation'>{this.state.operationDisplay}</div>
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
