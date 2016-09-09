import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchFileContent } from '../../actions/file';
import { getFileContent } from '../../reducers/file';
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
  }

  componentDidMount() {
    FileEditor.need.forEach(need => 
      this.props.dispatch(need(this.props.location))
    )
  }

  render() {
    return (
      <div className="FileEditor">
        <AceEditor
          name="Editor"
          mode={getMode(this.props.ext)}
          theme="github"
          value={this.props.content}
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
    ext: file.ext,
    content: file.content,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    actions: bindActionCreators({ fetchFileContent }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileEditor);
