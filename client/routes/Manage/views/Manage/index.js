import style from './style/index.scss';

import React, { Component, PropTypes, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  setAactionBarRMenu 
} from '../../actions/actionBar';
import {
  getMenu,
} from '../../reducers/actionBar';

import {
  fetchBasePath
} from '../../actions/meta';
import {
  getMeta
} from '../../reducers/meta';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import history from 'client/history/history';

class Manage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false})

  getAppBarMenu() {
    const menu = {};
    const { rightMenu } = this.props.appBarMenu;
    if (rightMenu) {
      menu.iconElementRight = rightMenu.element;
    }

    return menu;
  }
  
  goHme() {
    history.push('/manage/files');
  }

  render() {
    const appBarMenu = this.getAppBarMenu();
    return (
      <div className="Manage">
        {}
        <AppBar 
          title="Cloud File"
          onTitleTouchTap={this.goHme}
          onLeftIconButtonTouchTap={this.handleToggle}
          {...appBarMenu}
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
          {cloneElement(
            this.props.children,
            { basePath: this.props.meta.basePath }          
          )}
        </div>
      </div>
    );
  }
}

Manage.propTypes = {
  location: PropTypes.object, // react-router 注入属性
  children: PropTypes.node,
  rightMenu: PropTypes.any, // 右侧菜单
};

Manage.need = [ssrGetBasePath];

function ssrGetBasePath(location) {
  return fetchBasePath();
}

function mapStateToProps(state) {
  return {
    appBarMenu: getMenu(state),
    meta: getMeta(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    actions: bindActionCreators({ setAactionBarRMenu }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
