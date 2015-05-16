var React = require('react');
var MainLayout = require('../layout/main');

module.exports = React.createClass({
  render: function() {
    return (
      <MainLayout>
        <h1>Login</h1>
        <form method="post">
          <input type="text" name="usernmae" />
          <input type="password" name="password" />
          <button type="submit">Login</button>
        </form>
      </MainLayout>
    );
  }
});