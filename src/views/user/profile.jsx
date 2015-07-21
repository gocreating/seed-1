import React from 'react';
import DefaultLayout from '../layout/defaultLayout.jsx';

module.exports = React.createClass({
  render: function() {
    return (
      <DefaultLayout>
        <h1>Profile</h1>
        You can see this page only when you are logged in
      </DefaultLayout>
    );
  },
});