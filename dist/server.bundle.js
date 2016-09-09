/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

	var _express = __webpack_require__(4);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(5);

	var _path2 = _interopRequireDefault(_path);

	var _fs = __webpack_require__(6);

	var _fs2 = _interopRequireDefault(_fs);

	var _config = __webpack_require__(7);

	var _config2 = _interopRequireDefault(_config);

	var _config3 = __webpack_require__(8);

	var _config4 = _interopRequireDefault(_config3);

	var _assets = __webpack_require__(9);

	var _assets2 = _interopRequireDefault(_assets);

	var _file = __webpack_require__(11);

	var _file2 = _interopRequireDefault(_file);

	var _errors = __webpack_require__(17);

	var _reactServerRender = __webpack_require__(18);

	var _reactServerRender2 = _interopRequireDefault(_reactServerRender);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Initialize the Express App
	var app = new _express2.default();
	app.set('views', _path2.default.resolve(_config2.default.projectPath, './views'));
	app.set('view engine', 'pug');

	function apiErrorHandler(err, req, res, next) {
	  var error = { error: err.message };
	  if (false) {
	    return res.status(500).send('<pre>' + err.stack + '<pre>');
	  }
	  return res.status(500).send(error);
	}

	// api 路由
	app.use('/api', _assets2.default);
	app.use('/api', _file2.default);
	app.use('/api', apiErrorHandler);

	// 静态 host
	app.use(_config2.default.publicPath, _express2.default.static(_config2.default.distPath));

	// 静态页面
	// app.use((req, res) => {
	//   res.render('manager/index', { title: 'hello world!'});
	// });
	app.use(_reactServerRender2.default);

	// 错误页面
	app.use(_errors.errorPage);

	app.listen(_config4.default.port, _config4.default.host, function (error) {
	  if (error) {
	    throw error;
	  }

	  console.log('app is running on ' + _config4.default.host + ':' + _config4.default.port);
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	global.document = __webpack_require__(3).jsdom('<body></body>');
	global.window = document.defaultView;
	global.navigator = window.navigator;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("jsdom");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var path = __webpack_require__(5);

	var projectPath = path.resolve(__dirname, '..');

	var config = {
	  projectPath: projectPath,
	  modulePath: projectPath + '/modules',
	  distPath: projectPath + '/dist',
	  publicPath: '/static/'
	};

	// 需要 webpakc 编译的目录
	config.srcPath = [projectPath + '/configs', projectPath + '/modules', projectPath + '/client', projectPath + '/server'];

	config.resolve = {
	  root: [
	  // 模块路径 待定
	  config.modulePath],
	  alias: {
	    server: config.projectPath + '/server',
	    client: config.projectPath + '/client',
	    libs: config.libPath
	  }
	};

	module.exports = config;
	/* WEBPACK VAR INJECTION */}.call(exports, "configs"))

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  basePath: '/Users/mymomo/',
	  host: '0.0.0.0',
	  port: 8080,
	  devPort: 3000
	};

	exports.default = config;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(4);

	var _express2 = _interopRequireDefault(_express);

	var _formidable = __webpack_require__(10);

	var _formidable2 = _interopRequireDefault(_formidable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 替换置顶的服务器资源
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	function replaceAssets(req, res) {
	  var form = new _formidable2.default.IncomingForm();

	  form.parse(req, function (err, fields, files) {
	    // res.writeHead(200, {'content-type': 'text/plain'});
	    // res.write('received upload:\n\n');
	    res.end(util.inspect({ fields: fields, files: files }));
	  });
	}

	var router = new _express2.default.Router();

	// replace assets
	router.route('/assets').put(replaceAssets);

	exports.default = router;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("formidable");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(4);

	var _express2 = _interopRequireDefault(_express);

	var _file = __webpack_require__(12);

	var fileUtil = _interopRequireWildcard(_file);

	var _paramsRoute = __webpack_require__(14);

	var _paramsRoute2 = _interopRequireDefault(_paramsRoute);

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	var _optimist = __webpack_require__(15);

	var _mime = __webpack_require__(16);

	var _mime2 = _interopRequireDefault(_mime);

	var _path = __webpack_require__(5);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var basePath = _optimist.argv.basePath !== undefined ? _optimist.argv.basePath : _config2.default.basePath;
	function checkPath(req, res, next, fiename) {
	  if (fiename.indexOf(basePath) === 0 || fiename === '<default>') {
	    next();
	  } else {
	    res.status(403).end();
	  }
	}

	/**
	 * 得到 basePath
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	function getBasePath(req, res, next) {
	  res.send({ data: basePath });
	}

	/**
	 * 得到目录下文件的信息
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	function getDirtoryFilesInfo(req, res, next) {
	  var fiename = req.params.fiename;
	  if (fiename === '<default>') {
	    fiename = basePath;
	  }

	  fileUtil.getDirFileStats(fiename, function (err, results) {
	    if (err) next(err);
	    res.json(results);
	  });
	}

	/**
	 * 得到文件内容
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	function getFileConent(req, res, next) {
	  console.log('1111');
	  fileUtil.getFileStats(req.params.fiename).then(function (stat) {
	    if (stat.directory) {
	      next(new Error('文件类型不正确'));
	    } else {
	      fileUtil.getFileContent(stat.fullname).then(function (data) {
	        return res.send({
	          name: stat.name,
	          fullname: stat.fullname,
	          ext: _path2.default.extname(stat.name),
	          content: data
	        });
	      });
	    }
	  });
	}

	function downLoadFile(req, res, next) {
	  fileUtil.getFileStats(req.params.fiename).then(function (stat) {
	    if (stat.directory) {
	      try {
	        var zip = fileUtil.zipDirectory(stat.fullname);
	        res.set('Content-Type', 'application/zip');
	        res.set('Content-Disposition', 'attachment; filename=' + stat.name + '.zip');
	        zip.pipe(res);
	      } catch (error) {
	        next(error);
	      }
	    } else {
	      res.set('Content-Type', _mime2.default.lookup(stat.fullname));
	      res.set('Content-Disposition', 'attachment; filename=' + stat.name);
	      res.sendFile(stat.fullname);
	    }
	  });
	}

	var router = new _express2.default.Router();

	// 安全检查
	router.param('fiename', checkPath);
	// router.use('/files/:fiename', checkPath);

	// replace assets
	var filesRoute = new _paramsRoute2.default();
	filesRoute.add('format=file', downLoadFile);
	filesRoute.add('children', getDirtoryFilesInfo);
	filesRoute.add('format=text', getFileConent);

	router.route('/files/:fiename').get(filesRoute.route());

	router.route('/basePath').get(getBasePath);

	exports.default = router;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.getFileStats = getFileStats;
	exports.getDirFileStats = getDirFileStats;
	exports.getFileContent = getFileContent;
	exports.zipDirectory = zipDirectory;

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	var fs = __webpack_require__(6);
	var path = __webpack_require__(5);
	var archiver = __webpack_require__(13);

	/**
	 * [getFileStats description]
	 * @param  {[type]}   file [description]
	 * @param  {Function} done [description]
	 * @return Promise        [description]
	 */
	function getFileStats(file) {
	  return new Promise(function (resolve, reject) {
	    fs.stat(file, function (err, stat) {
	      if (err) reject(err);
	      resolve(Object.assign({}, stat, {
	        name: path.basename(file),
	        fullname: file,
	        file: stat.isFile(),
	        directory: stat.isDirectory()
	      }));
	    });
	  });
	};

	function getDirFileStats(dir, done) {
	  var dirStat = getFileStats(dir).then(function (stat) {
	    return _extends({}, stat, {
	      parent: path.join(dir, '..')
	    });
	  });
	  fs.readdir(dir, function (err, list) {
	    if (err) return done(err);
	    var readStats = list.map(function (file) {
	      return new Promise(function (resolve, reject) {
	        file = path.resolve(dir, file);
	        fs.stat(file, function (err, stat) {
	          if (err) reject(err);
	          resolve(Object.assign({}, stat, {
	            name: path.basename(file),
	            fullname: file,
	            file: stat.isFile(),
	            directory: stat.isDirectory()
	          }));
	        });
	      });
	    });

	    Promise.all([dirStat].concat(readStats)).then(function (results) {
	      var _results = _toArray(results);

	      var dir = _results[0];

	      var children = _results.slice(1);

	      done(null, _extends({}, dir, { children: children }));
	    }).catch(function (err) {
	      return done(err);
	    });
	  });
	};

	function getFileContent(filename) {
	  return new Promise(function (resolve, reject) {
	    fs.readFile(filename, function (err, data) {
	      if (err) {
	        reject(err);
	      }
	      resolve(data.toString());
	    });
	  });
	}

	function zipDirectory(dir) {
	  var archive = archiver.create('zip', {});

	  archive.on('error', function (err) {
	    throw err;
	  });
	  archive.directory(dir);
	  archive.finalize();
	  return archive;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("archiver");

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var paramsRoute = function () {
	  function paramsRoute() {
	    _classCallCheck(this, paramsRoute);

	    this.handleMap = {};
	  }

	  _createClass(paramsRoute, [{
	    key: 'add',
	    value: function add(param, handle) {
	      this.handleMap[param] = handle;
	      return this;
	    }
	  }, {
	    key: 'route',
	    value: function route() {
	      var _this = this;

	      return function (req, res, next) {
	        Object.keys(_this.handleMap).map(function (key) {
	          var paramPattern = key.split('=');
	          return {
	            name: paramPattern[0],
	            value: paramPattern.length > 1 ? paramPattern[1] : null,
	            handle: _this.handleMap[key]
	          };
	        }).forEach(function (param) {
	          var isExist = param.name in req.query;
	          if (!isExist) return;

	          var value = req.query[param.name];
	          if (param.value != null && param.value !== value) return;

	          param.handle(req, res, next);
	        });
	      };
	    }
	  }]);

	  return paramsRoute;
	}();

	exports.default = paramsRoute;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("optimist");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("mime");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var errorPage = exports.errorPage = function errorPage(err, req, res, next) {
	  var softTab = '&#32;&#32;&#32;&#32;';
	  console.log(err);
	  var errTrace =  false ? ':<br><br><pre style="color:red">' + softTab + err.stack.replace(/\n/g, '<br>' + softTab) + '</pre>' : '';
	  res.status(500).send('Server Error' + errTrace);
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = reactServerRender;

	var _store = __webpack_require__(19);

	var _store2 = _interopRequireDefault(_store);

	var _reactRedux = __webpack_require__(26);

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(28);

	var _RouterContext = __webpack_require__(29);

	var _RouterContext2 = _interopRequireDefault(_RouterContext);

	var _match = __webpack_require__(30);

	var _match2 = _interopRequireDefault(_match);

	var _fetchData = __webpack_require__(31);

	var _fetchData2 = _interopRequireDefault(_fetchData);

	var _route = __webpack_require__(32);

	var _route2 = _interopRequireDefault(_route);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var store = (0, _store2.default)();
	var routes = (0, _route2.default)(store);

	// Server Side Rendering based on routes matched by React-router.
	function reactServerRender(req, res, next) {
	  console.log('server render');
	  (0, _match2.default)({ routes: routes, location: req.url }, function (err, redirectLocation, renderProps) {
	    if (err) {
	      next(err);
	    }

	    if (redirectLocation) {
	      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    }

	    if (!renderProps) {
	      return next();
	    }

	    return (0, _fetchData2.default)(store, renderProps.components, renderProps.location).then(function () {
	      var initialView = (0, _server.renderToString)(_react2.default.createElement(
	        _reactRedux.Provider,
	        { store: store },
	        _react2.default.createElement(_RouterContext2.default, renderProps)
	      ));

	      var state = store.getState();

	      res.render('manager/index', {
	        NODE_ENV: ("production"),
	        title: 'hello world!',
	        content: initialView,
	        initialState: JSON.stringify(state)
	      });
	    }).catch(function (error) {
	      return next(error);
	    });
	  });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	if (true) {
	  module.exports = __webpack_require__(20);
	} else {
	  module.exports = require('./configureStore.dev');
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;
	exports.injectAsyncReducer = injectAsyncReducer;

	var _redux = __webpack_require__(21);

	var _reduxThunk = __webpack_require__(22);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _api = __webpack_require__(23);

	var _api2 = _interopRequireDefault(_api);

	var _reducers = __webpack_require__(24);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function configureStore(initialState) {
	  var store = (0, _redux.createStore)((0, _reducers2.default)(), initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default, _api2.default));
	  store.asyncReducers = {};
	  return store;
	}

	function injectAsyncReducer(store, name, asyncReducer) {
	  store.asyncReducers[name] = asyncReducer;
	  store.replaceReducer((0, _reducers2.default)(store.asyncReducers));
	}

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = promiseMiddleware;
	function isPromise(val) {
	  return val && typeof val.then === 'function';
	}

	function fulfillPromise(promise) {

	  return promise.then(function (response) {
	    return response.json().then(function (json) {
	      return { json: json, response: response };
	    });
	  }).then(function (_ref) {
	    var json = _ref.json;
	    var response = _ref.response;

	    if (!response.ok) {
	      return Promise.reject(json);
	    }

	    return json;
	  });
	}

	var PENDING = '@@pending';

	function pendingActionType(desc) {
	  return PENDING + '/' + desc;
	}

	function checkPendingActionType(action) {
	  return action.meta && action.meta.pending !== undefined;
	}

	function promiseMiddleware(store) {
	  return function (next) {
	    return function (action) {
	      if (!isPromise(action.payload)) {
	        return next(action);
	      }

	      function actionWith(data, meta) {
	        // eslint-disable-next-line eqeqeq
	        var preMeta = action.meta != undefined ? action.meta : {};
	        if (meta) {
	          var nextMeta = Object.assign({}, preMeta, meta);
	          return Object.assign({}, action, data, { meta: nextMeta });
	        }

	        return Object.assign({}, action, data);
	      }

	      var pending = action.meta && action.meta.pending;

	      var pendingMeta = {};

	      // eslint-disable-next-line eqeqeq
	      if (pending != undefined) {
	        next(actionWith({ type: pendingActionType(pending) }, { pending: { desc: pending, status: true } }));

	        pendingMeta = { pending: { desc: pending, status: false } };
	      }

	      return fulfillPromise(action.payload).then(function (response) {
	        // if (response.code !== 200) {
	        //   return next(actionWith({ payload: response, fail: true }, pendingMeta));
	        // }

	        return next(actionWith({ payload: response }, pendingMeta));
	      }, function (error) {
	        return next(actionWith({ payload: error, error: true }, pendingMeta));
	      });
	    };
	  };
	};

	exports.checkPendingActionType = checkPendingActionType;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = createReducer;

	var _redux = __webpack_require__(21);

	var _pending = __webpack_require__(25);

	var _pending2 = _interopRequireDefault(_pending);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createReducer() {
	  var asyncReducers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  return (0, _redux.combineReducers)(_extends({
	    pending: _pending2.default
	  }, asyncReducers));
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = pending;

	var _api = __webpack_require__(23);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = {};

	function pending() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];

	  return (0, _api.checkPendingActionType)(action) ? Object.assign({}, state, _defineProperty({}, action.meta.pending.desc, action.meta.pending.status)) : state;
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("react-router/lib/RouterContext");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("react-router/lib/match");

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = fetchData;
	function fetchData(store, components, params) {
	  var needs = components.reduce(function (prev, current) {
	    return (current.need || []).concat((current.WrappedComponent && current.WrappedComponent.need !== current.need ? current.WrappedComponent.need : []) || []).concat(prev);
	  }, []);

	  return Promise.all(needs.map(function (need) {
	    return store.dispatch(need(params, store.getState()));
	  }));
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fullpath = exports.pageName = undefined;

	var _App = __webpack_require__(33);

	var _App2 = _interopRequireDefault(_App);

	var _Manage = __webpack_require__(41);

	var _Manage2 = _interopRequireDefault(_Manage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var pageName = 'root'; // html 页面输出变量
	var path = '/';
	var fullpath = '';

	var createRoute = function createRoute(store) {
	  return {
	    path: path,
	    // indexRoute: { onEnter: (nextState, replace) => replace('/gaoshou/liveroom') },
	    component: _App2.default,
	    childRoutes: [(0, _Manage2.default)(store)]
	  };
	};

	exports.default = createRoute;
	exports.pageName = pageName;
	exports.fullpath = fullpath;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(34);

	var _index2 = _interopRequireDefault(_index);

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var _MuiThemeProvider = __webpack_require__(35);

	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

	var _getMuiTheme = __webpack_require__(36);

	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

	var _theme = __webpack_require__(37);

	var _theme2 = _interopRequireDefault(_theme);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// material ui


	var App = function (_Component) {
	  _inherits(App, _Component);

	  function App(props, context) {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props, context));
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _MuiThemeProvider2.default,
	        { muiTheme: (0, _getMuiTheme2.default)(_theme2.default) },
	        _react2.default.createElement(
	          'div',
	          { className: 'App' },
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.wrapper },
	            _react2.default.createElement(
	              'div',
	              { className: 'App__main' },
	              this.props.children
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return App;
	}(_react.Component);

	App.propTypes = {
	  location: _react.PropTypes.object, // react-router 注入属性
	  children: _react.PropTypes.node
	};

	exports.default = App;

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = {
		"wrapper": "index_wrapper_1IJlf"
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/getMuiTheme");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _colors = __webpack_require__(38);

	var _colorManipulator = __webpack_require__(39);

	var _spacing = __webpack_require__(40);

	var _spacing2 = _interopRequireDefault(_spacing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var red = {
	  lighten2: '#ee6e73'
	};

	var teal = {
	  lighten1: '#26a69a'
	};

	exports.default = {
	  spacing: _spacing2.default,
	  fontFamily: 'Roboto, sans-serif',
	  palette: {
	    primary1Color: red.lighten2,
	    primary2Color: (0, _colorManipulator.darken)(red.lighten2, 0.15),
	    primary3Color: (0, _colorManipulator.lighten)(red.lighten2, 0.15),
	    accent1Color: teal.lighten1,
	    accent2Color: _colors.grey100,
	    accent3Color: _colors.grey500,
	    textColor: _colors.darkBlack,
	    secondaryTextColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.54),
	    alternateTextColor: _colors.white,
	    canvasColor: _colors.white,
	    borderColor: _colors.grey300,
	    disabledColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.3),
	    pickerHeaderColor: red.lighten2,
	    clockCircleColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.07),
	    shadowColor: _colors.fullBlack
	  },
	  userAgent: false
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/colors");

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("material-ui/utils/colorManipulator");

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/spacing");

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fullpath = exports.pageName = undefined;

	var _Files = __webpack_require__(42);

	var _Files2 = _interopRequireDefault(_Files);

	var _Edit = __webpack_require__(62);

	var _Edit2 = _interopRequireDefault(_Edit);

	var _route = __webpack_require__(32);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var pageName = 'manage';
	var path = 'manage';
	var fullpath = _route.fullpath + '/manage';

	var createRoute = function createRoute(store) {
	  return {
	    path: path,
	    getComponent: function getComponent(nextState, cb) {
	      if (true) {
	        cb(null, __webpack_require__(74).default);
	      } else {
	        require.ensure([], function (require) {
	          //const reducers = require('./reducers').default;
	          // injectAsyncReducer(store, pageName, reducers);
	          cb(null, require('./views/Manage').default);
	        }, 'manage');
	      }
	    },

	    childRoutes: [(0, _Files2.default)(store), (0, _Edit2.default)(store)]
	  };
	};

	exports.default = createRoute;
	exports.pageName = pageName;
	exports.fullpath = fullpath;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fullpath = exports.pageName = undefined;

	var _store = __webpack_require__(19);

	var _index = __webpack_require__(41);

	var pageName = 'files';
	var path = 'files';
	var fullpath = _index.fullpath + '/files';

	var createRoute = function createRoute(store) {
	  return {
	    path: path,
	    getComponent: function getComponent(nextState, cb) {
	      var reducers = __webpack_require__(43).default;
	      (0, _store.injectAsyncReducer)(store, pageName, reducers);

	      if (true) {
	        cb(null, __webpack_require__(47).default);
	      } else {
	        require.ensure([], function (require) {
	          cb(null, require('./views/FileListView').default);
	        }, 'manage/files');
	      }
	    }
	  };
	};

	exports.default = createRoute;
	exports.pageName = pageName;
	exports.fullpath = fullpath;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(21);

	var _files = __webpack_require__(44);

	var _files2 = _interopRequireDefault(_files);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	  files: _files2.default
	});

	exports.default = rootReducer;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createReducer;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.getCurDirInfo = getCurDirInfo;
	exports.getBasePath = getBasePath;

	var _FileActionTypes = __webpack_require__(45);

	var _createReducer2 = __webpack_require__(46);

	var _createReducer3 = _interopRequireDefault(_createReducer2);

	var _index = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = {
	  basePath: undefined,
	  curDir: {
	    children: []
	  }
	};

	exports.default = (0, _createReducer3.default)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _FileActionTypes.FETCH_FILES, function (state, action) {
	  return _extends({}, state, {
	    curDir: action.payload
	  });
	}), _defineProperty(_createReducer, _FileActionTypes.FETCH_BASE_PATH, function (state, action) {
	  return _extends({}, state, {
	    basePath: action.payload.data
	  });
	}), _createReducer));
	function getCurDirInfo(state) {
	  return state[_index.pageName].files.curDir;
	}

	function getBasePath(state) {
	  return state[_index.pageName].files.basePath;
	}

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var FETCH_FILES = exports.FETCH_FILES = 'FETCH_FILES';
	var FETCH_BASE_PATH = exports.FETCH_BASE_PATH = 'FETCH_BASE_PATH';

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createReducer;
	function createReducer(initialState, handlers) {
	  return function reducer() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	    var action = arguments[1];

	    if (handlers.hasOwnProperty(action.type)) {
	      if (action.error) {
	        if (false) {
	          console.log('action error:', action);
	        }
	        return state.error = action.payload;
	      }
	      if (action.fail) {
	        if (false) {
	          console.log('action fail:', action);
	        }
	        return state.fail = action.payload;
	      }
	      return handlers[action.type](state, action);
	    }
	    return state;
	  };
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(48);

	var _index2 = _interopRequireDefault(_index);

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(21);

	var _reactRedux = __webpack_require__(26);

	var _fetch = __webpack_require__(49);

	var _fetch2 = _interopRequireDefault(_fetch);

	var _files = __webpack_require__(52);

	var _files2 = __webpack_require__(44);

	var _FileListItem = __webpack_require__(54);

	var _FileListItem2 = _interopRequireDefault(_FileListItem);

	var _List = __webpack_require__(59);

	var _IconButton = __webpack_require__(55);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _moreVert = __webpack_require__(56);

	var _moreVert2 = _interopRequireDefault(_moreVert);

	var _IconMenu = __webpack_require__(57);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(58);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _colors = __webpack_require__(38);

	var _url = __webpack_require__(51);

	var _history = __webpack_require__(60);

	var _history2 = _interopRequireDefault(_history);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var iconButtonElement = _react2.default.createElement(
	  _IconButton2.default,
	  {
	    tooltipPosition: 'bottom-left'
	  },
	  _react2.default.createElement(_moreVert2.default, { color: _colors.grey400 })
	);

	var rightIconMenu = function rightIconMenu(props) {
	  return _react2.default.createElement(
	    _IconMenu2.default,
	    { iconButtonElement: iconButtonElement },
	    _react2.default.createElement(
	      _MenuItem2.default,
	      { onTouchTap: props.onDownload },
	      '下载'
	    ),
	    _react2.default.createElement(
	      _MenuItem2.default,
	      null,
	      '删除'
	    )
	  );
	};

	var SelectedList = (0, _List.MakeSelectable)(_List.List);
	var parentFolder = _react2.default.createElement(_List.ListItem, {
	  value: -1,
	  key: '..',
	  primaryText: _react2.default.createElement(
	    'p',
	    null,
	    '..'
	  ),
	  secondaryText: _react2.default.createElement(
	    'p',
	    null,
	    '上一层'
	  )
	});

	var FileListView = function (_Component) {
	  _inherits(FileListView, _Component);

	  function FileListView(props, context) {
	    _classCallCheck(this, FileListView);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FileListView).call(this, props, context));

	    _this.downloadFile = function (file) {
	      return function () {
	        _this.setState({
	          downloadFileAddress: (0, _url.join)('files/' + encodeURIComponent(file.fullname) + '?format=file')
	        });
	      };
	    };

	    _this.selectFile = function (event, index) {
	      if (index === -1) {
	        _history2.default.push('/manage/files?filename=' + _this.props.parent);
	        return;
	      }
	      var file = _this.props.files[index];
	      if (file.file) {
	        _history2.default.push('/manage/edit?filename=' + file.fullname);
	      } else if (file.directory) {
	        _history2.default.push('/manage/files?filename=' + file.fullname);
	      }
	    };

	    _this.state = {
	      downloadFileAddress: null
	    };
	    return _this;
	  }

	  _createClass(FileListView, [{
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      var _this2 = this;

	      FileListView.need.forEach(function (need) {
	        return _this2.props.dispatch(need(_this2.props.location));
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var _props = this.props;
	      var files = _props.files;
	      var isRoot = _props.isRoot;


	      var fileItems = files.map(function (file, index) {
	        return _react2.default.createElement(_List.ListItem, {
	          value: index,
	          key: file.fullname,
	          rightIconButton: rightIconMenu({
	            onDownload: _this3.downloadFile(file)
	          }),
	          primaryText: _react2.default.createElement(
	            'p',
	            null,
	            file.name
	          ),
	          secondaryText: _react2.default.createElement(
	            'p',
	            null,
	            file.fullname
	          )
	        });
	      });

	      if (!isRoot) {
	        fileItems.unshift(parentFolder);
	      }

	      var downloadFileAddress = this.state.downloadFileAddress;
	      return _react2.default.createElement(
	        'div',
	        { className: 'FileListView' },
	        _react2.default.createElement(
	          SelectedList,
	          { onChange: this.selectFile },
	          fileItems
	        ),
	        downloadFileAddress && _react2.default.createElement('iframe', { src: downloadFileAddress, style: { display: 'none' } })
	      );
	    }
	  }]);

	  return FileListView;
	}(_react.Component);

	FileListView.propTypes = {
	  location: _react.PropTypes.object, // react-router 注入属性
	  children: _react.PropTypes.node
	};

	FileListView.need = [ssrGetBasePath, ssrGetFiles];

	function ssrGetFiles(location) {
	  var filename = location.query.filename;

	  if (filename === undefined) {
	    return (0, _files.fetchDirFiles)('<default>');
	  }
	  return (0, _files.fetchDirFiles)(filename);
	}

	function ssrGetBasePath(location) {
	  return (0, _files.fetchBasePath)();
	}

	function mapStateToProps(state) {
	  var dir = (0, _files2.getCurDirInfo)(state);
	  return {
	    isRoot: (0, _files2.getBasePath)(state) === dir.fullname,
	    files: dir.children,
	    parent: dir.parent
	  };
	}

	function mapDispatchToProps(dispatch) {
	  return {
	    dispatch: dispatch,
	    actions: (0, _redux.bindActionCreators)({ fetchDirFiles: _files.fetchDirFiles }, dispatch)
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FileListView);

/***/ },
/* 48 */
/***/ function(module, exports) {

	

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.params = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	__webpack_require__(50);

	var _url = __webpack_require__(51);

	var baseurl = (0, _url.getBase)();

	var headers = new Headers({
	  'Content-Type': 'application/x-www-form-urlencoded'
	});

	var defaultOption = {
	  headers: headers,
	  credentials: 'include'
	};

	function _fetch(url, option) {
	  var _option = _extends({}, defaultOption, option);
	  var fullurl = url.indexOf('http://') === 0 ? url : baseurl + '/' + url;
	  return fetch(fullurl, _option);
	}

	function params(obj) {
	  return Object.keys(obj).filter(function (key) {
	    return obj[key];
	  }).map(function (key) {
	    return key + '=' + encodeURIComponent(obj[key]);
	  }).join('&');
	}

	exports.default = _fetch;
	exports.params = params;

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getBase = getBase;
	exports.join = join;

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getBase() {
	  var baseurl = void 0;

	  if (true) {
	    baseurl = 'http://192.168.50.195:' + _config2.default.port + '/api';
	  } else {
	    // baseurl = 'http://api.y.dev.lanyi99.cn/v1';

	    baseurl = 'http://localhost:' + _config2.default.devPort + '/api';
	  }
	  return baseurl;
	}

	function join(url) {
	  return getBase() + '/' + url;
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchBasePath = exports.fetchDirFiles = undefined;

	var _FileActionTypes = __webpack_require__(45);

	var _createAction = __webpack_require__(53);

	var _createAction2 = _interopRequireDefault(_createAction);

	var _fetch = __webpack_require__(49);

	var _fetch2 = _interopRequireDefault(_fetch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var fetchDirFiles = exports.fetchDirFiles = (0, _createAction2.default)(_FileActionTypes.FETCH_FILES, function (filename) {
	  return (0, _fetch2.default)('files/' + encodeURIComponent(filename) + '?children');
	});

	var fetchBasePath = exports.fetchBasePath = (0, _createAction2.default)(_FileActionTypes.FETCH_BASE_PATH, function (file) {
	  return (0, _fetch2.default)('basePath');
	});

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.unFlat = unFlat;
	exports.default = createAction;
	function unFlat() {
	  for (var _len = arguments.length, argNames = Array(_len), _key = 0; _key < _len; _key++) {
	    argNames[_key] = arguments[_key];
	  }

	  return function () {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    var action = {};
	    argNames.forEach(function (arg, index) {
	      action[argNames[index]] = args[index];
	    });
	    return action;
	  };
	}

	function createAction(type) {
	  var payloadCreator = arguments.length <= 1 || arguments[1] === undefined ? function (a) {
	    return a;
	  } : arguments[1];
	  var metaCreator = arguments[2];

	  return function () {
	    var action = {
	      type: type,
	      payload: payloadCreator.apply(undefined, arguments)
	    };
	    if (typeof metaCreator === 'function') {
	      action.meta = metaCreator.apply(undefined, arguments);
	    }
	    return action;
	  };
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var _IconButton = __webpack_require__(55);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _moreVert = __webpack_require__(56);

	var _moreVert2 = _interopRequireDefault(_moreVert);

	var _IconMenu = __webpack_require__(57);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(58);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _List = __webpack_require__(59);

	var _colors = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var iconButtonElement = _react2.default.createElement(
	  _IconButton2.default,
	  {
	    tooltipPosition: 'bottom-left'
	  },
	  _react2.default.createElement(_moreVert2.default, { color: _colors.grey400 })
	);

	var rightIconMenu = _react2.default.createElement(
	  _IconMenu2.default,
	  { iconButtonElement: iconButtonElement },
	  _react2.default.createElement(
	    _MenuItem2.default,
	    null,
	    '删除'
	  )
	);

	var FileListItem = function (_PureComponent) {
	  _inherits(FileListItem, _PureComponent);

	  function FileListItem(props, context) {
	    _classCallCheck(this, FileListItem);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(FileListItem).call(this, props, context));
	  }

	  _createClass(FileListItem, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var name = _props.name;
	      var fullname = _props.fullname;


	      return _react2.default.createElement(_List.ListItem, {
	        rightIconButton: rightIconMenu,
	        primaryText: _react2.default.createElement(
	          'p',
	          null,
	          name
	        ),
	        secondaryText: _react2.default.createElement(
	          'p',
	          null,
	          fullname
	        )
	      });
	    }
	  }]);

	  return FileListItem;
	}(_react.PureComponent);

	FileListItem.propTypes = {
	  name: _react.PropTypes.string,
	  fullPath: _react.PropTypes.string
	};

	FileListItem.defaultProps = {};

	exports.default = FileListItem;

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = require("material-ui/IconButton");

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/navigation/more-vert");

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = require("material-ui/IconMenu");

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = require("material-ui/MenuItem");

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = require("material-ui/List");

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	if (false) {
	  module.exports = require('react-router/lib/browserHistory');
	} else {
	  module.exports = __webpack_require__(61);
	}

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = require("react-router/lib/hashHistory");

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fullpath = exports.pageName = undefined;

	var _store = __webpack_require__(19);

	var _index = __webpack_require__(41);

	var pageName = 'edit';
	var path = 'edit';
	var fullpath = _index.fullpath + '/edit';

	var createRoute = function createRoute(store) {
	  return {
	    path: path,
	    getComponent: function getComponent(nextState, cb) {
	      var reducers = __webpack_require__(63).default;
	      (0, _store.injectAsyncReducer)(store, pageName, reducers);

	      if (true) {
	        cb(null, __webpack_require__(66).default);
	      } else {
	        require.ensure([], function (require) {
	          cb(null, require('./views/FileEditor').default);
	        }, 'manage/edit');
	      }
	    }
	  };
	};

	exports.default = createRoute;
	exports.pageName = pageName;
	exports.fullpath = fullpath;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(21);

	var _file = __webpack_require__(64);

	var _file2 = _interopRequireDefault(_file);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	  file: _file2.default
	});

	exports.default = rootReducer;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getFileContent = getFileContent;

	var _FileActionTypes = __webpack_require__(65);

	var _createReducer2 = __webpack_require__(46);

	var _createReducer3 = _interopRequireDefault(_createReducer2);

	var _index = __webpack_require__(62);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = {
	  ext: undefined,
	  content: ''
	};

	exports.default = (0, _createReducer3.default)(initialState, _defineProperty({}, _FileActionTypes.FETCH_FILE_CONTENT, function (state, action) {
	  console.log('FETCH_FILE_CONTENT');
	  return {
	    ext: action.payload.ext,
	    content: action.payload.content
	  };
	}));
	function getFileContent(state) {
	  return state[_index.pageName].file;
	}

