var React = require('react');
var MainLayout = require('../layout/main.jsx');

module.exports = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var component = this;
    $
      .post('/api/user/login', {
        username: $('input[name=username]').val(),
        password: $('input[name=password]').val(),
      })
      .done(function(res) {
        if (res.errors.length !== 0) {
          $('input[name=password]').val('');
          component.setState({
            isError: true,
          });
        } else {
          userModule.setToken(res.data.bearerToken);
          window.location = '/user/profile';
        }
      });
  },
  getInitialState: function() {
    return {
      isError: false,
    };
  },
  render: function() {
    var ErrorPanel;
    if (this.state.isError) {
      ErrorPanel = (
        <p>
          wrong username or password
        </p>
      );
    }

    return (
      <MainLayout>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {ErrorPanel}
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