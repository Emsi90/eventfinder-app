import React, { Component } from 'react';

import { Dimmer, Loader } from 'semantic-ui-react'
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
    artistData: null,
    errorMessage: null,
    authorName: ''
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
    .then(json => this.setState({data: json, isLoading: false}))
    .catch(err => this.setState({errorMessage: err}));
    // .catch(error => this.setState({errorMessage: error, isLoading: false}));

    fetch(`https://rest.bandsintown.com/artists/${this.state.searchValue}?app_id=8cd32220-ea94-4c7a-a074-ec271e84118`)
    .then(response => response.json())
    .then(json => this.setState({artistData: json, isLoading: false}))
    .catch(error => console.log(error));

  }

  formSubmitHandler = (e) => {
    this.setState({isLoading: true});
    e.preventDefault();
    this.searchParamsHandler(new URLSearchParams(new FormData(e.target)));
    this.state.authorName = this.state.searchValue;
    this.setState((prevState, props) => {
      if(prevState.searchValue !== props.searchValue) {
        return {data: null, artistData: null}
      }
    });
  }

  render() {
    console.log('data', this.state.data);
    console.log('artist', this.state.artistData);
    console.log('err', this.state.errorMessage);
    // let { data } = this.state.data;
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
          errorMessage={this.state.errorMessage}
        />
        <Dimmer active={this.state.isLoading}>
          <Loader>Loading</Loader>
        </Dimmer>
      </div>
    );
  }
}

export default EventFinder;
