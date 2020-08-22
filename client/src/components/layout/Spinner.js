import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Spinner = () => (
  <Dimmer active inverted>
    <Loader size='large'>Loading</Loader>
  </Dimmer>
);

Spinner.propTypes = {};

export default Spinner;
