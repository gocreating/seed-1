var userModule;

$(function() {
  // private
  // var injectHeader = function(token) {
  //   if (token) {
  //     $.ajaxSetup({
  //       headers: {
  //         authorization: 'Bearer ' + token,
  //       },
  //     });
  //   }
  // };

  // exposed
  userModule = {
    getToken: function() {
      return $.cookie('token');
    },
    setToken: function(token) {
      $.cookie('token', token);
      // injectHeader(userModule.getToken());
    },
  };

  // initialization
  console.log('=== user module ===');
  var token = userModule.getToken();
  console.log('token:', token);
  // injectHeader(token);
});