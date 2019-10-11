import React from 'react';
import { browserHistory } from 'react-router';

// Router
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// Container Components
import { Home, Login, Detail, Board } from './pages';

class RootApp extends React.Component {
  render() {
    return(
      <BrowserRouter history={browserHistory}>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/board" component={Board}/>
          <Route path="/detail" component={Detail}>
            <Route path="/detail/:name?" component={Detail}/>
          </Route>
          <Redirect from="/" to="/login"></Redirect>
        </Switch>
    </BrowserRouter>
    );
  }
}
module.hot.accept();

export default RootApp;