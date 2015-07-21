import React from 'react';
import {RouteHandler} from 'react-router';

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      title: '',
      scripts: [],
      styles: [],
    };
  },
  render: function() {
    var scripts = this.props.scripts.map(function(src, idx) {
      return <script key={idx} src={src}/>;
    });

    var styles = this.props.styles.map(function(src, idx) {
      return <link key={idx} rel="stylesheet" href={src}/>;
    });

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>{this.props.title}</title>
          {styles}
        </head>

        <body>
          {this.props.children}
          {scripts}
        </body>
      </html>
    );
  },
});