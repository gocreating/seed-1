var React = require('react');
var MainLayout = require('../layout/main.jsx');

// require material-ui
var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    Paper = mui.Paper;

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
        <Paper
          zDepth={3}
          style={{
            margin: '10px',
          }}>
          <div
            style={{
              padding: '10px',
            }}>
            <h1>Home</h1>
            <p><RaisedButton label="Click Me" primary={true} onClick={this.btnClick} /></p>
            <p><RaisedButton label="Click Me" secondary={true} onClick={this.btnClick} /></p>
            <p><RaisedButton label="Click Me" onClick={this.btnClick} /></p>
          </div>
        </Paper>
      </MainLayout>
    );
  },
});