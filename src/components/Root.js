import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import IssueDetails from './IssueDetails';
import NotFindPage from './NotFindPage';
import Header from './Header'
import Error from './Error'

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path='/' component={App} exact={true}/>
          <Route path="/issue/:id" component={IssueDetails}/>
          <Route component={NotFindPage}/>
        </Switch>
        <Error />
      </div>
    </BrowserRouter>
  </Provider>
);

export default Root;
