var React = require('react');
var MainLayout = require('../layout/main.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <MainLayout>
        <h1>Unauthorize</h1>
        <p>{this.props.detail}</p>
        <p>
          Please <a href="/user/login">login</a> first
        </p>
      </MainLayout>
    );
  },
});