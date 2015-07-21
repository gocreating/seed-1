import React from 'react';
import DefaultLayout from '../layout/defaultLayout.jsx';
import ErrorPanel from '../error/panel.jsx';

export default React.createClass({
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
      <DefaultLayout>
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
      </DefaultLayout>
    );
  },
});