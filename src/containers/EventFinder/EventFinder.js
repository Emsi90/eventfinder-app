import React, { Component } from 'react';

import SearchForm from '../../components/UI/SearchForm/SearchForm';

class EventFinder extends Component {

  state = {
    searchValue: '',
    isLoading: false
  }

  inputValueHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
    console.log(e.target.value);
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    // this.setState({value: e.target.value});
    // console.log(e.target.value);
    console.log('test');
  }

  render() {
    return (
      <div>
        <SearchForm 
          column={8}
          searchValue={this.state.searchValue}
          searchChange={this.inputValueHandler}
          isLoading={this.state.isLoading}
          submit={this.formSubmitHandler} />
      </div>
    );
  }
}

export default EventFinder;
