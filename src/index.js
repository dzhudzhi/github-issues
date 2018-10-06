import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Root from './components/Root';

const store = configureStore();

render(
  <Root store={ store } />,
  document.getElementById('root')
);
