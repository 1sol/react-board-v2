import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Container Components
import { App, Login, Detail } from 'containers';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <div>
          <Route path="/" component={App}/>
          <Route path="/login" component={Login}/>
          <Route path="/detail" component={Detail}/>
        </div>
      </Router>
    </Provider>
    , document.getElementById('root')
);

module.hot.accept();