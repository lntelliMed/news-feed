import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import NotFound from '../layout/NotFound';
import SearchNewsPage from '../layout/SearchNewsPage';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path='/search' component={SearchNewsPage} />
      <Route
        exact
        path='/saved-articles'
        render={() => <h1>Saved Articles go here</h1>}
      />
      <Route exact path='/login' render={() => <h1>login page go here</h1>} />
      <Route component={NotFound} />
    </Switch>
  );
};

Routes.propTypes = {
  getNews: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  news: PropTypes.array.isRequired,
  totalResults: PropTypes.number.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default Routes;
