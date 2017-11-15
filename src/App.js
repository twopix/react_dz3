import React, {Component} from 'react';
import './App.css';
import Step from './Step';

const stepTitles = ['Personal information', 'Card information', 'Finish'];

class App extends Component {
  render() {
    return (
      <div className="container" >
          <div className="tab-panel">
            <div className="form-content">
              <button className="button-panel button-next" />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
