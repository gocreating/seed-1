import React from 'react';
import DefaultLayout from '../layout/defaultLayout.jsx';
import {RaisedButton} from 'material-ui';

module.exports = React.createClass({
  handleBtnClick: function() {
    alert('The button works properly on client side');
  },
  render: function() {
    return (
      <DefaultLayout>
        <h1>Home</h1>
        <p>
          <RaisedButton
            label="Click Me"
            primary={true}
            onClick={this.handleBtnClick} />
        </p>
        <p>
          <RaisedButton
            label="Click Me"
            secondary={true}
            onClick={this.handleBtnClick} />
        </p>
        <p>
          <RaisedButton
            label="Click Me"
            onClick={this.handleBtnClick} />
        </p>
      </DefaultLayout>
    );
  },
});