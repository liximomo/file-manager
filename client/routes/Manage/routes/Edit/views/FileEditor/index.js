import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchFileContent, saveFile } from '../../actions/file';
import { getFileContent } from '../../reducers/file';

import { 
  setAactionBar 
} from 'client/routes/Manage/actions/actionBar';
import IconButton from 'material-ui/IconButton';
import DoneIcon from 'material-ui/svg-icons/action/done';
import { white } from 'material-ui/styles/colors';

import {
  openSnackBar,
} from 'client/actions/snackBar';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/github';

function getMode(ext) {
  switch (ext)
  {
    case 'js':
      return 'javascript';
    case 'css':
      return 'css';
    case 'html':
      return 'html';
    default:
      return 'markdown';
  }

}

class FileEditor extends Component {
  constructor(props, context) {
    super(props, context);

    this.originFileContent = props.content;

    this.saveBtn = (
      <IconButton onTouchTap={this.saveFile}>
        <DoneIcon color={white} />
      </IconButton>
    );
  }

  onChange = (newValue) => {
    if (this.originFileContent !== newValue) {
      // file changed
      this.curFileContent = newValue;
      this.props.actions.setAactionBar({
        iconElementRight: this.saveBtn,
      });

    } else {
      // 没改变，隐藏保存图标
      this.props.actions.setAactionBar();
    }
  };

  saveFile = () => {
    const {
      actions : {
        saveFile,
        openSnackBar,
        setAactionBar
      },
      fullname,
    } = this.props;
    saveFile({ filename: fullname, content: this.curFileContent })
      .then(() => {
        this.originFileContent = this.curFileContent;
        setAactionBar();
        openSnackBar({
          message: '保存成功！'
        })
      })
      .catch(() => {
        openSnackBar({
          message: '保存失败！请重试！'
        });
      });
  }

  componentDidMount() {
    FileEditor.need.forEach(need => 
      this.props.dispatch(need(this.props.location))
    )
  }

  componentWillUnmount() {
    this.props.actions.setAactionBar();
  }

  render() {
    this.originFileContent = this.props.content;

    return (
      <div className="FileEditor">
        <AceEditor
          name="Editor"
          mode={getMode(this.props.ext)}
          theme="github"
          value={this.props.content}
          onChange={this.onChange}
          width="100%"
          height="calc(100vh - 64px)"
          fontSize={16}
          tabSize={2}
          // onChange={onChange}
          editorProps={{$blockScrolling: true}}
        />
      </div>
    );
  }
}

FileEditor.propTypes = {

};

FileEditor.defaultProps = {

};

FileEditor.need = [ssrGetFileContent];

function ssrGetFileContent(location) {
  const fileName = location.query.filename;
  return fetchFileContent(fileName);
}

function mapStateToProps(state) {
  const file = getFileContent(state);
  return {
    name: file.name,
    fullname: file.fullname,
    ext: file.ext,
    content: file.content,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    actions: bindActionCreators({
      fetchFileContent, saveFile,
      setAactionBar, openSnackBar,
    }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileEditor);
