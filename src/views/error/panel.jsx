var React = require('react');

module.exports = React.createClass({
  setErrors: function(errors) {
    this.setState({
      errors: errors,
    });
  },
  getInitialState: function() {
    return {
      errors: this.props.errors || [],
    };
  },
  render: function() {
    if (this.state.errors.length !== 0) {
      return (
        <ul>
          {this.state.errors.map(function(error, idx) {
            return (
              <li key={idx}>
                {error.title}: {error.detail}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return null;
    }
  },
});