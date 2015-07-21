var React = require('react');

var mui = require('material-ui');
var Paper = mui.Paper;

module.exports = React.createClass({
  render: function() {
    return (
      <Paper
        zDepth={2}
        className='nav'>

        <h1>Navbar</h1>
        <div>
          <h3>General</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>

        <div>
          <h3>User</h3>
          <ul>
            <li><a href="/user/register">Register</a></li>
            <li><a href="/user/login">Login</a></li>
            <li><a href="/user/profile">Profile</a></li>
            <li><a href="/user/logout">Logout</a></li>
          </ul>
        </div>

        <div>
          <h3>Example</h3>
          <ul>
            <li><a href="/todo">Todo</a></li>
          </ul>
        </div>
      </Paper>
    );
  },
});