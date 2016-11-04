import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { 
  DIALOG_TYPE
} from 'client/constants/DialogTypes';

class GlobalDialog extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.initValue === undefined ? null : props.initValue,
    };
  }

  handleCancel = () => {
    this.props.props.onCancel();
  };

  handleSubmit = () => {
    this.props.props.onSubmit(this.state.value);
    this.setState({ value: null });
  };

  handleChange = (e) => {
    this.resetValue = false;
    this.setState({ value: e.target.value });
  };

  selectText = (e) => {
    const target = e.target;
    setTimeout(function() {
      target.select();
    }, 0);
  };

  getDialogProps() {
    const props = {};
    switch (this.props.type) {
      case DIALOG_TYPE.PROMT:
        props.dialogProps.actions = [
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
        props.dialogProps.onRequestClose= this.
      case DIALOG_TYPE.DIALOG: 
        props.actions = this.props.actions;

      default:
        break
    }
    props.contentProps = this.props.props;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.state = {
        value: nextProps.initValue,
      };
    }
  }

  render() {
    const { title, placeholder, label, selected, initValue } = this.props;
    const actions = ;

    return (
      <Dialog
        title={title}
        modal={false}
        open={this.props.open}
        actions={actions}
        onRequestClose={this.handleCancel}
      >
        <TextField
          ref={this.focusInput}
          autoFocus={true}
          value={this.state.value}
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

GlobalDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
  props: PropTypes.any,
};
  // promt
  // initValue: PropTypes.string,
  // title: PropTypes.string,
  // placeholder: PropTypes.string,
  // label: PropTypes.string,
  // onCancel: PropTypes.func,
  // onSubmit: PropTypes.func,

GlobalDialog.defaultProps = {
  open: false,
};

export default GlobalDialog;