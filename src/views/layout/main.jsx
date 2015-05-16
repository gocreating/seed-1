var React = require('react');

var MainLayout = React.createClass({
  getDefaultProps: function() {
    return {
      title: 'Seed'
    };
  },
  render: function() {
    return (
      <html>        
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" type="text/css" href="/css/main.css" />
        </head>
        <body>
          <nav>
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
          </nav>
          <hr />
          {this.props.children}
        </body>
      </html>
    );
  }
});

module.exports = MainLayout;