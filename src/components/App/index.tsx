import * as React from 'react';
// @ts-ignore
import { graphql } from 'babel-plugin-relay/macro'
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';
import {block as bem} from 'bem-cn';

import RelayEnvironment from "relay/environment";
import fetch from "relay/fetch";

import './index.scss';

interface Props {
}

interface State {
}

const block = bem('app');

const RepositoryNameQuery = graphql`
    query AppRepositoryNameQuery {
        repository(owner: "facebook", name: "relay") {
            name
        }
    }
`;

const preloadedQuery = loadQuery(RelayEnvironment, RepositoryNameQuery, {
  /* query variables */
});

export default class App extends React.Component<Props, State> {
  public render() {
    const data = usePreloadedQuery(RepositoryNameQuery, preloadedQuery);

    return (
        <section className={block()}>
          <p>{data.repository.name}</p>
        </section>
    );
  }
}
