var React = require('react');
var MainLayout = require('../layout/main');

module.exports = React.createClass({
  render: function() {
    return (
      <MainLayout>
        <h1>Profile</h1>
        This page requires login
      </MainLayout>
    );
  }
});