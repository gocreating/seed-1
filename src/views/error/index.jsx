var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>Error Report</title>
        </head>
        <body>
          <h2>Error Message</h2>
          <p>
            {this.props.message}
          </p>
        
          <h2>Error Stack</h2>
          <pre>
            {this.props.stack}
          </pre>
        </body>
      </html>
    );
  }
});