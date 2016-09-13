import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class NewFolderDialog extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: undefined,
    };
  }

  handleCancel = () => {
    this.props.onCancel();
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.value);
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleCancel}
      />,
      <FlatButton
        label="确认"
        primary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <Dialog
        title="新建文件夹"
        actions={actions}
        modal={true}
        open={this.props.open}
      >
        <TextField
          value={this.state.value}
          onChange={this.handleChange}
          hintText="请输入合法的文件名"
          floatingLabelText="文件夹名字"
          fullWidth={true}
          rowsMax={1}
        />
    </Dialog>
    );
  }
}

NewFolderDialog.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

NewFolderDialog.defaultProps = {
  open: false,
};

export default NewFolderDialog;