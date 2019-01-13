import React, { Component } from 'react';

import SearchForm from '../../components/SearchForm/SearchForm';
import EventsList from '../../components/EventsList/EventsList';
import { format } from 'date-fns';

function toDate(dateStr) {
  const [day, month, year] = dateStr.split("-")
  return new Date(year, month - 1, day)
}

class EventFinder extends Component {

  state = {
    searchValue: '',
    startDate: '',
    endDate: '',
    isLoading: false,
    artist: '',
    data: null,
    artistData: null
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
    let strDate = '';
    let endDate = '';
    for(let item of query.entries()) {
      if(item[0] === 'startDate') {
        strDate = item[1];
      } else if(item[0] === 'endDate') {
        endDate = item[1];
      }
    }
    this.setState({
      startDate: format(toDate(strDate), 'YYYY-MM-DD'),
      endDate: format(toDate(endDate), 'YYYY-MM-DD'),
    }, () => this.fetchDataHandler());

  }

  fetchDataHandler = () => {
    fetch(`https://rest.bandsintown.com/artists/${this.state.searchValue}/events?app_id=8cd32220-ea94-4c7a-a074-ec271e841187&date=${this.state.startDate}%2C${this.state.endDate}`)
    .then(response => response.json())
    .then(json => this.setState({data: json}))
    .catch(error => console.log(error));

    fetch(`https://rest.bandsintown.com/artists/${this.state.searchValue}?app_id=8cd32220-ea94-4c7a-a074-ec271e84118`)
    .then(response => response.json())
    .then(json => this.setState({artistData: json}))
    .catch(error => console.log(error));

  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    this.searchParamsHandler(new URLSearchParams(new FormData(e.target)));
  }

  render() {
    // console.log('data', this.state.data);
    // console.log('start', this.state.startDate);
    // console.log('end', this.state.endDate);
    return (
      <div>
        <SearchForm 
          column={8}
          searchValue={this.state.searchValue}
          searchChange={this.inputValueHandler}
          dateRange={(startDate, endDate) => this.dateRangeHandler(startDate, endDate)}
          isLoading={this.state.isLoading}
          submit={this.formSubmitHandler} />
        <EventsList 
          data={this.state.data}
          artistData={this.state.artistData}
        />
      </div>
    );
  }
}

export default EventFinder;
