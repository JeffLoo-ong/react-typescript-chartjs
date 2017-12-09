import * as React from 'react';
import './App.css';
import ChartLayout from './components/chartLayout';
import DatePicker from './components/datePicker';

class App extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-3">
          <DatePicker />
        </div>
        <div className="col-sm-offset-1 col-sm-8">
        	<ChartLayout />
		    </div>
      </div>
    );
  }
}

export default App;
