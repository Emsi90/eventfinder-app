import React, { Component } from 'react';

import SearchForm from '../../components/UI/SearchForm/SearchForm';

class EventFinder extends Component {

  state = {
    searchValue: '',
    startDate: '',
    testowy: '',
    isLoading: false,
    artist: 'Maroon 5',
    data: null
  }

  inputValueHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
    console.log('target', e.target.value);
  }

  test = (e) => {
    console.log(e.target.value);
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(new URLSearchParams(new FormData(e.target)).toString());
    fetch(`https://rest.bandsintown.com/artists/${this.state.searchValue}/events?app_id=8cd32220-ea94-4c7a-a074-ec271e841187&date=2019-01-01%2C2019-06-20`)
    .then(response => response.json())
    .then(json => this.setState({data: json}))
    .catch(error => console.log(error));
    // console.log('test1');
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        <SearchForm 
          column={8}
          searchValue={this.state.searchValue}
          searchChange={this.inputValueHandler}
          testowy={this.test}
          isLoading={this.state.isLoading}
          submit={this.formSubmitHandler} />
      </div>
    );
  }
}

export default EventFinder;
