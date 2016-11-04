import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Alert extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: true,
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { content } = this.props;
    const actions = [
      <FlatButton
        label="确认"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        {content}
      </Dialog>
    );
  }
}

Alert.propTypes = {
  content: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Alert;