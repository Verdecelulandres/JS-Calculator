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
            <div className='current-value'></div>
          </div>
          <div className='btn-container'></div>
        </div>
      </div>
    );
}
}

export default App;
