var React = require('react');
var MainLayout = require('../layout/main.jsx');

// require material-ui
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

module.exports = React.createClass({
  btnClick: function() {
    alert('The button works properly on client side');
  },
  render: function() {
    var paperStyle = {
      padding: '10px',
      margin: '10px',
    };
    return (
      <MainLayout>
        <h1>Home</h1>
        <p>
          <RaisedButton
            label="Click Me"
            primary={true}
            onClick={this.btnClick} />
        </p>
        <p>
          <RaisedButton
            label="Click Me"
            secondary={true}
            onClick={this.btnClick} />
        </p>
        <p>
          <RaisedButton
            label="Click Me"
            onClick={this.btnClick} />
        </p>
      </MainLayout>
    );
  },
});