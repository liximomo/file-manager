if (process.env.PLANTFORM === 'web') {
  module.exports = require('react-router/lib/browserHistory');
} else {
  module.exports = require('react-router/lib/hashHistory');
}
