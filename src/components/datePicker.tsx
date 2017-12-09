import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';

class DateComponent extends React.Component <any, any>{
	constructor(props: any){
		super(props);
		this.state = {
			startDate: moment()
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(date: any) {
		this.setState({
			startDate: date
		});
	}

	render() {
		return (
			<DatePicker 
				selected={this.state.startDate}
				onChange={this.handleChange}
				popperPlacement="bottom-end"
				popperModifiers={{
					offset: {
						enabled: true
					}
				}}
			/>
		);
	}
}

export default DateComponent;