import React from 'react';

import DatePicker from '../DatePicker/DatePicker';
import { Container, Form } from 'semantic-ui-react'

const searchForm = (props) => {

  const datePickerHandler = () => {
    console.log('test2');
  };

  return (
    <Container>
      <Form onSubmit={props.submit}>
        <Form.Group style={{justifyContent: 'center'}}>
          <Form.Input width={6} loading name='searchValue' value={props.searchValue} onChange={props.searchChange} placeholder='Search...' />
          <DatePicker />
          <Form.Button type="submit" content='Szukaj' primary />
        </Form.Group>
      </Form>
    </Container>
  );
}

export default searchForm;