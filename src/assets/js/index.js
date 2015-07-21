import React from 'react';
import Router from 'react-router';
import routes from '../../configs/routes';

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler path={window.location.pathname} />, document);
});

// @ifdef DEV
document.write(
  ('<script \
    async \
    src="http://HOST:PORT/browser-sync/browser-sync-client.2.7.1.js">\
   <\/script>')
  .replace(
    'HOST:PORT',
    window.location.hostname + ':/* @echo BROWSER_SYNC_SNIPPET_PORT */'
  )
);
// @endif