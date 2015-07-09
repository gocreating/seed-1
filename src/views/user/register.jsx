var React = require('react');
var MainLayout = require('../layout/main.jsx');
var ErrorPanel = require('../error/panel.jsx');

module.exports = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    $
      .post('/api/user', {
        username: $('input[name=username]').val(),
        password: $('input[name=password]').val(),
      })
      .done(function(res) {
        if (res.errors.length !== 0) {
          this.refs.errPanel.setErrors(res.errors);
        } else {
          window.location = '/user/login';
        }
      }.bind(this));
  },
  render: function() {
    return (
      <MainLayout>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <ErrorPanel ref="errPanel" />
          <p>
            <input type="text" name="username" placeholder="username" />
          </p>
          <p>
            <input type="password" name="password" placeholder="password" />
          </p>
          <p>
            <button type="submit">Register</button>
          </p>
        </form>
      </MainLayout>
    );
  },
});