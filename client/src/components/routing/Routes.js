import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from '../layout/NotFound';
import SearchNewsPage from '../layout/SearchNewsPage';
import SavedNewsArticles from '../layout/SavedNewsArticles';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/search' component={SearchNewsPage} />
      <Route exact path='/saved-articles' component={SavedNewsArticles} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
