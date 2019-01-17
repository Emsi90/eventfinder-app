import React from 'react';

import EventItem from '../EventItem/EventItem';
import classes from './EventList.css';
import { Container } from 'semantic-ui-react';

const eventsList = (props) => {

  // console.log(props.artistData);
  // console.log('arterror', !!props.errorMessage);
  const {data, artistData} = props;

  let errorNameHandler = null;
  if(data !== null && data.hasOwnProperty('errorMessage')) {
    errorNameHandler = 'Not found this Artist...';
  } else if(artistData !== null && artistData.hasOwnProperty('error') || !!props.errorMessage) {
    errorNameHandler = 'Wrong artist name...';
  }

  
  const eventItem = data => {

    const artist = data.lineup[0];
    const artistImg = artistData.thumb_url;
    const artistUrl = artistData.url;
    const artistFb = artistData.facebook_page_url;
    const dateTime = data.datetime;
    const city = data.venue.city;
    const country = data.venue.country;
    const place = data.venue.name;
    const latitude = data.venue.latitude;
    const longitude = data.venue.longitude;
    const tickets = data.offers[0];
    const venueUrl = data.url;

    return <EventItem
      key={data.id}
      artist={artist}
      artistImg = {artistImg}
      artistUrl = {artistUrl}
      artistFb = {artistFb}
      dateTime={dateTime}
      city={city}
      country={country}
      place = {place}
      latitude = {latitude}
      longitude = {longitude}
      tickets = {tickets}
      venueUrl = {venueUrl} />
  }

  return(
    <Container>
      <ul className={classes.eventList}>
        {Array.isArray(data) && artistData !== null ? data.map(eventItem) : 
          errorNameHandler ? errorNameHandler : 'Please search artist...'}
          {Array.isArray(data) && data.length === 0 ? 'No events for this artist in this time range...' : null}
      </ul>
    </Container>
  );
}

export default eventsList;
