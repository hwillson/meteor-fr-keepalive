import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import IssueForm from './IssueForm';

const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    req.options.headers.authorization =
      `Bearer ${Meteor.settings.public.github.token}`;
    next();
  },
}]);

const client = new ApolloClient({ networkInterface });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueNumber: null,
    };
    this.setIssueNumber = this.setIssueNumber.bind(this);
  }

  setIssueNumber(issueNumber) {
    this.setState({ issueNumber });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <IssueForm
          issueNumber={this.state.issueNumber}
          setIssueNumber={this.setIssueNumber}
        />
      </ApolloProvider>
    );
  }
}

export default App;
