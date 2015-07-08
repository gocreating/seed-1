var userModule;

$(function() {
  // exposed
  userModule = {
    getToken: function() {
      return $.cookie('token');
    },
    setToken: function(token) {
      $.cookie('token', token);
    },
  };

  // initialization
  var token = userModule.getToken();
});