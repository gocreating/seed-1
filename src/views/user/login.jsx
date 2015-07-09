var React = require('react');
var MainLayout = require('../layout/main.jsx');
var ErrorPanel = require('../error/panel.jsx');

module.exports = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    $
      .post('/api/user/login', {
        username: $('input[name=username]').val(),
        password: $('input[name=password]').val(),
      })
      .done(function(res) {
        if (res.errors.length !== 0) {
          $('input[name=password]').val('');
          this.refs.errPanel.setErrors(res.errors);
        } else {
          userModule.setToken(res.data.bearerToken);
          window.location = '/user/profile';
        }
      }.bind(this));
  },
  render: function() {
    return (
      <MainLayout>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <ErrorPanel ref="errPanel" />
          <p>
            <input type="text" name="username" placeholder="username" />
          </p>
          <p>
            <input type="password" name="password" placeholder="password" />
          </p>
          <p>
            <button type="submit">Login</button>
          </p>
        </form>
      </MainLayout>
    );
  },
});