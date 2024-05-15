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
      operationDisplay: '',
      previousOp: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.isNumber = this.isNumber.bind(this);
    this.resetValues = this.resetValues.bind(this);
    this.storingNums = this.storingNums.bind(this);
    this.defineMathOp = this.defineMathOp.bind(this);
    this.checkNumberConstraints = this.checkNumberConstraints.bind(this);
    this.makeItDecimal = this.makeItDecimal.bind(this);
    this.doSomeMath = this.doSomeMath.bind(this);
  }

  //When user clicks clear the state is returned to initial values
  resetValues() {
    this.setState({
      firstValue: '',
      secondValue: '',
      mathOp: '',
      currentDisplay: '0',
      operationDisplay: '',
      previousOp: false
    });
  }
  //Returns true if the string provided is a umber and false otherwise
  isNumber(val) {
    return !isNaN(Number(val));
  }

  //Checks if we should concatenate more numbers to the current one
  checkNumberConstraints() {
    if(this.state.currentDisplay.length >= 7 || this.state.currentDisplay === '0') { return false;}
    else {return true;}
  }

  //stores first and second values to wait for the "equals" call
  storingNums(num) {
    let isFirstVal = (this.state.firstValue !== '');
    let isMathOp = (this.state.mathOp !== '');
    let isSecondVal = (this.state.secondValue !== '');
    //If the 1st val is empty we just store the number passed
    if(!isFirstVal){
      this.setState({
        firstValue: num,
        currentDisplay: num,
        operationDisplay: this.state.operationDisplay + num
      });

      //If there is no Math Operation defined then we want to continue concatenating numbers to the 1st val
    }else if(isFirstVal && !isMathOp){
      if(this.checkNumberConstraints()){
      this.setState({
        firstValue: this.state.firstValue + num,
        currentDisplay: this.state.currentDisplay + num,
        operationDisplay: this.state.operationDisplay + num
      });
    }
      //If there is already an operation defined we want to store the 2nd value
    }else if(isMathOp && !isSecondVal){
      this.setState({
        secondValue: num,
        currentDisplay: num,
        operationDisplay: this.state.operationDisplay + num
      });
      //There is already a 2nd value. We just want to concatenate more numbers to it
    }else if(isMathOp && isSecondVal){
      console.log('first value: ', this.state.firstValue );
      console.log('math op: ', this.state.mathOp);
      console.log('second value: ', this.state.secondValue );
      console.log(this.checkNumberConstraints());
      if(this.checkNumberConstraints()){
        this.setState({
          secondValue: this.state.secondValue + num,
          currentDisplay: this.state.currentDisplay + num,
          operationDisplay: this.state.operationDisplay + num
        });
      }
    }
  }

  makeItDecimal() {
    let currentVal = this.state.currentDisplay;
    
      if(!currentVal.includes('.') && currentVal.length < 6){ //Doesn't contain a '.' already
        this.setState({
          currentDisplay: this.state.currentDisplay + '.',
          operationDisplay: this.state.operationDisplay + '.'
        });
        if(this.state.mathOp === ''){
          this.setState({
            firstValue: this.state.firstValue + '.'
          })
        } else {
          this.setState({
            secondValue: this.state.secondValue + '.'
          });
        }
      }
  }

  // stores the math operation into the state
  defineMathOp(sign) {
    let currentVal = this.state.currentDisplay;
    let isPrevOp = this.state.previousOp;

    if(currentVal.indexOf('.')<0||currentVal.indexOf('.') !== currentVal.length-1){
      if(this.state.firstValue === '') {
        this.setState({
          currentDisplay: 'Please enter a number first',
          operationDisplay: 'Press clear to exit'
        });
        //Only set it if there is no sign
      } else if(this.state.mathOp === '' && !isPrevOp){
        this.setState({
          mathOp: sign,
          currentDisplay: sign,
          operationDisplay: this.state.operationDisplay + sign
        });
      } else if(this.state.mathOp === '' && isPrevOp){
        this.setState({
          mathOp: sign,
          currentDisplay: sign,
          operationDisplay: this.state.firstValue + sign
        });
      } else if (this.state.mathOp !== '') {
        this.setState({
          mathOp: sign,
          currentDisplay: sign,
          operationDisplay: this.state.operationDisplay.substring(0, this.state.operationDisplay.length-1) + sign
        });
      }
    }
  }
  
  // makes the math operation and stores it in the first value
  doSomeMath() {
  //The variables defined in this function are just for ease of writting.  
    let isFirstVal = (this.state.firstValue !== '');
    let isMathOp = (this.state.mathOp !== '');
    let isSecondVal = (this.state.secondValue !== '');

    //Only attempt an operation if all the values are present
    if(isFirstVal && isMathOp && isSecondVal){
        let firstNum = this.state.firstValue;
        let secondNum = this.state.secondValue;
        let mathSign = this.state.mathOp;
        //Store the resulted number in a string for ease of checking constraints
        let result = eval(firstNum + mathSign + secondNum).toString();

       this.setState({
          firstValue: result,
          secondValue: '',
          mathOp: '',
          currentDisplay: result,
          operationDisplay: this.state.operationDisplay + '=' + result,
          previousOp: true
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
          this.doSomeMath();
          break;
        case '.':
          this.makeItDecimal();
          break;
        default:
          this.defineMathOp(btnVal);
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
            <button className='col-3' id="multiply" value='x' onClick={() => this.handleClick('*')}>X</button>
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
