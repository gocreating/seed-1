/** In this file, we create a React component which incorporates components provided by material-ui */

var React        = require('react'),
    mui          = require('material-ui'),
    RaisedButton = mui.RaisedButton;
    MenuItem     = mui.MenuItem;
    LeftNav      = mui.LeftNav;

var menuItems = [
  { route: 'get-started', text: 'Get Started' },
  { route: 'css-framework', text: 'CSS Framework' },
  { route: 'components', text: 'Components' },
  { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
  { 
     type: MenuItem.Types.LINK, 
     payload: 'https://github.com/callemall/material-ui', 
     text: 'GitHub' 
  },
  { 
     text: 'Disabled', 
     disabled: true 
  },
  { 
     type: MenuItem.Types.LINK, 
     payload: 'https://www.google.com', 
     text: 'Disabled Link', 
     disabled: true 
  },
];

var Main = React.createClass({
  handleNavChange: function(e, selectedIndex, menuItem) {
    console.log(selectedIndex, menuItem);
  },
  _handleTouchTap: function() {
    this.refs.myNav.toggle();
  },
  render: function() {
    return (
      <div className="example-page">
        <LeftNav ref="myNav" docked={false} menuItems={menuItems} onChange={this.handleNavChange} />

        <h1>Seed with material-ui</h1>
        <h2>example project</h2>

        <RaisedButton label="Toggle LeftNav" primary={true} onClick={this._handleTouchTap} />
      </div>
    );
  },  
});

module.exports = Main;