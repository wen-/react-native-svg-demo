import React from 'react';

import { useScreens } from 'react-native-screens';
import dva from './tools/dva';
import { createLogger } from 'redux-logger';
import Router from './Router';
import Models from './dvaModel';

useScreens();

const app = dva({
  initialState: {},
  onAction: createLogger()
});

Object.keys(Models).map((key) => {
  app.model(Models[key]);
  return null;
});

app.router(() => (<Router {...this.props} />));

export default app.start();
