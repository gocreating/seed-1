'use strict';

var React = require('react');

module.exports = React.createClass({
  handleButtonClick: function() {
    alert('haha');
  },
  render: function render() {
    var scripts = (this.props.scripts || []).map(function(src, idx) {
      return <script key={idx} src={src}></script>
    });

    var styles = (this.props.styles || []).map(function(src, idx) {
      return <link key={idx} rel="stylesheet" href={src}/>
    });

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>
            {this.props.title}
          </title>

          <link rel="stylesheet" type="text/css" href="/css/main.css" />
          {styles}
        </head>

        <body>
          <button onClick={this.handleButtonClick}>Click Me</button>
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

        <script src='/js/bundle.js'></script>
      </html>
    );
  }
});