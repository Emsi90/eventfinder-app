import React from 'react';

import EventItem from '../EventItem/EventItem';
import classes from './EventList.css';
import { Container } from 'semantic-ui-react';

const eventsList = (props) => {
  
  const data = props.data;
  
  console.log('dataaa');
  console.log('data', data);


  const eventItem = data => {
    const artist = data.lineup[0];
    const dateTime = data.datetime;
    const city = data.venue.city;
    const country = data.venue.country;
    return <EventItem key={data.id} artist={artist} dateTime={dateTime} city={city} country={country} />
  }

  return(
    <Container>
      <ul className={classes.eventList}>
        {data !== null ? data.map(eventItem) : 'Please search artist...'}
      </ul>
    </Container>
  );
}

export default eventsList;
