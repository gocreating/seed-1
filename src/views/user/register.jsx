import React from 'react';
import DefaultLayout from '../layout/defaultLayout.jsx';
import ErrorPanel from '../error/panel.jsx';

export default React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    $
      .post('/api/user', {
        username: $('input[name=username]').val(),
        password: $('input[name=password]').val(),
      })
      .fail(function(err) {
        var res = err.responseJSON;
        this.refs.errPanel.setErrors(res.errors);
        res.validationErrors.forEach(function(err) {
          $('[name=' + err.property + ']')
            .css({
              'border-color': 'red',
            })
            .parent()
            .append('<p>' + err.msg + '</p>');
        });
      }.bind(this))
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
      <DefaultLayout>
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
      </DefaultLayout>
    );
  },
});