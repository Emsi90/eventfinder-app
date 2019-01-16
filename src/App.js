import React, { Component } from 'react';

import EventFinder from './containers/EventFinder/EventFinder';
import classes from './App.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <header className={classes.AppHeader}>
          <h1 className={classes.Logo}>Event <span>Finder</span></h1>
          <EventFinder />
        </header>
      </div>
    );
  }
}

export default App;
