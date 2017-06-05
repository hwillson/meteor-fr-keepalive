# meteor-fr-keepalive

Small app used to help with the `meteor/meteor-feature-requests` migration process.

## Overview

This is a small Meteor + Apollo (GraphQL) web application that:

- Asks for a `meteor/meteor` GitHub issue ID
- Connects to GitHub's GraphQL API, to load up the specified issue details
- Extracts the current issue title
- Generates a `meteor/meteor-feature-requests` new issue link using the specified issue ID and retrieved GH issue title
- Inserts the new issue link into the pre-canned `meteor/meteor-feature-requests` migration text (making sure it's properly url-encoded)
- Returns the full migration text to be copied/pasted into feature requests that are being closed on `meteor/meteor`

![Screenshot](https://raw.githubusercontent.com/hwillson/meteor-fr-keepalive/master/images/screenshot.png)

## Installation / Running

**Note:** You will need a [GitHub personal access token](https://github.com/settings/tokens) with public repo read access.

1. `git clone https://github.com/hwillson/meteor-fr-keepalive.git`
2. Modify `app/settings.json` to add in your GH personal access token.
3. `cd app; meteor npm start`
4. Access http://localhost:3000.
