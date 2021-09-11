import * as React from 'react';

import {connect} from 'react-redux';
import {block as bem} from 'bem-cn';

import {State as StoreTree} from 'store/index';

import './index.scss';

interface Props {
}

interface State {
}

const block = bem('app');

export class App extends React.Component<Props, State> {
  public render() {
    return (
        <section className={block()}>
          <p>Hallow World!</p>
        </section>
    );
  }
}

export default connect(
    (state: StoreTree) => ({}),
    (dispatch) => ({}),
)(App);

