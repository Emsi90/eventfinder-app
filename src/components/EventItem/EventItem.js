import React from 'react';

import { Icon } from 'semantic-ui-react'
import { format } from 'date-fns';
import classses from './EventItem.css';

const eventItem = ({ artist, artistImg, artistUrl, artistFb, dateTime, city, country, place, latitude, longitude, ticketsStatus, ticketsUrl, venueUrl }) => {
  return (
    <li className={classses.eventItem}>

      <div className={classses.BoxLeft}>
        <img src={artistImg} alt={artist}/>
        <div className={classses.artistInfo}>
          <h2 className={classses.artistHeader}>{artist}</h2>
          <div className={classses.media}>
            <a href={artistUrl} className={classses.link} target="_blank"><Icon disabled name='globe' />www</a>
            <a href={artistFb} className={classses.link} target="_blank"><Icon disabled name='facebook' />Facebook</a>
          </div>
        </div>
      </div>
      <div className={classses.BoxRight}>
        <span className={classses.date}>{format(dateTime, 'DD-MM-YYYY')} / <span className={classses.bold}>{format(dateTime, 'HH:MM')}</span></span>
        <span className={classses.city}>{city} / {country}</span>
        <span className={classses.place}>{place}</span>
        <div className={classses.media}>
          <a href={`http://maps.google.com/maps?q=${latitude},${longitude}`} className={classses.link} target="_blank"><Icon disabled name='map marker' />view on Map</a>
          <a href={venueUrl} className={classses.link} target="_blank"><Icon disabled name='globe' />event site</a>
        </div>
        <div className={classses.tickets}>
          <span className={ticketsStatus === 'available' ? classses.statusOk : classses.stausNo}>{ticketsStatus}</span>
          {ticketsStatus === 'available' ? <a href={ticketsUrl} className="ui positive button" target="_blank">Buy Ticket</a> : <a href={ticketsUrl} className="ui negative button" disabled>No Tickets</a>}
        </div>
      </div>
    </li>
  );
};

export default eventItem;