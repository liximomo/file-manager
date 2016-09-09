import style from './style/index.scss';

import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { red500 } from 'material-ui/styles/colors';
import Link from 'react-router/lib/Link';

class Manage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false})

  render() {
    return (
      <div className="Manage">
        <AppBar 
          title="Cloud File"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={256}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
        <div className="Manage__main">
          {this.props.children}
        </div>
        <FloatingActionButton 
          style={{ 
            background: red500,
            position: 'fixed',
            bottom: 23,
            right: 23,
          }}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

Manage.propTypes = {
  location: PropTypes.object, // react-router 注入属性
  children: PropTypes.node,
};

export default Manage;
