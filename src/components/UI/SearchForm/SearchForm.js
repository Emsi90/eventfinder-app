import React, { Component } from 'react';
import { DateRange  } from 'react-date-range';
import { format, addDays } from 'date-fns';
import { Container, Form } from 'semantic-ui-react';

import classes from './SearchForm.css'

function formatDateDisplay(date, defaultText) {
  if (!date) return defaultText;
  return format(date, 'DD-MM-YYYY');
}

class SearchForm extends Component {

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
			<div className={classes.SearchFormContainer}>
        <div className={visible ? classes.Overlay : null} onClick={this.toggleOveraly}></div>
        <Container>
          <Form onSubmit={this.props.submit}>
            <Form.Group style={{justifyContent: 'center'}}>
              <Form.Input width={6} loading name='searchValue' value={this.props.searchValue} onChange={this.props.searchChange} placeholder='Search...' />

              <Form.Input 
              className={classes.ExtraMargin}
              type="text"
              name="startDate"
              readOnly
              onClick={this.toggleVisibility}
              value={formatDateDisplay(this.state.dateRangePicker.selection.startDate)}
              />
              <Form.Input 
              type="text"
              name="endDate"
              readOnly
              onClick={this.toggleVisibility}
              value={formatDateDisplay(this.state.dateRangePicker.selection.endDate)}
              />
              <Form.Button type="submit" content='Szukaj' primary />
            </Form.Group>
          </Form>
        </Container>
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

export default SearchForm;