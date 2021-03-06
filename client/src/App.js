import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import store from './store';
import Navbar from './components/layout/Navbar';
import LandingPage from './components/layout/LandingPage';
import Routes from './components/routing/Routes';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Container text>
          <Navbar />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route component={Routes} />
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
