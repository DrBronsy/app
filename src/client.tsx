import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {createStore} from 'store/index';

import App from 'components/App';

const store = createStore((window as any).__PRELOADED_STATE__);

import './scss/index.scss';

ReactDOM.hydrate(
    (
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root'),
);