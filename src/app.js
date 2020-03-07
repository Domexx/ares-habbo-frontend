import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';

import { I18nextProvider } from 'react-i18next';
import i18n from './helpers/i18n';

import customHistory from './helpers/history';

import './css/main.css';

import Index from './routes/Index';

render(
  <I18nextProvider i18n={i18n}>
    <Router history={customHistory}>
      <Switch>
        <Route path='/' component={Index} />
      </Switch>
    </Router>
  </I18nextProvider>,
  document.querySelector('.app'),
);

if (module.hot) {
  module.hot.accept();
}
