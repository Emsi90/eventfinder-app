import React from 'react';

import { format } from 'date-fns';
import classses from './EventItem.css';

const eventItem = ({ artist, dateTime, city, country }) => {
  return (
    <li className={classses.eventItem}>

      <p>{artist}</p>
      <p>{format(dateTime, 'HH:MM DD-MM-YYYY')}</p>
      <p>{city}</p>
      <p>{country}</p>
    </li>
  );
};

export default eventItem;