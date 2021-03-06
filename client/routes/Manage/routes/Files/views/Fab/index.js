import style from './style/index.scss';

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import CreateNewFolderIcon from 'material-ui/svg-icons/file/create-new-folder';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import { red500 } from 'material-ui/styles/colors';

import {
  openSnackBar,
} from 'client/actions/snackBar';
import { 
  startProgress,
  endProgress,
} from 'client/actions/status';

import Prompt from 'client/components/Prompt';
// import Alert from 'client/components/Prompt';

// import NewFolderDialog from '../../components/NewFolderDialog';

import { createFolder, uploadFile } from '../../actions/files';

class Fab extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      fabExpand: false,
      isCreatingFolder: false,
      // alert: undefined,
    };

    this.actions = [
      {tooltip: '新建文件夹', icon: <CreateNewFolderIcon />, action: this.createFolder, id:'folder'},
      {tooltip: '上传文件', icon: <FileUploadIcon />, action: this.triggerUploadFile, id: 'file'},
    ];
  }

  toggleFab = () => {
    this.setState({
      fabExpand: !this.state.fabExpand,
    });
  };

  triggerUploadFile = () => {
    this.uploader.click();
  };

  doUploadFile = file => {
    const { 
      uploadFile, openSnackBar, 
      startProgress, endProgress
    } = this.props.actions;

    startProgress();
    uploadFile(file)
      .then(action => {
        endProgress();

        if (action.error) {
          openSnackBar({
            message: action.payload.message
          });
          return;
        }

        if (action.fatalError) {
          openSnackBar({
            message: '发生错误！'
          });
          return;
        }
      });
  };

  createFolder = () => {
    this.setState({
      isCreatingFolder: true,
    });
  };

  handleCancelCreateFolder = () => {
    this.setState({
      isCreatingFolder: false,
    });
  };

  handleCreateFolder = (name) => {
    const { createFolder, openSnackBar } = this.props.actions;
    createFolder(name)
      .then(action => {
        this.setState({
          isCreatingFolder: false,
        });

        if (action.error) {
          openSnackBar({
            message: action.payload.message
          });
          return;
        }

        if (action.fatalError) {
          openSnackBar({
            message: '发生错误！'
          });
          return;
        }
      });
  };

  handleActionResponse = (cb) => action => {
    const { openSnackBar } = this.props.actions;
    if (action.error) {
      openSnackBar({
        message: action.payload.message
      });
      return;
    }

    if (action.fatalError) {
      openSnackBar({
        message: '发生错误！'
      });
      return;
    }
    cb && cb();
  };

  getFabActions() {
    const primaryColor = this.context.muiTheme.palette.primary1Color;
    return this.actions.map((action, index) => {
      const event = {};

      const delay = (30 * (this.state.fabExpand ? (this.actions.length - index) : index))

      if (action.action) {
        event.onTouchTap = () =>
          this.setState({
            fabExpand: false,
          }, action.action);
      }

      return (
        <div className={style.action} style={{opacity: this.state.fabExpand ? 1 : 0.01}} key={action.id} >
          <div className={style.tooltip} style={{transitionDelay: delay + 'ms'}}>
            {action.tooltip}
          </div>
          <div className={style.button} style={{transitionDelay: delay + 'ms'}} {...event} >
            <FloatingActionButton mini={true} backgroundColor='#fff' iconStyle={{fill: primaryColor}}>
              {action.icon}
            </FloatingActionButton>
          </div>
        </div>
      );
    });
  }

  componentDidMount() {
    this.uploader = window.document.createElement('input');
    this.uploader.type = 'file';
    this.uploader.addEventListener('change', () => {
      this.doUploadFile(this.uploader.files[0]);
      this.uploader.value = null;
      return false;
    }, false);
  }

  render() {
    return (
      <div className={(this.state.fabExpand ? style.opened : style.closed)}>
        <div className={style.cover} style={{height: this.state.fabExpand ? '100vh' : 0}} onTouchTap={this.toggleFab} />
        <div 
          className={style.container} 
          style={{
            position: 'fixed',
            bottom: 23,
            right: 23,
          }}
        >
          <div className={style.actions} >
            {this.getFabActions()}
          </div>
          <FloatingActionButton onTouchTap={this.toggleFab} className={style.main}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <Prompt 
          open={this.state.isCreatingFolder}
          title="新建文件夹"
          label="文件夹名字"
          placeholder="请输入合法的文件名"
          onCancel={this.handleCancelCreateFolder}
          onSubmit={this.handleCreateFolder}
        />
        </div>
    );
  }
}

Fab.propTypes = {
  location: PropTypes.object, // react-router 注入属性
  children: PropTypes.node,
};

Fab.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    actions: bindActionCreators({ 
      createFolder,
      uploadFile,
      openSnackBar,
      startProgress,
      endProgress
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fab);
