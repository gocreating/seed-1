var React = require('react');
var MainLayout = require('../layout/main.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <MainLayout>
        <h1>Register</h1>
        {this.props.msg}
        <form method="post">
          <input type="text" name="username" />
          <input type="password" name="password" />
          <button type="submit">Send</button>
        </form>
      </MainLayout>
    );
  },
});