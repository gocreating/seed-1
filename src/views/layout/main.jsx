'use strict';

var React = require('react');

// require material-ui
var mui = require('material-ui');
var Paper = mui.Paper;

module.exports = React.createClass({
  render: function render() {
    var scripts = (this.props.scripts || []).map(function(src, idx) {
      return <script key={idx} src={src}/>;
    });

    var styles = (this.props.styles || []).map(function(src, idx) {
      return <link key={idx} rel="stylesheet" href={src}/>;
    });

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>
            {this.props.title || 'Seed'}
          </title>

          <link rel="stylesheet" type="text/css" href="/css/main.css" />
          <link rel="stylesheet" type="text/css" href="/css/material-ui.css" />
          {styles}
          <script src="https://code.jquery.com/jquery-2.1.4.min.js" />
          <script
            src="//cdn.jsdelivr.net/jquery.cookie/1.4.1/jquery.cookie.min.js" />
        </head>

        <body>
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
          </Paper>

          <Paper
            zDepth={1}
            style={{
              margin: '0px 10px 10px 10px',
            }}>
            <div
              style={{
                padding: '10px',
              }}>
              {this.props.children}
            </div>
          </Paper>
          <script src='/js/bundle.js'></script>
          <script src='/js/userModule.js'></script>
        </body>
      </html>
    );
  },
});