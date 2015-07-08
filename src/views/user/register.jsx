var React = require('react');
var MainLayout = require('../layout/main.jsx');

module.exports = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var component = this;
    $
      .post('/api/user', {
        username: $('input[name=username]').val(),
        password: $('input[name=password]').val(),
      })
      .done(function(res) {
        if (res.errors.length !== 0) {
          component.setState({
            isUserExist: true,
          });
        } else {
          window.location = '/user/login';
        }
      });
  },
  getInitialState: function() {
    return {
      isUserExist: false,
    };
  },
  render: function() {
    var ErrorPanel;
    if (this.state.isUserExist) {
      ErrorPanel = (
        <p>
          the user already exists
        </p>
      );
    }

    return (
      <MainLayout>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {ErrorPanel}
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