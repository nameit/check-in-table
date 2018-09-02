import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import '../static/scss/index.scss';

import Index from '../containers/index';
import History from '../containers/history';

class RouterMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={ Index } />
          <Route path="/history" component={ History } />
        </Switch>
      </Router>
    );
  }
}

export default RouterMap;
