import React from 'react';
import { create } from 'dva-core';
import { Provider, connect } from 'react-redux';

export { connect };

export default function (opts = {}) {
  const app = create(opts);
  const oldAppStart = app.start;
  app.router = router;
  app.start = start;
  return app;

  function router(router) {
    app._router = router;
  }

  function start() {
    if (!app._store) {
      oldAppStart.call(app);
    }
    const store = app._store;

    // export _getProvider for HMR
    // ref: https://github.com/dvajs/dva/issues/469
    app._getProvider = getProvider.bind(null, store, app);

    return getProvider(store, this, this._router);
  }
}

function getProvider(store, app, router) {
  return extraProps => (
    <Provider store={store}>
      { router({ app, ...extraProps }) }
    </Provider>
  );
}
