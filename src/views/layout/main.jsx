var React = require('react');
var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    FlatButton = mui.FlatButton;
    Dialog = mui.Dialog;

var standardActions = [
  { text: 'Cancel' },
  { text: 'Submit', onClick: this._onDialogSubmit, ref: 'submit' }
];

module.exports = React.createClass({
  handleClick: function() {
    alert(this.props);
  },
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
          <link rel="stylesheet" type="text/css" href="/css/material-ui.css" />
        </head>
        <body>
          <RaisedButton label="Default" />
          <FlatButton onClick={this.handleClick} label="Secondary" secondary={true} />
          <RaisedButton label="Secondary" secondary={true} />
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
          <script src="/js/app.js" />
        </body>
      </html>
    );
  }
});
