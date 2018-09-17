import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import '../static/scss/index.scss';

import AddUser from '../containers/add-user';
import CheckIn from '../containers/check-in';
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
          <Route path="/" exact component={ AddUser } />
          <Route path="/history" component={ History } />
          <Route path="/check-in" component={ CheckIn } />
        </Switch>
      </Router>
    );
  }
}

export default RouterMap;
