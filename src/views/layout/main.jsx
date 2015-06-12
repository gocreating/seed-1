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
    var scripts = (this.props.scripts || []).map(function(src, idx) {
      return <script key={idx} src={src}></script>
    });

    var styles = (this.props.styles || []).map(function(src, idx) {
      return <link key={idx} rel="stylesheet" href={src}/>
    });

    if (!this.props.serverRender) {
      return (
        <div>{this.props.children}</div>
      );
    }

    return (
      <html>        
        <head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <title>{this.props.title}</title>
          <link rel="stylesheet" type="text/css" href="/css/main.css" />
          <link rel="stylesheet" type="text/css" href="/css/material-ui.css" />
          {styles}
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
