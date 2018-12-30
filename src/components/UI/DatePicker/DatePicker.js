import React, { Component } from 'react';
import { DateRange  } from 'react-date-range';
import { format, addDays } from 'date-fns';
import { Input } from 'semantic-ui-react';

import classes from './DatePicker.css'

function formatDateDisplay(date, defaultText) {
  if (!date) return defaultText;
  return format(date, 'DD/MM/YYYY');
}

class DatePicker extends Component {

	state = {
		dateRangePicker: {
			selection: {
				startDate: new Date(),
				endDate: addDays(new Date(), 7),
				key: 'selection',
			},
		},
		visible: false
	}

	toggleVisibility = () => this.setState({ visible: !this.state.visible });

	toggleOveraly = () => this.setState({visible: false});

	handleRangeChange(which, payload) {
    // console.log('which', which, 'payload', payload);
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },
    });
  }

	render() {
		const { visible } = this.state;

		return (
			<div className={classes.DatePickerContainer}>
			<div className={visible ? classes.Overlay : null} onClick={this.toggleOveraly}></div>
				<Input 
					className={classes.ExtraMargin}
					type="text"
					readOnly
					onClick={this.toggleVisibility}
					value={formatDateDisplay(this.state.dateRangePicker.selection.startDate)} 
				/>
				<Input 
					type="text"
					readOnly
					onClick={this.toggleVisibility}
					value={formatDateDisplay(this.state.dateRangePicker.selection.endDate)}
				/>
				<div className={visible ? [classes.DateBox, classes.open].join(' ') : classes.DateBox}>
						<DateRange
							onChange={(e) => this.handleRangeChange('dateRangePicker', e)}
							showSelectionPreview={false}
							moveRangeOnFirstSelection={false}
							months={2}
							ranges={[this.state.dateRangePicker.selection]}
							direction="horizontal"
						/>
				</div>
			</div>
		);
	}
}

export default DatePicker;