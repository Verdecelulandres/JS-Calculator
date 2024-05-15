import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     userInput: ['0'],
     isFirst: true,
     isDefault: true
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
      isFirst: true,
      userInput: ['0'],
      isDefault: true
    });
  }
  //Returns true if the string provided is a umber and false otherwise
  isNumber(val) {
    return !isNaN(Number(val));
  }

  //Checks if we should concatenate more numbers to the current one and if the expresion is not long enough already
  checkNumberConstraints(currentVal) {
   /* if(this.state.userInput.length <= 9 && currentVal.length <= 6){
        return true;
    } else {
      return false;
    }
 */
return true;
  }

  //stores first and second values to wait for the "equals" call
  storingNums(num) {
   
    //If the inputted number is not the first value
    if(!this.state.isFirst) {
      let currentVal = this.state.userInput[this.state.userInput.length-1];
  
    //If the current value is not a number then we should just push the new value, if teh expression is still in the imposed limits
      if(!this.isNumber(currentVal)){
        if(this.checkNumberConstraints(currentVal)){
          this.setState({
            userInput: [...this.state.userInput, num]
          });
        }

        //If the current value is a number then we want to concatenate the new number to it
      }else {
       
        if(this.checkNumberConstraints(currentVal)){
          if(currentVal === '0' && num === '0') {return;} //No leading zeros
        
          currentVal += num;
      
          let updatedArr = this.state.userInput.slice(0,-1)
          updatedArr.push(currentVal);
    
          this.setState({
          userInput: updatedArr
          });
        }
      }
     //If is the first number inputted then just push it to the array, replacing the placeholder.
    } else {
      this.setState({
        isFirst: false,
        userInput: [num],
        isDefault: false
      });
    }
  }

  makeItDecimal() {
    if(this.state.isFirst){
      window.alert('Please input a number first');
    } else {
      let currentVal = this.state.userInput[this.state.userInput.length-1];
      if(this.isNumber(currentVal)){
        //Doesn't contain a '.' already
        if(!(currentVal.includes('.')) /*&& currentVal.length < 5*/){ 
          currentVal += '.';
          let updatedArr = this.state.userInput.slice(0,-1)
          updatedArr.push(currentVal);
          this.setState({
          userInput: updatedArr
          });
        }
      }
    }
  }
  // stores the math operation into the state
  defineMathOp(sign) {

    let currentVal = this.state.userInput[this.state.userInput.length-1];
    // only push the math op if the current value is a number
      if(this.isNumber(currentVal)){ 
        // if the current number doesn't have the decimal point missplaced we can continue
        if(currentVal.indexOf('.')<0||currentVal.indexOf('.') !== currentVal.length-1){
          this.setState({
            userInput: [...this.state.userInput, sign],
            isFirst: false
          });
        } 
      } else {
        //If the current value is a math op then we will change it with the new one inputted except if it is a negative sign
        if(sign === '-'){
          this.setState({
            userInput: [...this.state.userInput, sign]
          });
        } else {
          let updatedArr = this.state.userInput.slice(0,-1);
          updatedArr.push(sign);
          this.setState({
            userInput: updatedArr
          });
        }  
    }
  }

  
  // makes the math operation and stores it in the first array value
  doSomeMath() {
    if(this.state.isFirst){
      window.alert('Please input a number first');
    } else {
      //Only attempt an operation if the expression is valid
      if(this.state.userInput.length > 1) {
        try {
          // Evaluate the expression while ensuring correct order of operations
          let expression = this.state.userInput.join(' ').replace(/x/g, '*');
          let result = eval(expression).toString();
          
          // Store the result and reset input
          this.setState({
            userInput: [result],
            isFirst: true
          });
        } catch (error) {
          console.error("Error in evaluating expression:", error);
          this.resetValues();
        }
      }
    }
  }
  

  // Gets the button value and redirects to the correct function
  handleClick(btnVal) {

    if(this.isNumber(btnVal)){
      this.storingNums(btnVal);
    } else if(btnVal==='CLR'){
      this.resetValues();
    } else {
      //Only accept non numerical input if it is not the first input
      if(!this.state.isDefault){
        switch(btnVal){
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
  
  }

  render() {
    let fulloperation = '';
    if(!this.state.isDefault){
      fulloperation = this.state.userInput.join(' ');
    }
    return (
      <div className="App">
        <div className='calculator-body'>
          <div className='display-container'>
            <div className='full-operation'>{fulloperation}</div>
            <div id='display' className='current-value'>{this.state.userInput[this.state.userInput.length-1]}</div>
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
