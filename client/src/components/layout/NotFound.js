import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

const NotFound = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name='warning circle' />
      Sorry, this page does not exist.
    </Header>
    <br></br>
    <Segment.Inline>
      <Button basic icon labelPosition='left'>
        <Icon bordered inverted color='blue' name='left arrow' />

        <Link to='/'>Go back..</Link>
      </Button>
    </Segment.Inline>
  </Segment>
);

export default NotFound;
