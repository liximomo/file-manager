import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Prompt extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleCancel = () => {
    this.props.onCancel();
  };

  handleSubmit = () => {
    this.props.onSubmit(this.value);
    //this.setState({ value: null });
  };

  handleChange = (e) => {
    this.value = e.target.value;
    //this.setState({ value: e.target.value });
  };

  selectText = (e) => {
    const target = e.target;
    setTimeout(function() {
      target.select();
    }, 0);
  };

  // componentWillReceiveProps(nextProps) {
  //   if (!this.props.open && nextProps.open) {
  //     this.state = {
  //       value: nextProps.initValue !== undefined ? ,
  //     };
  //   }
  // }

  render() {
    const { title, placeholder, label, selected, defaultValue } = this.props;
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
        title={title}
        actions={actions}
        modal={false}
        onRequestClose={this.handleCancel}
        open={this.props.open}
      >
        <TextField
          ref={this.focusInput}
          autoFocus={true}
          defaultValue={defaultValue}
          onFocus={selected ? this.selectText : undefined}
          onChange={this.handleChange}
          hintText={placeholder}
          floatingLabelText={label}
          fullWidth={true}
          rowsMax={1}
        />
      </Dialog>
    );
  }
}

Prompt.propTypes = {
  open: PropTypes.bool,
  initValue: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

Prompt.defaultProps = {
  open: false,
};

export default Prompt;