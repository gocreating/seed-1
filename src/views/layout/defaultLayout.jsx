import React from 'react';
import BaseLayout from './baseLayout.jsx';

var mui = require('material-ui');
var Paper = mui.Paper;
var Nav = require('../components/nav.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <BaseLayout
        title="Seed"
        scripts={[
          'https://code.jquery.com/jquery-2.1.4.min.js',
          '//cdn.jsdelivr.net/jquery.cookie/1.4.1/jquery.cookie.min.js',
          '/js/bundle.js',
          '/js/userModule.js',
        ]}
        styles={[
          '/css/main.css',
          '/css/material-ui.css',
        ]} >
        <Nav />
        <Paper
          zDepth={1}
          style={{
            margin: '0px 10px 10px 10px',
          }}>
          <div
            style={{
              padding: '10px',
            }}>
            {this.props.children}
          </div>
        </Paper>
      </BaseLayout>
    );
  },
});