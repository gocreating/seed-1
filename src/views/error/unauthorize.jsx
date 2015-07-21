import React from 'react';
import DefaultLayout from '../layout/defaultLayout.jsx';

module.exports = React.createClass({
  render: function() {
    return (
      <DefaultLayout>
        <h1>Unauthorize</h1>
        <p>{this.props.detail}</p>
        <p>
          Please <a href="/user/login">login</a> first
        </p>
      </DefaultLayout>
    );
  },
});