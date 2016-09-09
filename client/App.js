import style from './style/index.scss';

import React, { Component, PropTypes } from 'react';

// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './style/theme.js';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)} >
        <div className="App">
          <div className={style.wrapper}>
            <div className="App__main">
              {this.props.children}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  location: PropTypes.object, // react-router 注入属性
  children: PropTypes.node,
};

export default App;
