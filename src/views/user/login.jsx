var React = require('react');
var MainLayout = require('../layout/main.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <MainLayout>
        <h1>Login</h1>
        <form method="post">
          <p>
            <input type="text" name="username" placeholder="username" />
          </p>
          <p>
            <input type="password" name="password" placeholder="password" />
          </p>
          <p>
            <button type="submit">Login</button>
          </p>
        </form>
      </MainLayout>
    );
  },
});