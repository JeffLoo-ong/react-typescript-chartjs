import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { myConfig } from '../config/config';

const DEFAULT_SEARCH_START = '2017-10-15T00:00:00.0000000';
const DEFAULT_SEARCH_END = '2017-10-17T00:00:00.0000000';
const DEFAULT_TAG = 'Tag1';

// Default Graph to load while data is aggregated
const initialState = {
  labels: ['Loading...'],
  datasets: [
    {
      label: 'Loading...',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
      responsive: true
    }
  ]
};

class ChartLayout extends React.Component <any, any>{
	constructor(props: any){
		super(props);
		this.state = { labelData: [], chartData: [], chart: {}};
	};

	// Load a place holder chart before the data is aggregated
	componentWillMount(){
		this.setState({chart: initialState});
	}
	//Automatically load default data of 48 hours
	componentDidMount() { 

		// Required to call the right this object
		var _this_ = this;
		
		// This method of rerendering the component was the same
		// one used by the react-chart-js-2 makers
		// https://github.com/jerairrest/react-chartjs-2/blob/master/example/src/components/randomizedLine.js
		var loadInterval = setInterval(function(){
			_this_.loadDefaultData();
			_this_.createChart();
		}, 2000);

		setTimeout(function() {
			clearInterval(loadInterval);
		}, 5000)
	}

	loadDefaultData() {
		return fetch(myConfig.API_URL + '/Datapoint/' + DEFAULT_TAG + '?startTS='
			+ DEFAULT_SEARCH_START +"&endTS=" + DEFAULT_SEARCH_END)
			.then((response) => (response.json()))
			.then((json) => (this.extractData(json)));
	} //loadDefaultData()

	// TODO: Currently using any type since json objects is not supported
	extractData(jsonData: any) {
		console.log("inside fillLabel!");
		var labelArr = [], dataArr = [];
		// 2880 elements in default call
		for(var x = 0; x < jsonData.length; x++){
			labelArr.push(jsonData[x].observationTS);
			dataArr.push(jsonData[x].value);

		}
		// console.log("Label arr: " + labelArr);
		// console.log("Data arr: " + dataArr);
		this.setState({labelData: labelArr});
		this.setState({chartData: dataArr});
	} // extractData()


	createChart() {
		var lineChart = {
			labels: this.state.labelData,
			  datasets: [
			    {
			      label: 'Mock Data',
			      fill: false,
			      lineTension: 0.1,
			      backgroundColor: 'rgba(75,192,192,0.4)',
			      borderColor: 'rgba(75,192,192,1)',
			      borderCapStyle: 'butt',
			      borderDash: [],
			      borderDashOffset: 0.0,
			      borderJoinStyle: 'miter',
			      pointBorderColor: 'rgba(75,192,192,1)',
			      pointBackgroundColor: '#fff',
			      pointBorderWidth: 1,
			      pointHoverRadius: 5,
			      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			      pointHoverBorderColor: 'rgba(220,220,220,1)',
			      pointHoverBorderWidth: 2,
			      pointRadius: 1,
			      pointHitRadius: 10,
			      data: this.state.chartData,
			      responsive: true
			    }
			  ]
		}; // lineChart
		
		if(this.refs.LineChartRef){
			this.setState({chart: lineChart});
			// console.log("reffed!")
		} else {
			// console.log("not reffed!")
		}
	} //createChart()

	public render() {
		return(
			<div>
				<div ref="LineChartRef">	
					<Line data={this.state.chart}/>
				</div>
			</div>
		);
	}
}

export default ChartLayout;