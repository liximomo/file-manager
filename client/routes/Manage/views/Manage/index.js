import style from './style/index.scss';

import React, { Component, PropTypes, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  setAactionBar 
} from '../../actions/actionBar';
import {
  getActionBarProps,
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

  // getAppBarProps() {
  //   const menu = {};
  //   const { rightMenu, title } = this.props.appBar;
  //   if (rightMenu) {
  //     menu.iconElementRight = rightMenu.element;
  //   }

  //   if (title) {
  //     menu.title = title.text;
  //     menu.onTitleTouchTap = title.onTouchTap;
  //   }

  //   return menu;
  // }
  
  goHme() {
    history.push('/manage/files');
  }

  render() {
    const appBar = this.props.appBar;
    return (
      <div className="Manage">
        <AppBar 
          title="Cloud File"
          onTitleTouchTap={this.goHme}
          onLeftIconButtonTouchTap={this.handleToggle}
          {...appBar}
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
  appBar: PropTypes.any, // 右侧菜单
};

Manage.need = [ssrGetBasePath];

function ssrGetBasePath(location) {
  return fetchBasePath();
}

function mapStateToProps(state) {
  return {
    appBar: getActionBarProps(state),
    meta: getMeta(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    actions: bindActionCreators({ setAactionBar }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
