import style from './style/index.scss';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetch from 'client/util/fetch';
import { 
  fetchDirFiles 
} from '../../actions/files';
import { 
  getCurDirInfo,
} from '../../reducers/files';

import FileListItem from '../../components/FileListItem';
import { List, MakeSelectable, ListItem } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { grey400, red500 } from 'material-ui/styles/colors';
import { join } from 'client/util/url';
import history from 'client/history/history';

const iconButtonElement = (
  <IconButton
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (props) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onTouchTap={props.onDownload}>下载</MenuItem>
    <MenuItem>删除</MenuItem>
  </IconMenu>
);

const SelectedList = MakeSelectable(List);
const parentFolder = (
  <ListItem
    value={-1}
    key=".."
    primaryText={
      <p>..</p>
    }
    secondaryText={
      <p>上一层</p>
    }
  />
);

class FileListView extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      downloadFileAddress: null,
    }
  }

  downloadFile = (file) => {
    return () => {
      this.setState({
        downloadFileAddress: join(`files/${encodeURIComponent(file.fullname)}?format=file`),
      });
    }
  }

  selectFile = (event, index) => {
    if(index === -1) {
      history.push(`/manage/files?filename=${this.props.parent}`);
      return;
    }
    const file = this.props.files[index];
    if (file.file) {
      history.push(`/manage/edit?filename=${file.fullname}`);
    } else if (file.directory) {
      history.push(`/manage/files?filename=${file.fullname}`);
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.curDir !== nextProps.curDir;
  // }

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
      curDir
    } = this.props;

    const isRoot = this.props.basePath === curDir;

    const fileItems = files.map((file, index) =>
      <ListItem
        value={index}
        key={file.fullname}
        rightIconButton={rightIconMenu({
          onDownload: this.downloadFile(file),
        })}
        primaryText={
          <p>{file.name}</p>
        }
        secondaryText={
          <p>{file.fullname}</p>
        }
      />
    );

    if (!isRoot) {
      fileItems.unshift(parentFolder);
    }
    
    const downloadFileAddress = this.state.downloadFileAddress;
    return (
      <div className="FileListView">
        <SelectedList onChange={this.selectFile}>
          {fileItems}
        </SelectedList>
        {downloadFileAddress && <iframe src={downloadFileAddress} style={{display: 'none'}} />}
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

FileListView.propTypes = {
  location: PropTypes.object, // react-router 注入属性
  children: PropTypes.node,
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
  const dir = getCurDirInfo(state);
  return {
    files: dir.children,
    curDir: dir.fullname,
    parent: dir.parent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    actions: bindActionCreators({ fetchDirFiles }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileListView);
