import style from './style/index.scss';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { 
  closeSnackBar,
} from './actions/snackBar';
import { 
  getSnackBar,
} from './reducers/snackBar';

import { 
  getStatus,
} from './reducers/status';

// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './style/theme.js';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleRequestClose = () => this.props.actions.closeSnackBar({});

  waiting() {
    return (
      <div className="back-overlay">
        <CircularProgress className="pop--center"/>
      </div>
    );  
  }

  render() {
    const progress = this.props.status.progress;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)} >
        <div className="App">
          <div className={style.wrapper}>
            <div className="App__main">
              {this.props.children}
            </div>
          </div>
          <Snackbar
            open={this.props.snackBar.open}
            message={this.props.snackBar.message}
            autoHideDuration={2000}
            onRequestClose={this.handleRequestClose}
          />
          {progress.show && this.waiting()}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  location: PropTypes.object, // react-router 注入属性
  children: PropTypes.node,
};

function mapStateToProps(state) {
  return {
    status: getStatus(state),
    snackBar: getSnackBar(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ closeSnackBar }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
