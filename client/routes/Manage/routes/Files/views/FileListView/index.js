import style from './style/index.scss';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetch from 'client/util/fetch';
import { 
  fetchDirFiles,
  renameFile,
  checkFile,
  toggleCheck,
} from '../../actions/files';
import { 
  getCurDirInfo,
} from '../../reducers/files';

import FileListItem from '../../components/FileListItem';
import { List, MakeSelectable, ListItem } from 'material-ui/List';
import Fab from '../Fab';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CreateNewFolderIcon from 'material-ui/svg-icons/file/create-new-folder';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import { grey400, red500 } from 'material-ui/styles/colors';
import { join } from 'client/util/url';
import history from 'client/history/history';

import {
  openSnackBar,
} from 'client/actions/snackBar';

import Prompt from 'client/components/Prompt';

const iconButtonElement = (
  <IconButton
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (props) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onTouchTap={props.onMove}>移动到</MenuItem>
    <MenuItem onTouchTap={props.onRename}>重命名</MenuItem>
    <MenuItem onTouchTap={props.onDownload}>下载</MenuItem>
    <MenuItem>删除</MenuItem>
  </IconMenu>
);

const SelectedList = MakeSelectable(List);

const fileCheckBox = (onCheck) =>
  <Checkbox
    style={{ width: 'auto', marginTop: 10 }}
    onCheck={onCheck}
  />;

class FileListView extends Component {
  constructor(props, context) {
    super(props, context);

    this.parentFolder = (
      <ListItem
        onTouchTap={event => this.selectFile(event, -1) }
        key=".."
        primaryText={
          <p>..</p>
        }
        secondaryText={
          <p>上一层</p>
        }
      />
    );

    this.state = {
      selectedFile: null, // 当前选中的文件
      checkedFile: null,
      downloadFileAddress: null,
      prompt: {
        open: false,
      },
    };
  }

  checkFile = (file) => {
    return (event, isInputChecked) => {
      this.props.actions.checkFile({ name: file.fullname, checked: isInputChecked });
    };
  };

  move = (file) => {
    return () => {
      this.props.actions.toggleCheck(true);
    };
  };

  downloadFile = (file) => {
    return () => {
      this.setState({
        downloadFileAddress: join(`files/${encodeURIComponent(file.fullname)}?format=file`),
      });
    };
  };

  rename = (file) => {
    return () => {
      this.fileToRename = file;
      this.setState({
        prompt: {
          open: true,
          title: '重命名文件',
          label: '名称',
          placeholder: file.name,
          defaultValue: file.name,
          selected: true,
          onSubmit: this.handleRename,
        }
      });
    };
  };

  handleRename = (newName) => {
    const { renameFile, openSnackBar } = this.props.actions;
    renameFile(this.fileToRename, newName)
      .then(action => {
        this.setState({
          prompt: {
            open: false,
          }
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

  selectFile = (event, index) => {
    if(index === -1) {
      history.push(`/manage/files?filename=${this.props.parent}`);
      return;
    }
    const file = this.props.files[index];
    if (file.file && !this.props.checkable) {
      history.push(`/manage/edit?filename=${file.fullname}`);
    } else if (file.directory) {
      history.push(`/manage/files?filename=${file.fullname}`);
    }
  }

  hidePrompt = () => {
    this.setState({
      prompt: {
        open: false,
      }
    });
  };

  componentDidMount() {
    FileListView.need.forEach(need =>
      this.props.dispatch(need(this.props.location))
    )
  }

  componentDidUpdate(preProps) {
    if (this.props.location.search === preProps.location.search) return;

    FileListView.need.forEach(need => 
      this.props.dispatch(need(this.props.location))
    )
  }

  render() {
    const {
      files,
      curDir,
      checkable,
    } = this.props;

    const { 
      prompt,
      selectedFile,
    } = this.state;

    const isRoot = this.props.basePath === curDir;

    const palette = this.context.muiTheme.palette;
    const fileItems = files.map((file, index) =>
      <ListItem
        /*leftCheckbox={ checkable ? fileCheckBox(this.checkFile(file)) : undefined }*/
        key={file.fullname}
        rightIconButton={rightIconMenu({
          onMove: this.move(file),
          onDownload: this.downloadFile(file),
          onRename: this.rename(file),
        })}
      > 
        <div style={{ display: 'flex' }}>
          {checkable && fileCheckBox(this.checkFile(file))}
          <div 
            onTouchTap={event => this.selectFile(event, index) }
            style={{
              marginTop: -16,
              marginBottom: -16,
              paddingTop: 16,
              marginLeft: checkable ? 10 : 0, 
              flexGrow: 1
            }}>
            <p style={{ color: palette.textColor}}>{file.name}</p>
            <p style={{ color: palette.secondaryTextColor }}>{file.fullname}</p>
          </div>
        </div>
      </ListItem>
    );

    if (!isRoot) {
      fileItems.unshift(this.parentFolder);
    }
    
    const downloadFileAddress = this.state.downloadFileAddress;
    return (
      <div className="FileListView">
        <List >
          {fileItems}
        </List>
        {downloadFileAddress && <iframe src={downloadFileAddress} style={{display: 'none'}} />}
        <Prompt
          onCancel={this.hidePrompt}
          {...prompt}
        />
        <Fab />
      </div>
    );
  }
}

FileListView.propTypes = {
  location: PropTypes.object, // react-router 注入属性
  children: PropTypes.node,
};

FileListView.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

FileListView.need = [ssrGetFiles];

function ssrGetFiles(location) {
  const filename = location.query.filename;

  if (filename === undefined) {
    return fetchDirFiles('<default>');
  }
  return fetchDirFiles(filename);
}

function mapStateToProps(state) {
  const files = getCurDirInfo(state);
  const dir = files.dirInfo;
  return {
    checkable: files.checkable,
    files: dir.children,
    curDir: dir.fullname,
    parent: dir.parent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    actions: bindActionCreators({ fetchDirFiles, renameFile, checkFile, toggleCheck, openSnackBar }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileListView);
