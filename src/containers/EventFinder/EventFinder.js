import React, { Component } from 'react';

import SearchForm from '../../components/UI/SearchForm/SearchForm';
import { format } from 'date-fns';

function formatDateDisplay(date, defaultText) {
  if (!date) return defaultText;
  return format(date, 'YYYY-MM-DD');
}

class EventFinder extends Component {

  state = {
    searchValue: '',
    startDate: 'asd',
    endDate: '',
    
    // Test state
    startDateTest: '',
    endDateTest: '',
    startDate2: '2019-01-01',
    endDate2: '2019-08-01',

    isLoading: false,
    artist: 'Maroon 5',
    data: null
  }

  inputValueHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
    // console.log('target', e.target.value);
  }

  dateRangeHandler = (startDateTest, endDateTest) => {
    this.setState({startDateTest, endDateTest});
    // console.log(e.target.value);
  }

  searchParamsHandler = (params) => {
    const query = params;
    for(let item of query.entries()) {
      // console.log(item);
      if(item[0] === 'startDate') {
        this.setState({startDate: formatDateDisplay(item[1])});
        // console.log('d1', item[1]);
      } else if(item[0] === 'endDate') {
        // console.log('d2', item[1]);
        this.setState({endDate: item[1]}, () => {
          console.log('callback');
          this.fetchDataHandler();
        }
        );
      }
    }
  }

  fetchDataHandler = () => {
    fetch(`https://rest.bandsintown.com/artists/${this.state.searchValue}/events?app_id=8cd32220-ea94-4c7a-a074-ec271e841187&date=${this.state.startDate}%2C${this.state.endDate}`)
    .then(response => response.json())
    .then(json => this.setState({data: json}))
    .catch(error => console.log(error));
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    this.searchParamsHandler(new URLSearchParams(new FormData(e.target)));
    // console.log('statedat', this.state.startDate);
    // fetch(`https://rest.bandsintown.com/artists/${this.state.searchValue}/events?app_id=8cd32220-ea94-4c7a-a074-ec271e841187&date=${this.state.startDate}%2C${this.state.endDate}`)
    // .then(response => response.json())
    // .then(json => this.setState({data: json}))
    // .catch(error => console.log(error));
    // console.log('test1');
  }

  render() {
    console.log('data', this.state.data);
    console.log('start', this.state.startDate);
    console.log('end', this.state.endDate);
    return (
      <div>
        <SearchForm 
          column={8}
          searchValue={this.state.searchValue}
          searchChange={this.inputValueHandler}
          dateRange={(startDate, endDate) => this.dateRangeHandler(startDate, endDate)}
          isLoading={this.state.isLoading}
          submit={this.formSubmitHandler} />
      </div>
    );
  }
}

export default EventFinder;
