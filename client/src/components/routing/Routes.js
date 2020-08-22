import React from 'react';
import { Route, Switch } from 'react-router-dom';

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

export default Routes;
