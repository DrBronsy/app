import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  RelayEnvironmentProvider
} from 'react-relay/hooks';
import {BrowserRouter} from 'react-router-dom';

import App from 'components/App';

import RelayEnvironment from 'relay/environment';
import './scss/index.scss';

ReactDOM.hydrate(
    (
        <RelayEnvironmentProvider environment={RelayEnvironment}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RelayEnvironmentProvider>
    ),
    document.getElementById('root'),
);