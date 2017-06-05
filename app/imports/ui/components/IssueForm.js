import React from 'react';
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';

let styles;

const IssueForm = ({ data, setIssueNumber }) => {
  let issueNumberInput;
  function buildMessage(event) {
    event.preventDefault();
    const issueNumber = +issueNumberInput.value;
    if (issueNumber && Number.isInteger(issueNumber)) {
      setIssueNumber(issueNumber);
    }
  }

  const migrationMessage = () => {
    let message = '';

    if (data && !data.loading && data.repository) {
      const issueNumber = data.repository.issue.number;
      const title = data.repository.issue.title;

      const newIssueLink =
        'https://github.com/meteor/meteor-feature-requests/issues/new'
        + `?title=${encodeURIComponent(title)}`
        + `&body=Migrated%20from:%20meteor/meteor%23${issueNumber}`;

      message =
        'To help provide a more clear separation between feature requests and '
        + 'bugs, and to help clean up the feature request backlog, Meteor '
        + 'feature requests are now being managed under the '
        + 'https://github.com/meteor/meteor-feature-requests repository. '
        + '\n\n'
        + 'This feature request will be closed here, but anyone interested '
        + 'in migrating this feature request to the new repository (to make '
        + `sure it stays active), can click [here](${newIssueLink}) to start `
        + 'the feature request migration process. This manual migration '
        + 'process is intended to help identify which of the older feature '
        + 'requests are still considered to be of value to the community. '
        + 'Thanks!';
    }
    return message;
  };

  return (
    <Grid className={css(styles.base)}>
      <Row>
        <Col md={12}>
          <Form inline onSubmit={buildMessage}>
            <FormGroup controlId="issueForm">
              <ControlLabel>Issue Number</ControlLabel>
              {' '}
              <FormControl
                type="text"
                placeholder="e.g. 8759"
                inputRef={(ref) => { issueNumberInput = ref; }}
              />
            </FormGroup>
            {' '}
            <Button
              bsStyle="primary"
              type="submit"
            >
              Build Message
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className={css(styles.migrationMessage)}>
        <Col md={6}>
          <Form>
            <FormGroup controlId="issueForm">
              <ControlLabel>Migration Message</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows="12"
                value={migrationMessage()}
              />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Grid>
  );
};

styles = StyleSheet.create({
  base: {
    marginTop: 20,
  },
  migrationMessage: {
    marginTop: 20,
  },
});

IssueForm.propTypes = {
  data: PropTypes.object,
  setIssueNumber: PropTypes.func.isRequired,
};

IssueForm.defaultProps = {
  data: {},
};

const issueQuery = gql`
  query getIssue ($issueNumber: Int!) {
    repository(owner: "meteor", name: "meteor") {
      issue(number: $issueNumber) {
        number,
        title
      }
    }
  }
`;

export default graphql(issueQuery, {
  skip(props) {
    return !props.issueNumber;
  },
})(IssueForm);