/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var FETCH_FILE_CONTENT = exports.FETCH_FILE_CONTENT = 'FETCH_FILE_CONTENT';

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(21);

	var _reactRedux = __webpack_require__(26);

	var _file = __webpack_require__(67);

	var _file2 = __webpack_require__(64);

	var _brace = __webpack_require__(68);

	var _brace2 = _interopRequireDefault(_brace);

	var _reactAce = __webpack_require__(69);

	var _reactAce2 = _interopRequireDefault(_reactAce);

	__webpack_require__(70);

	__webpack_require__(71);

	__webpack_require__(72);

	__webpack_require__(73);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function getMode(ext) {
	  switch (ext) {
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

	var FileEditor = function (_Component) {
	  _inherits(FileEditor, _Component);

	  function FileEditor(props, context) {
	    _classCallCheck(this, FileEditor);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(FileEditor).call(this, props, context));
	  }

	  _createClass(FileEditor, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      FileEditor.need.forEach(function (need) {
	        return _this2.props.dispatch(need(_this2.props.location));
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'FileEditor' },
	        _react2.default.createElement(_reactAce2.default, {
	          name: 'Editor',
	          mode: getMode(this.props.ext),
	          theme: 'github',
	          value: this.props.content,
	          width: '100%',
	          height: 'calc(100vh - 64px)',
	          fontSize: 16,
	          tabSize: 2
	          // onChange={onChange}
	          , editorProps: { $blockScrolling: true }
	        })
	      );
	    }
	  }]);

	  return FileEditor;
	}(_react.Component);

	FileEditor.propTypes = {};

	FileEditor.defaultProps = {};

	FileEditor.need = [ssrGetFileContent];

	function ssrGetFileContent(location) {
	  var fileName = location.query.filename;
	  return (0, _file.fetchFileContent)(fileName);
	}

	function mapStateToProps(state) {
	  var file = (0, _file2.getFileContent)(state);
	  return {
	    ext: file.ext,
	    content: file.content
	  };
	}

	function mapDispatchToProps(dispatch) {
	  return {
	    dispatch: dispatch,
	    actions: (0, _redux.bindActionCreators)({ fetchFileContent: _file.fetchFileContent }, dispatch)
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FileEditor);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchFileContent = undefined;

	var _FileActionTypes = __webpack_require__(65);

	var _createAction = __webpack_require__(53);

	var _createAction2 = _interopRequireDefault(_createAction);

	var _fetch = __webpack_require__(49);

	var _fetch2 = _interopRequireDefault(_fetch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var fetchFileContent = exports.fetchFileContent = (0, _createAction2.default)(_FileActionTypes.FETCH_FILE_CONTENT, function (filename) {
	  return (0, _fetch2.default)('files/' + encodeURIComponent(filename) + '?format=text');
	});

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = require("brace");

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = require("react-ace");

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = require("brace/mode/javascript");

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = require("brace/mode/html");

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = require("brace/mode/css");

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = require("brace/theme/github");

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(75);

	var _index2 = _interopRequireDefault(_index);

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var _AppBar = __webpack_require__(76);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _Drawer = __webpack_require__(77);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _MenuItem = __webpack_require__(58);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _FloatingActionButton = __webpack_require__(78);

	var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

	var _add = __webpack_require__(79);

	var _add2 = _interopRequireDefault(_add);

	var _colors = __webpack_require__(38);

	var _Link = __webpack_require__(80);

	var _Link2 = _interopRequireDefault(_Link);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Manage = function (_Component) {
	  _inherits(Manage, _Component);

	  function Manage(props, context) {
	    _classCallCheck(this, Manage);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Manage).call(this, props, context));

	    _this.handleToggle = function () {
	      return _this.setState({ open: !_this.state.open });
	    };

	    _this.handleClose = function () {
	      return _this.setState({ open: false });
	    };

	    _this.state = {
	      open: false
	    };
	    return _this;
	  }

	  _createClass(Manage, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        { className: 'Manage' },
	        _react2.default.createElement(_AppBar2.default, {
	          title: 'Cloud File',
	          onLeftIconButtonTouchTap: this.handleToggle
	        }),
	        _react2.default.createElement(
	          _Drawer2.default,
	          {
	            docked: false,
	            width: 256,
	            open: this.state.open,
	            onRequestChange: function onRequestChange(open) {
	              return _this2.setState({ open: open });
	            }
	          },
	          _react2.default.createElement(
	            _MenuItem2.default,
	            { onTouchTap: this.handleClose },
	            'Menu Item'
	          ),
	          _react2.default.createElement(
	            _MenuItem2.default,
	            { onTouchTap: this.handleClose },
	            'Menu Item 2'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'Manage__main' },
	          this.props.children
	        ),
	        _react2.default.createElement(
	          _FloatingActionButton2.default,
	          {
	            style: {
	              background: _colors.red500,
	              position: 'fixed',
	              bottom: 23,
	              right: 23
	            }
	          },
	          _react2.default.createElement(_add2.default, null)
	        )
	      );
	    }
	  }]);

	  return Manage;
	}(_react.Component);

	Manage.propTypes = {
	  location: _react.PropTypes.object, // react-router 注入属性
	  children: _react.PropTypes.node
	};

	exports.default = Manage;

/***/ },
/* 75 */
/***/ function(module, exports) {

	

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = require("material-ui/AppBar");

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = require("material-ui/Drawer");

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = require("material-ui/FloatingActionButton");

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/content/add");

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = require("react-router/lib/Link");

/***/ }
/******/ ]);