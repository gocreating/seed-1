var React = require('react');
var MainLayout = require('../layout/main.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <MainLayout>
        <h1>Profile</h1>
        You can see this page only when you are logged in
      </MainLayout>
    );
  },
});