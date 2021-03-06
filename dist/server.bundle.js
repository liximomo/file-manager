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

	var _errors = __webpack_require__(19);

	var _reactServerRender = __webpack_require__(20);

	var _reactServerRender2 = _interopRequireDefault(_reactServerRender);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Initialize the Express App
	var app = new _express2.default();
	app.set('views', _path2.default.resolve(_config2.default.projectPath, './views'));
	app.set('view engine', 'pug');

	function apiErrorHandler(err, req, res, next) {
	  var error = {
	    trace: err.stack,
	    error: true,
	    message: err.message
	  };
	  return res.send(error);
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
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(app, 'app', '/Users/mymomo/workspace/yunying/server/index.js');

	  __REACT_HOT_LOADER__.register(apiErrorHandler, 'apiErrorHandler', '/Users/mymomo/workspace/yunying/server/index.js');
	})();

	;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	global.document = __webpack_require__(3).jsdom('<body></body>');
	global.window = document.defaultView;
	global.navigator = window.navigator;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	})();

	;

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
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(projectPath, 'projectPath', '/Users/mymomo/workspace/yunying/configs/config.js');

	  __REACT_HOT_LOADER__.register(config, 'config', '/Users/mymomo/workspace/yunying/configs/config.js');
	})();

	;
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

	var _default = config;
	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(config, 'config', '/Users/mymomo/workspace/yunying/server/config.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/server/config.js');
	})();

	;

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

	var _default = router;
	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(replaceAssets, 'replaceAssets', '/Users/mymomo/workspace/yunying/server/controllers/assets/index.js');

	  __REACT_HOT_LOADER__.register(router, 'router', '/Users/mymomo/workspace/yunying/server/controllers/assets/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/server/controllers/assets/index.js');
	})();

	;

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

	var _util = __webpack_require__(12);

	var _util2 = _interopRequireDefault(_util);

	var _file = __webpack_require__(13);

	var fileUtil = _interopRequireWildcard(_file);

	var _paramsRoute = __webpack_require__(15);

	var _paramsRoute2 = _interopRequireDefault(_paramsRoute);

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	var _optimist = __webpack_require__(16);

	var _mime = __webpack_require__(17);

	var _mime2 = _interopRequireDefault(_mime);

	var _path = __webpack_require__(5);

	var _path2 = _interopRequireDefault(_path);

	var _bodyParser = __webpack_require__(18);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _formidable = __webpack_require__(10);

	var _formidable2 = _interopRequireDefault(_formidable);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var basePath = _optimist.argv.basePath !== undefined ? _optimist.argv.basePath : _config2.default.basePath;
	function checkParamsPath(req, res, next, filename) {
	  if (filename.indexOf(basePath) === 0 || filename === '<default>') {
	    next();
	  } else {
	    res.status(403).send({
	      error: true,
	      message: '403'
	    });
	  }
	}

	function checkQueryPath(req, res, next) {
	  var filenames = [req.query, req.body].map(function (body) {
	    return body ? body.filename : undefined;
	  }).filter(function (param) {
	    return param !== undefined;
	  });
	  var violates = [];
	  violates = filenames.filter(function (filename) {
	    return filename !== undefined && !(filename.indexOf(basePath) === 0 || filename === '<default>');
	  });

	  if (violates.length) {
	    // 检查不通过
	    res.status(403).send({
	      error: true,
	      message: '403'
	    });
	  } else {
	    next();
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
	  var filename = req.params.filename;
	  if (filename === '<default>') {
	    filename = basePath;
	  }

	  fileUtil.getDirFileStats(filename, function (err, results) {
	    if (err) next(err);
	    res.json(results);
	  });
	}

	/**
	 * 新建文件夹
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	function newFolder(req, res) {
	  var directoryPath = _path2.default.join(req.params.filename, req.query.name);
	  fileUtil.createFolder(directoryPath).then(function () {
	    return fileUtil.getFileStats(directoryPath);
	  }).then(function (stat) {
	    return res.send(stat);
	  }).catch(function (err) {
	    return next(err);
	  });
	}

	/**
	 * 得到文件内容
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	function getFileConent(req, res, next) {
	  fileUtil.getFileStats(req.params.filename).then(function (stat) {
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
	  }).catch(function (err) {
	    return next(err);
	  });
	}

	function saveFile(req, res, next) {
	  var filename = req.params.filename;
	  fileUtil.isFileExist(filename).then(function (isExist) {
	    if (!isExist) {
	      next(new Error('文件不存在！'));
	      return;
	    }

	    fileUtil.saveFile(filename, req.body.content).then(function () {
	      return res.send({ code: 200 });
	    }).catch(function (err) {
	      return next(err);
	    });
	  });
	}

	function newFile(req, res, next) {
	  var filename = req.params.filename;
	  fileUtil.isFileExist(filename).then(function (isExist) {
	    if (isExist) {
	      next(new Error('文件已存在！'));
	      return;
	    }

	    fileUtil.saveFile(filename, req.body.content).then(function () {
	      return res.send({ code: 200 });
	    }).catch(function (err) {
	      return next(err);
	    });
	  });
	}

	/**
	 * 重命名文件
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	function renameFile(req, res, next) {
	  var oriPath = req.params.filename;
	  var newName = req.query.name;
	  var directory = _path2.default.dirname(oriPath);
	  var destPath = _path2.default.join(directory, newName);
	  fileUtil.rename(oriPath, destPath).then(function () {
	    return res.send({
	      name: newName,
	      fullname: destPath
	    });
	  }).catch(function (err) {
	    return next(err);
	  });
	}

	function uploadFile(req, res, next) {
	  var basePath = req.params.filename;

	  var form = new _formidable2.default.IncomingForm();

	  form.parse(req, function (err, fields, files) {
	    var file = files.file;
	    if (!file) {
	      return next(new Error('缺少参数!'));
	    }
	    fileUtil.rename(file.path, _path2.default.join(basePath, file.name)).then(function (filePath) {
	      return fileUtil.getFileStats(filePath);
	    }).then(function (stat) {
	      return res.send(stat);
	    }).catch(function (err) {
	      return next(err);
	    });
	  });
	}

	function downLoadFile(req, res, next) {
	  fileUtil.getFileStats(req.params.filename).then(function (stat) {
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
	router.param('filename', checkParamsPath);
	// 安全检查
	router.use(checkQueryPath);

	// router.use('/files/:filename', checkPath);

	// router.use(bodyParser.urlencoded({ extended: false }));

	// parse application/json
	router.use(_bodyParser2.default.json());

	// replace assets
	var filesRoute = new _paramsRoute2.default();
	filesRoute.add('format=file', downLoadFile);
	filesRoute.add('children', getDirtoryFilesInfo);
	filesRoute.add('format=text', getFileConent);

	router.route('/files/:filename').get(filesRoute.route()).put(saveFile).post(newFile);

	router.route('/files/:filename/directory').post(newFolder);

	router.route('/files/:filename/upload').post(uploadFile);

	router.route('/files/:filename/rename').post(renameFile);

	router.route('/basePath').get(getBasePath);

	var _default = router;
	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(basePath, 'basePath', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(checkParamsPath, 'checkParamsPath', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(checkQueryPath, 'checkQueryPath', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(getBasePath, 'getBasePath', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(getDirtoryFilesInfo, 'getDirtoryFilesInfo', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(newFolder, 'newFolder', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(getFileConent, 'getFileConent', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(saveFile, 'saveFile', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(newFile, 'newFile', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(renameFile, 'renameFile', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(uploadFile, 'uploadFile', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(downLoadFile, 'downLoadFile', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(router, 'router', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(filesRoute, 'filesRoute', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/server/controllers/file/index.js');
	})();

	;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.isFileExist = isFileExist;
	exports.isFolderExist = isFolderExist;
	exports.getFileStats = getFileStats;
	exports.getDirFileStats = getDirFileStats;
	exports.createFolder = createFolder;
	exports.getFileContent = getFileContent;
	exports.saveFile = saveFile;
	exports.rename = rename;
	exports.zipDirectory = zipDirectory;

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	var fs = __webpack_require__(6);
	var path = __webpack_require__(5);
	var archiver = __webpack_require__(14);

	/**
	 * 检测是否存在并且是 file
	 * @param  {[type]} filename [description]
	 * @return {[type]}          [description]
	 */
	function isFileExist(filename) {
	  return new Promise(function (resolve, reject) {
	    fs.stat(filename, function (err, stat) {
	      if (err || !stat.isFile()) resolve(false);
	      resolve(true);
	    });
	  });
	}

	/**
	 * 检测是否存在并且是 folder
	 * @param  {[type]} filename [description]
	 * @return {[type]}          [description]
	 */
	function isFolderExist(filename) {
	  return new Promise(function (resolve, reject) {
	    fs.stat(filename, function (err, stat) {
	      if (err || !stat.isDirectory()) resolve(false);
	      resolve(true);
	    });
	  });
	}

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

	function createFolder(filename, content) {
	  return isFolderExist(filename).then(function (isExist) {
	    if (isExist) {
	      throw new Error('文件夹已存在！');
	    }

	    return new Promise(function (resolve, reject) {
	      fs.mkdir(filename, function (err) {
	        console.log('createFolder', err);
	        if (err) {
	          reject(err);
	        }
	        resolve(true);
	      });
	    });
	  });
	}

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

	function saveFile(filename, content) {
	  return new Promise(function (resolve, reject) {
	    fs.writeFile(filename, content, 'utf-8', function (err) {
	      if (err) {
	        reject(err);
	      }
	      resolve(true);
	    });
	  });
	}

	function rename(oldPath, newPath) {
	  return new Promise(function (resolve, reject) {
	    fs.rename(oldPath, newPath, function (err) {
	      if (err) {
	        reject(err);
	      }
	      resolve(newPath);
	    });
	  });
	}

	function zipDirectory(dir) {
	  var archive = archiver.create('zip', {});

	  archive.on('error', function (err) {
	    throw err;
	  });
	  archive.directory(dir, '');
	  archive.finalize();
	  return archive;
	};
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(isFileExist, 'isFileExist', '/Users/mymomo/workspace/yunying/server/services/file.js');

	  __REACT_HOT_LOADER__.register(isFolderExist, 'isFolderExist', '/Users/mymomo/workspace/yunying/server/services/file.js');

	  __REACT_HOT_LOADER__.register(getFileStats, 'getFileStats', '/Users/mymomo/workspace/yunying/server/services/file.js');

	  __REACT_HOT_LOADER__.register(getDirFileStats, 'getDirFileStats', '/Users/mymomo/workspace/yunying/server/services/file.js');

	  __REACT_HOT_LOADER__.register(createFolder, 'createFolder', '/Users/mymomo/workspace/yunying/server/services/file.js');

	  __REACT_HOT_LOADER__.register(getFileContent, 'getFileContent', '/Users/mymomo/workspace/yunying/server/services/file.js');

	  __REACT_HOT_LOADER__.register(saveFile, 'saveFile', '/Users/mymomo/workspace/yunying/server/services/file.js');

	  __REACT_HOT_LOADER__.register(rename, 'rename', '/Users/mymomo/workspace/yunying/server/services/file.js');

	  __REACT_HOT_LOADER__.register(zipDirectory, 'zipDirectory', '/Users/mymomo/workspace/yunying/server/services/file.js');
	})();

	;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("archiver");

/***/ },
/* 15 */
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
	        var handle = false;
	        Object.keys(_this.handleMap).map(function (key) {
	          var params = key.split('&').map(function (query) {
	            var paramPattern = key.split('=');
	            return {
	              name: paramPattern[0],
	              value: paramPattern.length > 1 ? paramPattern[1] : null
	            };
	          });
	          return {
	            params: params,
	            handle: _this.handleMap[key]
	          };
	        }).forEach(function (pattern) {
	          var noMatch = pattern.params.some(function (param) {
	            var isExist = param.name in req.query;
	            var value = req.query[param.name];
	            var notEqual = param.value != null && param.value !== value;
	            return !isExist || notEqual;
	          });

	          if (noMatch) return;
	          handle = true;
	          pattern.handle(req, res, next);
	        });

	        if (!handle) next();
	      };
	    }
	  }]);

	  return paramsRoute;
	}();

	var _default = paramsRoute;
	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(paramsRoute, 'paramsRoute', '/Users/mymomo/workspace/yunying/server/util/paramsRoute.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/server/util/paramsRoute.js');
	})();

	;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("optimist");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("mime");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var errorPage = exports.errorPage = function errorPage(err, req, res, next) {
	  var softTab = '&#32;&#32;&#32;&#32;';
	  console.log(err);
	  var errTrace =  true ? ':<br><br><pre style="color:red">' + softTab + err.stack.replace(/\n/g, '<br>' + softTab) + '</pre>' : '';
	  res.status(500).send('Server Error' + errTrace);
	};
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(errorPage, 'errorPage', '/Users/mymomo/workspace/yunying/server/controllers/errors/index.js');
	})();

	;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = reactServerRender;

	var _store = __webpack_require__(21);

	var _store2 = _interopRequireDefault(_store);

	var _reactRedux = __webpack_require__(37);

	var _react = __webpack_require__(38);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(39);

	var _RouterContext = __webpack_require__(40);

	var _RouterContext2 = _interopRequireDefault(_RouterContext);

	var _match = __webpack_require__(41);

	var _match2 = _interopRequireDefault(_match);

	var _fetchData = __webpack_require__(42);

	var _fetchData2 = _interopRequireDefault(_fetchData);

	var _route = __webpack_require__(43);

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
	        NODE_ENV: ("development"),
	        title: 'hello world!',
	        content: initialView,
	        initialState: JSON.stringify(state)
	      });
	    }).catch(function (error) {
	      return next(error);
	    });
	  });
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(store, 'store', '/Users/mymomo/workspace/yunying/server/reactServerRender.js');

	  __REACT_HOT_LOADER__.register(routes, 'routes', '/Users/mymomo/workspace/yunying/server/reactServerRender.js');

	  __REACT_HOT_LOADER__.register(reactServerRender, 'reactServerRender', '/Users/mymomo/workspace/yunying/server/reactServerRender.js');
	})();

	;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	if (false) {
	  module.exports = require('./configureStore.prod');
	} else {
	  module.exports = __webpack_require__(22);
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	})();

	;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;
	exports.injectAsyncReducer = injectAsyncReducer;

	var _redux = __webpack_require__(23);

	var _reduxThunk = __webpack_require__(24);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _api = __webpack_require__(25);

	var _api2 = _interopRequireDefault(_api);

	var _history = __webpack_require__(26);

	var _history2 = _interopRequireDefault(_history);

	var _reducers = __webpack_require__(28);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var enhancers = [(0, _redux.applyMiddleware)(_reduxThunk2.default, _api2.default)];

	if (false) {
	  enhancers.push(window.devToolsExtension ? window.devToolsExtension() : function (noop) {
	    return noop;
	  });
	}

	function configureStore(initialState) {
	  var store = (0, _redux.createStore)((0, _reducers2.default)(), initialState, _redux.compose.apply(undefined, enhancers));
	  store.asyncReducers = {};
	  if (false) {
	    // Enable Webpack hot module replacement for reducers
	    module.hot.accept('../reducers', function () {
	      var nextReducer = require('../reducers').default;
	      store.replaceReducer(nextReducer);
	    });
	  }

	  return store;
	}

	function injectAsyncReducer(store, name, asyncReducer) {
	  store.asyncReducers[name] = asyncReducer;
	  store.replaceReducer((0, _reducers2.default)(store.asyncReducers));
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(enhancers, 'enhancers', '/Users/mymomo/workspace/yunying/client/store/configureStore.dev.js');

	  __REACT_HOT_LOADER__.register(configureStore, 'configureStore', '/Users/mymomo/workspace/yunying/client/store/configureStore.dev.js');

	  __REACT_HOT_LOADER__.register(injectAsyncReducer, 'injectAsyncReducer', '/Users/mymomo/workspace/yunying/client/store/configureStore.dev.js');
	})();

	;

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 25 */
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
	        return Promise.resolve(next(action));
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
	        if (response.error) {
	          return next(actionWith({ payload: response, error: true }, pendingMeta));
	        }

	        return next(actionWith({ payload: response }, pendingMeta));
	      }, function (error) {
	        return next(actionWith({ payload: error, fatalError: true }, pendingMeta));
	      });
	    };
	  };
	};

	exports.checkPendingActionType = checkPendingActionType;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(isPromise, 'isPromise', '/Users/mymomo/workspace/yunying/client/middleware/api.js');

	  __REACT_HOT_LOADER__.register(fulfillPromise, 'fulfillPromise', '/Users/mymomo/workspace/yunying/client/middleware/api.js');

	  __REACT_HOT_LOADER__.register(PENDING, 'PENDING', '/Users/mymomo/workspace/yunying/client/middleware/api.js');

	  __REACT_HOT_LOADER__.register(pendingActionType, 'pendingActionType', '/Users/mymomo/workspace/yunying/client/middleware/api.js');

	  __REACT_HOT_LOADER__.register(checkPendingActionType, 'checkPendingActionType', '/Users/mymomo/workspace/yunying/client/middleware/api.js');

	  __REACT_HOT_LOADER__.register(promiseMiddleware, 'promiseMiddleware', '/Users/mymomo/workspace/yunying/client/middleware/api.js');
	})();

	;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	if (false) {
	  module.exports = require('react-router/lib/browserHistory');
	} else {
	  module.exports = __webpack_require__(27);
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	})();

	;

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("react-router/lib/hashHistory");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = createReducer;

	var _redux = __webpack_require__(23);

	var _dialog = __webpack_require__(29);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _snackBar = __webpack_require__(32);

	var _snackBar2 = _interopRequireDefault(_snackBar);

	var _pending = __webpack_require__(34);

	var _pending2 = _interopRequireDefault(_pending);

	var _status = __webpack_require__(35);

	var _status2 = _interopRequireDefault(_status);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createReducer() {
	  var asyncReducers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  return (0, _redux.combineReducers)(_extends({
	    status: _status2.default,
	    dialog: _dialog2.default,
	    snackBar: _snackBar2.default,
	    pending: _pending2.default
	  }, asyncReducers));
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(createReducer, 'createReducer', '/Users/mymomo/workspace/yunying/client/reducers/index.js');
	})();

	;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createReducer;

	exports.getDialog = getDialog;

	var _DialogTypes = __webpack_require__(30);

	var _createReducer2 = __webpack_require__(31);

	var _createReducer3 = _interopRequireDefault(_createReducer2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = {
	  open: false,
	  type: _DialogTypes.DIALOG_TYPE.DIALOG,
	  props: {}
	};

	var _default = (0, _createReducer3.default)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _DialogTypes.OPEN_DIALOG, function (state, action) {
	  return {
	    open: true,
	    type: action.payload.type,
	    props: action.payload.props
	  };
	}), _defineProperty(_createReducer, _DialogTypes.CLOSE_DIALOG, function (state, action) {
	  return {
	    open: false
	  };
	}), _createReducer));

	exports.default = _default;
	function getDialog(state) {
	  return state.dialog;
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(initialState, 'initialState', '/Users/mymomo/workspace/yunying/client/reducers/dialog.js');

	  __REACT_HOT_LOADER__.register(getDialog, 'getDialog', '/Users/mymomo/workspace/yunying/client/reducers/dialog.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/reducers/dialog.js');
	})();

	;

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var OPEN_DIALOG = exports.OPEN_DIALOG = 'OPEN_DIALOG';
	var CLOSE_DIALOG = exports.CLOSE_DIALOG = 'CLOSE_DIALOG';

	var DIALOG_TYPE = exports.DIALOG_TYPE = {
	  PROMT: 'PROMT',
	  DIALOG: 'DIALOG'
	};
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(OPEN_DIALOG, 'OPEN_DIALOG', '/Users/mymomo/workspace/yunying/client/constants/DialogTypes.js');

	  __REACT_HOT_LOADER__.register(CLOSE_DIALOG, 'CLOSE_DIALOG', '/Users/mymomo/workspace/yunying/client/constants/DialogTypes.js');

	  __REACT_HOT_LOADER__.register(DIALOG_TYPE, 'DIALOG_TYPE', '/Users/mymomo/workspace/yunying/client/constants/DialogTypes.js');
	})();

	;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = createReducer;
	function createReducer(initialState, handlers) {
	  return function reducer() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	    var action = arguments[1];

	    if (handlers.hasOwnProperty(action.type)) {
	      if (action.error) {
	        if (true) {
	          console.log('action error:', action);
	        }
	        return _extends({}, state, {
	          error: action.payload
	        });
	      }
	      if (action.fatalError) {
	        if (true) {
	          console.log('action fatalError:', action);
	        }
	        return _extends({}, state, {
	          fatalError: action.payload
	        });
	      }
	      return handlers[action.type](state, action);
	    }
	    return state;
	  };
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(createReducer, 'createReducer', '/Users/mymomo/workspace/yunying/client/reducers/createReducer.js');
	})();

	;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createReducer;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.getSnackBar = getSnackBar;

	var _SnackBarActionTypes = __webpack_require__(33);

	var _createReducer2 = __webpack_require__(31);

	var _createReducer3 = _interopRequireDefault(_createReducer2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = {
	  open: false,
	  message: ''
	};

	var _default = (0, _createReducer3.default)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _SnackBarActionTypes.OPEN_SNACKBAR, function (state, action) {
	  return _extends({}, action.payload, {
	    open: true
	  });
	}), _defineProperty(_createReducer, _SnackBarActionTypes.CLOSE_SNACKBAR, function (state, action) {
	  return _extends({}, action.payload, {
	    open: false
	  });
	}), _createReducer));

	exports.default = _default;
	function getSnackBar(state) {
	  return state.snackBar;
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(initialState, 'initialState', '/Users/mymomo/workspace/yunying/client/reducers/snackBar.js');

	  __REACT_HOT_LOADER__.register(getSnackBar, 'getSnackBar', '/Users/mymomo/workspace/yunying/client/reducers/snackBar.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/reducers/snackBar.js');
	})();

	;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var OPEN_SNACKBAR = exports.OPEN_SNACKBAR = 'OPEN_SNACKBAR';
	var CLOSE_SNACKBAR = exports.CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(OPEN_SNACKBAR, 'OPEN_SNACKBAR', '/Users/mymomo/workspace/yunying/client/constants/SnackBarActionTypes.js');

	  __REACT_HOT_LOADER__.register(CLOSE_SNACKBAR, 'CLOSE_SNACKBAR', '/Users/mymomo/workspace/yunying/client/constants/SnackBarActionTypes.js');
	})();

	;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = pending;

	var _api = __webpack_require__(25);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = {};

	function pending() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];

	  return (0, _api.checkPendingActionType)(action) ? Object.assign({}, state, _defineProperty({}, action.meta.pending.desc, action.meta.pending.status)) : state;
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(initialState, 'initialState', '/Users/mymomo/workspace/yunying/client/reducers/pending.js');

	  __REACT_HOT_LOADER__.register(pending, 'pending', '/Users/mymomo/workspace/yunying/client/reducers/pending.js');
	})();

	;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createReducer;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.getStatus = getStatus;

	var _StatusActionTypes = __webpack_require__(36);

	var _createReducer2 = __webpack_require__(31);

	var _createReducer3 = _interopRequireDefault(_createReducer2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = {
	  progress: {
	    show: false
	  }
	};

	var _default = (0, _createReducer3.default)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _StatusActionTypes.START_PROGRESS, function (state, action) {
	  return _extends({}, state, {
	    progress: {
	      show: true
	    }
	  });
	}), _defineProperty(_createReducer, _StatusActionTypes.END_PROGRESS, function (state, action) {
	  return _extends({}, state, {
	    progress: {
	      show: false
	    }
	  });
	}), _createReducer));

	exports.default = _default;
	function getStatus(state) {
	  return state.status;
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(initialState, 'initialState', '/Users/mymomo/workspace/yunying/client/reducers/status.js');

	  __REACT_HOT_LOADER__.register(getStatus, 'getStatus', '/Users/mymomo/workspace/yunying/client/reducers/status.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/reducers/status.js');
	})();

	;

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var START_PROGRESS = exports.START_PROGRESS = 'START_PROGRESS';
	var END_PROGRESS = exports.END_PROGRESS = 'END_PROGRESS';
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(START_PROGRESS, 'START_PROGRESS', '/Users/mymomo/workspace/yunying/client/constants/StatusActionTypes.js');

	  __REACT_HOT_LOADER__.register(END_PROGRESS, 'END_PROGRESS', '/Users/mymomo/workspace/yunying/client/constants/StatusActionTypes.js');
	})();

	;

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("react-router/lib/RouterContext");

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("react-router/lib/match");

/***/ },
/* 42 */
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
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(fetchData, "fetchData", "/Users/mymomo/workspace/yunying/server/util/fetchData.js");
	})();

	;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fullpath = exports.pageName = undefined;

	var _App = __webpack_require__(44);

	var _App2 = _interopRequireDefault(_App);

	var _Manage = __webpack_require__(56);

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

	var _default = createRoute;
	exports.default = _default;
	exports.pageName = pageName;
	exports.fullpath = fullpath;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(pageName, 'pageName', '/Users/mymomo/workspace/yunying/client/route.js');

	  __REACT_HOT_LOADER__.register(path, 'path', '/Users/mymomo/workspace/yunying/client/route.js');

	  __REACT_HOT_LOADER__.register(fullpath, 'fullpath', '/Users/mymomo/workspace/yunying/client/route.js');

	  __REACT_HOT_LOADER__.register(createRoute, 'createRoute', '/Users/mymomo/workspace/yunying/client/route.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/route.js');
	})();

	;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(45);

	var _index2 = _interopRequireDefault(_index);

	var _react = __webpack_require__(38);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(23);

	var _reactRedux = __webpack_require__(37);

	var _snackBar = __webpack_require__(46);

	var _snackBar2 = __webpack_require__(32);

	var _status = __webpack_require__(35);

	var _MuiThemeProvider = __webpack_require__(48);

	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

	var _getMuiTheme = __webpack_require__(49);

	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

	var _theme = __webpack_require__(50);

	var _theme2 = _interopRequireDefault(_theme);

	var _Snackbar = __webpack_require__(54);

	var _Snackbar2 = _interopRequireDefault(_Snackbar);

	var _CircularProgress = __webpack_require__(55);

	var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// material ui


	var App = function (_Component) {
	  _inherits(App, _Component);

	  function App(props, context) {
	    _classCallCheck(this, App);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props, context));

	    _this.handleRequestClose = function () {
	      return _this.props.actions.closeSnackBar({});
	    };

	    return _this;
	  }

	  _createClass(App, [{
	    key: 'waiting',
	    value: function waiting() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'back-overlay' },
	        _react2.default.createElement(_CircularProgress2.default, { className: 'pop--center' })
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var progress = this.props.status.progress;
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
	          ),
	          _react2.default.createElement(_Snackbar2.default, {
	            open: this.props.snackBar.open,
	            message: this.props.snackBar.message,
	            autoHideDuration: 2000,
	            onRequestClose: this.handleRequestClose
	          }),
	          progress.show && this.waiting()
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

	function mapStateToProps(state) {
	  return {
	    status: (0, _status.getStatus)(state),
	    snackBar: (0, _snackBar2.getSnackBar)(state)
	  };
	}

	function mapDispatchToProps(dispatch) {
	  return {
	    actions: (0, _redux.bindActionCreators)({ closeSnackBar: _snackBar.closeSnackBar }, dispatch)
	  };
	}

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(App, 'App', '/Users/mymomo/workspace/yunying/client/App.js');

	  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/mymomo/workspace/yunying/client/App.js');

	  __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/mymomo/workspace/yunying/client/App.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/App.js');
	})();

	;

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = {
		"wrapper": "client-style-index_wrapper_1IJ"
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.closeSnackBar = exports.openSnackBar = undefined;

	var _SnackBarActionTypes = __webpack_require__(33);

	var _createAction = __webpack_require__(47);

	var _createAction2 = _interopRequireDefault(_createAction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var openSnackBar = exports.openSnackBar = (0, _createAction2.default)(_SnackBarActionTypes.OPEN_SNACKBAR, function (props) {
	  return props;
	});

	var closeSnackBar = exports.closeSnackBar = (0, _createAction2.default)(_SnackBarActionTypes.CLOSE_SNACKBAR, function (props) {
	  return props;
	});
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(openSnackBar, 'openSnackBar', '/Users/mymomo/workspace/yunying/client/actions/snackBar.js');

	  __REACT_HOT_LOADER__.register(closeSnackBar, 'closeSnackBar', '/Users/mymomo/workspace/yunying/client/actions/snackBar.js');
	})();

	;

/***/ },
/* 47 */
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
	    var hasError = (arguments.length <= 0 ? undefined : arguments[0]) instanceof Error;

	    var action = {
	      type: type,
	      payload: hasError ? arguments.length <= 0 ? undefined : arguments[0] : payloadCreator.apply(undefined, arguments)
	    };

	    if (hasError) {
	      // Handle FSA errors where the payload is an Error object. Set error.
	      action.error = true;
	    }

	    if (typeof metaCreator === 'function') {
	      action.meta = metaCreator.apply(undefined, arguments);
	    }
	    return action;
	  };
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(unFlat, 'unFlat', '/Users/mymomo/workspace/yunying/client/actions/createAction.js');

	  __REACT_HOT_LOADER__.register(createAction, 'createAction', '/Users/mymomo/workspace/yunying/client/actions/createAction.js');
	})();

	;

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/getMuiTheme");

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _colors = __webpack_require__(51);

	var _colorManipulator = __webpack_require__(52);

	var _spacing = __webpack_require__(53);

	var _spacing2 = _interopRequireDefault(_spacing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var red = {
	  lighten2: '#ee6e73'
	};

	var teal = {
	  lighten1: '#26a69a'
	};

	var _default = {
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
	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(red, 'red', '/Users/mymomo/workspace/yunying/client/style/theme.js');

	  __REACT_HOT_LOADER__.register(teal, 'teal', '/Users/mymomo/workspace/yunying/client/style/theme.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/style/theme.js');
	})();

	;

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/colors");

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = require("material-ui/utils/colorManipulator");

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/spacing");

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = require("material-ui/Snackbar");

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = require("material-ui/CircularProgress");

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fullpath = exports.pageName = undefined;

	var _Files = __webpack_require__(57);

	var _Files2 = _interopRequireDefault(_Files);

	var _Edit = __webpack_require__(87);

	var _Edit2 = _interopRequireDefault(_Edit);

	var _store = __webpack_require__(21);

	var _route = __webpack_require__(43);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var pageName = 'manage';
	var path = 'manage';
	var fullpath = _route.fullpath + '/manage';

	var createRoute = function createRoute(store) {
	  return {
	    path: path,
	    getComponent: function getComponent(nextState, cb) {
	      var reducers = __webpack_require__(102).default;
	      (0, _store.injectAsyncReducer)(store, pageName, reducers);

	      if (true) {
	        cb(null, __webpack_require__(106).default);
	      } else {
	        require.ensure([], function (require) {
	          cb(null, require('./views/Manage').default);
	        }, 'manage');
	      }
	    },

	    childRoutes: [(0, _Files2.default)(store), (0, _Edit2.default)(store)]
	  };
	};

	var _default = createRoute;
	exports.default = _default;
	exports.pageName = pageName;
	exports.fullpath = fullpath;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(pageName, 'pageName', '/Users/mymomo/workspace/yunying/client/routes/Manage/index.js');

	  __REACT_HOT_LOADER__.register(path, 'path', '/Users/mymomo/workspace/yunying/client/routes/Manage/index.js');

	  __REACT_HOT_LOADER__.register(fullpath, 'fullpath', '/Users/mymomo/workspace/yunying/client/routes/Manage/index.js');

	  __REACT_HOT_LOADER__.register(createRoute, 'createRoute', '/Users/mymomo/workspace/yunying/client/routes/Manage/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/index.js');
	})();

	;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fullpath = exports.pageName = undefined;

	var _store = __webpack_require__(21);

	var _index = __webpack_require__(56);

	var pageName = 'files';
	var path = 'files';
	var fullpath = _index.fullpath + '/files';

	var createRoute = function createRoute(store) {
	  return {
	    path: path,
	    getComponent: function getComponent(nextState, cb) {
	      var reducers = __webpack_require__(58).default;
	      (0, _store.injectAsyncReducer)(store, pageName, reducers);

	      if (true) {
	        cb(null, __webpack_require__(61).default);
	      } else {
	        require.ensure([], function (require) {
	          cb(null, require('./views/FileListView').default);
	        }, 'manage/files');
	      }
	    }
	  };
	};

	var _default = createRoute;
	exports.default = _default;
	exports.pageName = pageName;
	exports.fullpath = fullpath;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(pageName, 'pageName', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/index.js');

	  __REACT_HOT_LOADER__.register(path, 'path', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/index.js');

	  __REACT_HOT_LOADER__.register(fullpath, 'fullpath', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/index.js');

	  __REACT_HOT_LOADER__.register(createRoute, 'createRoute', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/index.js');
	})();

	;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(23);

	var _files = __webpack_require__(59);

	var _files2 = _interopRequireDefault(_files);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	  files: _files2.default
	});

	var _default = rootReducer;
	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(rootReducer, 'rootReducer', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/reducers/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/reducers/index.js');
	})();

	;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createReducer;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.getCurDirInfo = getCurDirInfo;

	var _FileActionTypes = __webpack_require__(60);

	var _createReducer2 = __webpack_require__(31);

	var _createReducer3 = _interopRequireDefault(_createReducer2);

	var _index = __webpack_require__(57);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = {
	  checkable: false,
	  basePath: undefined,
	  curDir: {
	    children: []
	  }
	};

	var _default = (0, _createReducer3.default)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _FileActionTypes.FETCH_FILES, function (state, action) {
	  return _extends({}, state, {
	    curDir: action.payload
	  });
	}), _defineProperty(_createReducer, _FileActionTypes.CREATE_FOLDER, function (state, action) {
	  var cur = state.curDir;
	  var newCur = _extends({}, cur, {
	    children: cur.children.concat(action.payload)
	  });
	  return _extends({}, state, {
	    curDir: newCur
	  });
	}), _defineProperty(_createReducer, _FileActionTypes.UPLOAD_FILE, function (state, action) {
	  var cur = state.curDir;
	  var newCur = _extends({}, cur, {
	    children: cur.children.concat(action.payload)
	  });
	  return _extends({}, state, {
	    curDir: newCur
	  });
	}), _defineProperty(_createReducer, _FileActionTypes.RENAME_FILE, function (state, action) {
	  var cur = state.curDir;
	  var nameInfo = action.meta;
	  var newCur = _extends({}, cur, {
	    children: cur.children.map(function (file) {
	      return file.fullname === nameInfo.oriName ? _extends({}, file, action.payload) : file;
	    })
	  });
	  return _extends({}, state, {
	    curDir: newCur
	  });
	}), _defineProperty(_createReducer, _FileActionTypes.CHECK_FILE, function (state, action) {
	  var cur = state.curDir;
	  var _action$payload = action.payload;
	  var name = _action$payload.name;
	  var checked = _action$payload.checked;

	  var newCur = _extends({}, cur, {
	    children: cur.children.map(function (file) {
	      return file.fullname === name ? _extends({}, file, {
	        checked: checked
	      }) : file;
	    })
	  });
	  return _extends({}, state, {
	    curDir: newCur
	  });
	}), _defineProperty(_createReducer, _FileActionTypes.TOGGLE_CHECK, function (state, action) {
	  return _extends({}, state, {
	    checkable: action.payload
	  });
	}), _createReducer));

	exports.default = _default;
	function getCurDirInfo(state) {
	  return {
	    checkable: state[_index.pageName].files.checkable,
	    dirInfo: state[_index.pageName].files.curDir
	  };
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(initialState, 'initialState', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/reducers/files.js');

	  __REACT_HOT_LOADER__.register(getCurDirInfo, 'getCurDirInfo', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/reducers/files.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/reducers/files.js');
	})();

	;

/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var FETCH_FILES = exports.FETCH_FILES = 'FETCH_FILES';
	var CREATE_FOLDER = exports.CREATE_FOLDER = 'CREATE_FOLDER';
	var UPLOAD_FILE = exports.UPLOAD_FILE = 'UPLOAD_FILE';
	var RENAME_FILE = exports.RENAME_FILE = 'RENAME_FILE';
	var CHECK_FILE = exports.CHECK_FILE = 'CHECK_FILE';
	var TOGGLE_CHECK = exports.TOGGLE_CHECK = 'TOGGLE_CHECK';
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(FETCH_FILES, 'FETCH_FILES', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/constants/FileActionTypes.js');

	  __REACT_HOT_LOADER__.register(CREATE_FOLDER, 'CREATE_FOLDER', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/constants/FileActionTypes.js');

	  __REACT_HOT_LOADER__.register(UPLOAD_FILE, 'UPLOAD_FILE', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/constants/FileActionTypes.js');

	  __REACT_HOT_LOADER__.register(RENAME_FILE, 'RENAME_FILE', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/constants/FileActionTypes.js');

	  __REACT_HOT_LOADER__.register(CHECK_FILE, 'CHECK_FILE', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/constants/FileActionTypes.js');

	  __REACT_HOT_LOADER__.register(TOGGLE_CHECK, 'TOGGLE_CHECK', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/constants/FileActionTypes.js');
	})();

	;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(62);

	var _index2 = _interopRequireDefault(_index);

	var _react = __webpack_require__(38);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(23);

	var _reactRedux = __webpack_require__(37);

	var _fetch = __webpack_require__(63);

	var _fetch2 = _interopRequireDefault(_fetch);

	var _files = __webpack_require__(66);

	var _files2 = __webpack_require__(59);

	var _FileListItem = __webpack_require__(67);

	var _FileListItem2 = _interopRequireDefault(_FileListItem);

	var _List = __webpack_require__(72);

	var _Fab = __webpack_require__(77);

	var _Fab2 = _interopRequireDefault(_Fab);

	var _FloatingActionButton = __webpack_require__(80);

	var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

	var _IconButton = __webpack_require__(68);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _moreVert = __webpack_require__(69);

	var _moreVert2 = _interopRequireDefault(_moreVert);

	var _add = __webpack_require__(81);

	var _add2 = _interopRequireDefault(_add);

	var _createNewFolder = __webpack_require__(83);

	var _createNewFolder2 = _interopRequireDefault(_createNewFolder);

	var _fileUpload = __webpack_require__(84);

	var _fileUpload2 = _interopRequireDefault(_fileUpload);

	var _IconMenu = __webpack_require__(70);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(71);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _Checkbox = __webpack_require__(86);

	var _Checkbox2 = _interopRequireDefault(_Checkbox);

	var _colors = __webpack_require__(51);

	var _url = __webpack_require__(65);

	var _history = __webpack_require__(26);

	var _history2 = _interopRequireDefault(_history);

	var _snackBar = __webpack_require__(46);

	var _Prompt = __webpack_require__(73);

	var _Prompt2 = _interopRequireDefault(_Prompt);

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
	      { onTouchTap: props.onMove },
	      '移动到'
	    ),
	    _react2.default.createElement(
	      _MenuItem2.default,
	      { onTouchTap: props.onRename },
	      '重命名'
	    ),
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

	var fileCheckBox = function fileCheckBox(onCheck) {
	  return _react2.default.createElement(_Checkbox2.default, {
	    style: { width: 'auto', marginTop: 10 },
	    onCheck: onCheck
	  });
	};

	var FileListView = function (_Component) {
	  _inherits(FileListView, _Component);

	  function FileListView(props, context) {
	    _classCallCheck(this, FileListView);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FileListView).call(this, props, context));

	    _this.checkFile = function (file) {
	      return function (event, isInputChecked) {
	        _this.props.actions.checkFile({ name: file.fullname, checked: isInputChecked });
	      };
	    };

	    _this.move = function (file) {
	      return function () {
	        _this.props.actions.toggleCheck(true);
	      };
	    };

	    _this.downloadFile = function (file) {
	      return function () {
	        _this.setState({
	          downloadFileAddress: (0, _url.join)('files/' + encodeURIComponent(file.fullname) + '?format=file')
	        });
	      };
	    };

	    _this.rename = function (file) {
	      return function () {
	        _this.fileToRename = file;
	        _this.setState({
	          prompt: {
	            open: true,
	            title: '重命名文件',
	            label: '名称',
	            placeholder: file.name,
	            defaultValue: file.name,
	            selected: true,
	            onSubmit: _this.handleRename
	          }
	        });
	      };
	    };

	    _this.handleRename = function (newName) {
	      var _this$props$actions = _this.props.actions;
	      var renameFile = _this$props$actions.renameFile;
	      var openSnackBar = _this$props$actions.openSnackBar;

	      renameFile(_this.fileToRename, newName).then(function (action) {
	        _this.setState({
	          prompt: {
	            open: false
	          }
	        });

	        if (action.error) {
	          openSnackBar({
	            message: action.payload.message
	          });
	          return;
	        }

	        if (action.fatalError) {
	          openSnackBar({
	            message: '发生错误！'
	          });
	          return;
	        }
	      });
	    };

	    _this.selectFile = function (event, index) {
	      if (index === -1) {
	        _history2.default.push('/manage/files?filename=' + _this.props.parent);
	        return;
	      }
	      var file = _this.props.files[index];
	      if (file.file && !_this.props.checkable) {
	        _history2.default.push('/manage/edit?filename=' + file.fullname);
	      } else if (file.directory) {
	        _history2.default.push('/manage/files?filename=' + file.fullname);
	      }
	    };

	    _this.hidePrompt = function () {
	      _this.setState({
	        prompt: {
	          open: false
	        }
	      });
	    };

	    _this.parentFolder = _react2.default.createElement(_List.ListItem
	    /*leftCheckbox={ checkable ? fileCheckBox(this.checkFile(file)) : undefined }*/
	    , {
	      onTouchTap: function onTouchTap(event) {
	        return _this.selectFile(event, -1);
	      },
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

	    _this.state = {
	      selectedFile: null, // 当前选中的文件
	      checkedFile: null,
	      downloadFileAddress: null,
	      prompt: {
	        open: false
	      }
	    };
	    return _this;
	  }

	  _createClass(FileListView, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      FileListView.need.forEach(function (need) {
	        return _this2.props.dispatch(need(_this2.props.location));
	      });
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(preProps) {
	      var _this3 = this;

	      if (this.props.location.search === preProps.location.search) return;

	      FileListView.need.forEach(function (need) {
	        return _this3.props.dispatch(need(_this3.props.location));
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var _props = this.props;
	      var files = _props.files;
	      var curDir = _props.curDir;
	      var checkable = _props.checkable;
	      var _state = this.state;
	      var prompt = _state.prompt;
	      var selectedFile = _state.selectedFile;


	      var isRoot = this.props.basePath === curDir;

	      var palette = this.context.muiTheme.palette;
	      var fileItems = files.map(function (file, index) {
	        return _react2.default.createElement(
	          _List.ListItem,
	          { key: file.fullname,
	            rightIconButton: rightIconMenu({
	              onMove: _this4.move(file),
	              onDownload: _this4.downloadFile(file),
	              onRename: _this4.rename(file)
	            })
	          },
	          _react2.default.createElement(
	            'div',
	            { style: { display: 'flex' } },
	            checkable && fileCheckBox(_this4.checkFile(file)),
	            _react2.default.createElement(
	              'div',
	              {
	                onTouchTap: function onTouchTap(event) {
	                  return _this4.selectFile(event, index);
	                },
	                style: {
	                  marginTop: -16,
	                  marginBottom: -16,
	                  paddingTop: 16,
	                  marginLeft: checkable ? 10 : 0,
	                  flexGrow: 1
	                } },
	              _react2.default.createElement(
	                'p',
	                { style: { color: palette.textColor } },
	                file.name
	              ),
	              _react2.default.createElement(
	                'p',
	                { style: { color: palette.secondaryTextColor } },
	                file.fullname
	              )
	            )
	          )
	        );
	      });

	      if (!isRoot) {
	        fileItems.unshift(this.parentFolder);
	      }

	      var downloadFileAddress = this.state.downloadFileAddress;
	      return _react2.default.createElement(
	        'div',
	        { className: 'FileListView' },
	        _react2.default.createElement(
	          _List.List,
	          null,
	          fileItems
	        ),
	        downloadFileAddress && _react2.default.createElement('iframe', { src: downloadFileAddress, style: { display: 'none' } }),
	        _react2.default.createElement(_Prompt2.default, _extends({
	          onCancel: this.hidePrompt
	        }, prompt)),
	        _react2.default.createElement(_Fab2.default, null)
	      );
	    }
	  }]);

	  return FileListView;
	}(_react.Component);

	FileListView.propTypes = {
	  location: _react.PropTypes.object, // react-router 注入属性
	  children: _react.PropTypes.node
	};

	FileListView.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};

	FileListView.need = [ssrGetFiles];

	function ssrGetFiles(location) {
	  var filename = location.query.filename;

	  if (filename === undefined) {
	    return (0, _files.fetchDirFiles)('<default>');
	  }
	  return (0, _files.fetchDirFiles)(filename);
	}

	function mapStateToProps(state) {
	  var files = (0, _files2.getCurDirInfo)(state);
	  var dir = files.dirInfo;
	  return {
	    checkable: files.checkable,
	    files: dir.children,
	    curDir: dir.fullname,
	    parent: dir.parent
	  };
	}

	function mapDispatchToProps(dispatch) {
	  return {
	    dispatch: dispatch,
	    actions: (0, _redux.bindActionCreators)({ fetchDirFiles: _files.fetchDirFiles, renameFile: _files.renameFile, checkFile: _files.checkFile, toggleCheck: _files.toggleCheck, openSnackBar: _snackBar.openSnackBar }, dispatch)
	  };
	}

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FileListView);

	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(iconButtonElement, 'iconButtonElement', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/views/FileListView/index.js');

	  __REACT_HOT_LOADER__.register(rightIconMenu, 'rightIconMenu', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/views/FileListView/index.js');

	  __REACT_HOT_LOADER__.register(SelectedList, 'SelectedList', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/views/FileListView/index.js');

	  __REACT_HOT_LOADER__.register(fileCheckBox, 'fileCheckBox', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/views/FileListView/index.js');

	  __REACT_HOT_LOADER__.register(FileListView, 'FileListView', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/views/FileListView/index.js');

	  __REACT_HOT_LOADER__.register(ssrGetFiles, 'ssrGetFiles', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/views/FileListView/index.js');

	  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/views/FileListView/index.js');

	  __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/views/FileListView/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/views/FileListView/index.js');
	})();

	;

/***/ },
/* 62 */
/***/ function(module, exports) {

	

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.params = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	__webpack_require__(64);

	var _url = __webpack_require__(65);

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

	var _default = _fetch;
	exports.default = _default;
	exports.params = params;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(baseurl, 'baseurl', '/Users/mymomo/workspace/yunying/client/util/fetch.js');

	  __REACT_HOT_LOADER__.register(headers, 'headers', '/Users/mymomo/workspace/yunying/client/util/fetch.js');

	  __REACT_HOT_LOADER__.register(defaultOption, 'defaultOption', '/Users/mymomo/workspace/yunying/client/util/fetch.js');

	  __REACT_HOT_LOADER__.register(_fetch, '_fetch', '/Users/mymomo/workspace/yunying/client/util/fetch.js');

	  __REACT_HOT_LOADER__.register(params, 'params', '/Users/mymomo/workspace/yunying/client/util/fetch.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/util/fetch.js');
	})();

	;

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 65 */
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

	  if (false) {
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
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(getBase, 'getBase', '/Users/mymomo/workspace/yunying/client/util/url.js');

	  __REACT_HOT_LOADER__.register(join, 'join', '/Users/mymomo/workspace/yunying/client/util/url.js');
	})();

	;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toggleCheck = exports.checkFile = exports.renameFile = exports._renameFile = exports.uploadFile = exports._uploadFile = exports.createFolder = exports._createFolder = exports.fetchDirFiles = undefined;

	var _FileActionTypes = __webpack_require__(60);

	var _createAction = __webpack_require__(47);

	var _createAction2 = _interopRequireDefault(_createAction);

	var _fetch = __webpack_require__(63);

	var _fetch2 = _interopRequireDefault(_fetch);

	var _files = __webpack_require__(59);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var fetchDirFiles = exports.fetchDirFiles = (0, _createAction2.default)(_FileActionTypes.FETCH_FILES, function (filename) {
	  return (0, _fetch2.default)('files/' + encodeURIComponent(filename) + '?children');
	});

	var _createFolder = exports._createFolder = (0, _createAction2.default)(_FileActionTypes.CREATE_FOLDER, function (parent, name, isExist) {
	  return (0, _fetch2.default)('files/' + encodeURIComponent(parent) + '/directory?name=' + name, {
	    method: 'POST'
	  });
	});

	var createFolder = exports.createFolder = function createFolder(name) {
	  return function (dispatch, getState) {
	    var dir = (0, _files.getCurDirInfo)(getState());
	    var isExist = dir.children.some(function (file) {
	      return file.directory && file.name === name;
	    });
	    var action = isExist ? _createFolder(new Error('文件夹已存在！')) : _createFolder(dir.fullname, name);
	    return dispatch(action);
	  };
	};

	var _uploadFile = exports._uploadFile = (0, _createAction2.default)(_FileActionTypes.UPLOAD_FILE, function (parent, file) {
	  var formData = new FormData();
	  formData.append('file', file);

	  return (0, _fetch2.default)('files/' + encodeURIComponent(parent) + '/upload', {
	    method: 'POST',
	    headers: {},
	    body: formData
	  });
	});

	var uploadFile = exports.uploadFile = function uploadFile(file) {
	  return function (dispatch, getState) {
	    var dir = (0, _files.getCurDirInfo)(getState());
	    var isExist = dir.children.some(function (fileItem) {
	      return fileItem.file && fileItem.name === file.name;
	    });
	    var action = isExist ? _uploadFile(new Error('文件已存在！')) : _uploadFile(dir.fullname, file);
	    return dispatch(action);
	  };
	};

	var _renameFile = exports._renameFile = (0, _createAction2.default)(_FileActionTypes.RENAME_FILE, function (oriName, newName) {
	  return (0, _fetch2.default)('files/' + encodeURIComponent(oriName) + '/rename?name=' + newName, {
	    method: 'POST'
	  });
	}, function (oriName, newName) {
	  return {
	    oriName: oriName,
	    newName: newName
	  };
	});

	var renameFile = exports.renameFile = function renameFile(file, newName) {
	  return function (dispatch, getState) {
	    var dir = (0, _files.getCurDirInfo)(getState());
	    var isExist = dir.children.some(function (fileItem) {
	      return fileItem.file === file.file && fileItem.directory === file.directory && fileItem.name === newName;
	    });
	    var action = isExist ? _renameFile(new Error('已存在同名的文件！')) : _renameFile(file.fullname, newName);
	    return dispatch(action);
	  };
	};

	var checkFile = exports.checkFile = (0, _createAction2.default)(_FileActionTypes.CHECK_FILE);

	var toggleCheck = exports.toggleCheck = (0, _createAction2.default)(_FileActionTypes.TOGGLE_CHECK);
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(fetchDirFiles, 'fetchDirFiles', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/actions/files.js');

	  __REACT_HOT_LOADER__.register(_createFolder, '_createFolder', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/actions/files.js');

	  __REACT_HOT_LOADER__.register(createFolder, 'createFolder', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/actions/files.js');

	  __REACT_HOT_LOADER__.register(_uploadFile, '_uploadFile', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/actions/files.js');

	  __REACT_HOT_LOADER__.register(uploadFile, 'uploadFile', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/actions/files.js');

	  __REACT_HOT_LOADER__.register(_renameFile, '_renameFile', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/actions/files.js');

	  __REACT_HOT_LOADER__.register(renameFile, 'renameFile', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/actions/files.js');

	  __REACT_HOT_LOADER__.register(checkFile, 'checkFile', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/actions/files.js');

	  __REACT_HOT_LOADER__.register(toggleCheck, 'toggleCheck', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/actions/files.js');
	})();

	;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(38);

	var _react2 = _interopRequireDefault(_react);

	var _IconButton = __webpack_require__(68);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _moreVert = __webpack_require__(69);

	var _moreVert2 = _interopRequireDefault(_moreVert);

	var _IconMenu = __webpack_require__(70);

	var _IconMenu2 = _interopRequireDefault(_IconMenu);

	var _MenuItem = __webpack_require__(71);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _List = __webpack_require__(72);

	var _colors = __webpack_require__(51);

	var _Prompt = __webpack_require__(73);

	var _Prompt2 = _interopRequireDefault(_Prompt);

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

	var _default = FileListItem;
	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(iconButtonElement, 'iconButtonElement', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/components/FileListItem/index.js');

	  __REACT_HOT_LOADER__.register(rightIconMenu, 'rightIconMenu', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/components/FileListItem/index.js');

	  __REACT_HOT_LOADER__.register(FileListItem, 'FileListItem', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/components/FileListItem/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/components/FileListItem/index.js');
	})();

	;

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = require("material-ui/IconButton");

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/navigation/more-vert");

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = require("material-ui/IconMenu");

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = require("material-ui/MenuItem");

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = require("material-ui/List");

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(38);

	var _react2 = _interopRequireDefault(_react);

	var _Dialog = __webpack_require__(74);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _FlatButton = __webpack_require__(75);

	var _FlatButton2 = _interopRequireDefault(_FlatButton);

	var _TextField = __webpack_require__(76);

	var _TextField2 = _interopRequireDefault(_TextField);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Prompt = function (_Component) {
	  _inherits(Prompt, _Component);

	  function Prompt(props, context) {
	    _classCallCheck(this, Prompt);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Prompt).call(this, props, context));

	    _this.handleCancel = function () {
	      _this.props.onCancel();
	    };

	    _this.handleSubmit = function () {
	      _this.props.onSubmit(_this.value);
	      //this.setState({ value: null });
	    };

	    _this.handleChange = function (e) {
	      _this.value = e.target.value;
	      //this.setState({ value: e.target.value });
	    };

	    _this.selectText = function (e) {
	      var target = e.target;
	      setTimeout(function () {
	        target.select();
	      }, 0);
	    };

	    return _this;
	  }

	  _createClass(Prompt, [{
	    key: 'render',


	    // componentWillReceiveProps(nextProps) {
	    //   if (!this.props.open && nextProps.open) {
	    //     this.state = {
	    //       value: nextProps.initValue !== undefined ? ,
	    //     };
	    //   }
	    // }

	    value: function render() {
	      var _props = this.props;
	      var title = _props.title;
	      var placeholder = _props.placeholder;
	      var label = _props.label;
	      var selected = _props.selected;
	      var defaultValue = _props.defaultValue;

	      var actions = [_react2.default.createElement(_FlatButton2.default, {
	        label: '取消',
	        primary: true,
	        onTouchTap: this.handleCancel
	      }), _react2.default.createElement(_FlatButton2.default, {
	        label: '确认',
	        primary: true,
	        onTouchTap: this.handleSubmit
	      })];

	      return _react2.default.createElement(
	        _Dialog2.default,
	        {
	          title: title,
	          actions: actions,
	          modal: false,
	          onRequestClose: this.handleCancel,
	          open: this.props.open
	        },
	        _react2.default.createElement(_TextField2.default, {
	          ref: this.focusInput,
	          autoFocus: true,
	          defaultValue: defaultValue,
	          onFocus: selected ? this.selectText : undefined,
	          onChange: this.handleChange,
	          hintText: placeholder,
	          floatingLabelText: label,
	          fullWidth: true,
	          rowsMax: 1
	        })
	      );
	    }
	  }]);

	  return Prompt;
	}(_react.Component);

	Prompt.propTypes = {
	  open: _react.PropTypes.bool,
	  initValue: _react.PropTypes.string,
	  title: _react.PropTypes.string,
	  placeholder: _react.PropTypes.string,
	  label: _react.PropTypes.string,
	  onCancel: _react.PropTypes.func,
	  onSubmit: _react.PropTypes.func
	};

	Prompt.defaultProps = {
	  open: false
	};

	var _default = Prompt;
	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(Prompt, 'Prompt', '/Users/mymomo/workspace/yunying/client/components/Prompt/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/components/Prompt/index.js');
	})();

	;

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = require("material-ui/Dialog");

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = require("material-ui/FlatButton");

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = require("material-ui/TextField");

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(78);

	var _index2 = _interopRequireDefault(_index);

	var _react = __webpack_require__(38);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(79);

	var _redux = __webpack_require__(23);

	var _reactRedux = __webpack_require__(37);

	var _FloatingActionButton = __webpack_require__(80);

	var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

	var _add = __webpack_require__(81);

	var _add2 = _interopRequireDefault(_add);

	var _clear = __webpack_require__(82);

	var _clear2 = _interopRequireDefault(_clear);

	var _createNewFolder = __webpack_require__(83);

	var _createNewFolder2 = _interopRequireDefault(_createNewFolder);

	var _fileUpload = __webpack_require__(84);

	var _fileUpload2 = _interopRequireDefault(_fileUpload);

	var _colors = __webpack_require__(51);

	var _snackBar = __webpack_require__(46);

	var _status = __webpack_require__(85);

	var _Prompt = __webpack_require__(73);

	var _Prompt2 = _interopRequireDefault(_Prompt);

	var _files = __webpack_require__(66);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import Alert from 'client/components/Prompt';

	// import NewFolderDialog from '../../components/NewFolderDialog';

	var Fab = function (_Component) {
	  _inherits(Fab, _Component);

	  function Fab(props, context) {
	    _classCallCheck(this, Fab);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Fab).call(this, props, context));

	    _this.toggleFab = function () {
	      _this.setState({
	        fabExpand: !_this.state.fabExpand
	      });
	    };

	    _this.triggerUploadFile = function () {
	      _this.uploader.click();
	    };

	    _this.doUploadFile = function (file) {
	      var _this$props$actions = _this.props.actions;
	      var uploadFile = _this$props$actions.uploadFile;
	      var openSnackBar = _this$props$actions.openSnackBar;
	      var startProgress = _this$props$actions.startProgress;
	      var endProgress = _this$props$actions.endProgress;


	      startProgress();
	      uploadFile(file).then(function (action) {
	        endProgress();

	        if (action.error) {
	          openSnackBar({
	            message: action.payload.message
	          });
	          return;
	        }

	        if (action.fatalError) {
	          openSnackBar({
	            message: '发生错误！'
	          });
	          return;
	        }
	      });
	    };

	    _this.createFolder = function () {
	      _this.setState({
	        isCreatingFolder: true
	      });
	    };

	    _this.handleCancelCreateFolder = function () {
	      _this.setState({
	        isCreatingFolder: false
	      });
	    };

	    _this.handleCreateFolder = function (name) {
	      var _this$props$actions2 = _this.props.actions;
	      var createFolder = _this$props$actions2.createFolder;
	      var openSnackBar = _this$props$actions2.openSnackBar;

	      createFolder(name).then(function (action) {
	        _this.setState({
	          isCreatingFolder: false
	        });

	        if (action.error) {
	          openSnackBar({
	            message: action.payload.message
	          });
	          return;
	        }

	        if (action.fatalError) {
	          openSnackBar({
	            message: '发生错误！'
	          });
	          return;
	        }
	      });
	    };

	    _this.handleActionResponse = function (cb) {
	      return function (action) {
	        var openSnackBar = _this.props.actions.openSnackBar;

	        if (action.error) {
	          openSnackBar({
	            message: action.payload.message
	          });
	          return;
	        }

	        if (action.fatalError) {
	          openSnackBar({
	            message: '发生错误！'
	          });
	          return;
	        }
	        cb && cb();
	      };
	    };

	    _this.state = {
	      fabExpand: false,
	      isCreatingFolder: false
	    };

	    _this.actions = [{ tooltip: '新建文件夹', icon: _react2.default.createElement(_createNewFolder2.default, null), action: _this.createFolder, id: 'folder' }, { tooltip: '上传文件', icon: _react2.default.createElement(_fileUpload2.default, null), action: _this.triggerUploadFile, id: 'file' }];
	    return _this;
	  }

	  _createClass(Fab, [{
	    key: 'getFabActions',
	    value: function getFabActions() {
	      var _this2 = this;

	      var primaryColor = this.context.muiTheme.palette.primary1Color;
	      return this.actions.map(function (action, index) {
	        var event = {};

	        var delay = 30 * (_this2.state.fabExpand ? _this2.actions.length - index : index);

	        if (action.action) {
	          event.onTouchTap = function () {
	            return _this2.setState({
	              fabExpand: false
	            }, action.action);
	          };
	        }

	        return _react2.default.createElement(
	          'div',
	          { className: _index2.default.action, style: { opacity: _this2.state.fabExpand ? 1 : 0.01 }, key: action.id },
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.tooltip, style: { transitionDelay: delay + 'ms' } },
	            action.tooltip
	          ),
	          _react2.default.createElement(
	            'div',
	            _extends({ className: _index2.default.button, style: { transitionDelay: delay + 'ms' } }, event),
	            _react2.default.createElement(
	              _FloatingActionButton2.default,
	              { mini: true, backgroundColor: '#fff', iconStyle: { fill: primaryColor } },
	              action.icon
	            )
	          )
	        );
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this3 = this;

	      this.uploader = window.document.createElement('input');
	      this.uploader.type = 'file';
	      this.uploader.addEventListener('change', function () {
	        _this3.doUploadFile(_this3.uploader.files[0]);
	        _this3.uploader.value = null;
	        return false;
	      }, false);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: this.state.fabExpand ? _index2.default.opened : _index2.default.closed },
	        _react2.default.createElement('div', { className: _index2.default.cover, style: { height: this.state.fabExpand ? '100vh' : 0 }, onTouchTap: this.toggleFab }),
	        _react2.default.createElement(
	          'div',
	          {
	            className: _index2.default.container,
	            style: {
	              position: 'fixed',
	              bottom: 23,
	              right: 23
	            }
	          },
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.actions },
	            this.getFabActions()
	          ),
	          _react2.default.createElement(
	            _FloatingActionButton2.default,
	            { onTouchTap: this.toggleFab, className: _index2.default.main },
	            _react2.default.createElement(_add2.default, null)
	          )
	        ),
	        _react2.default.createElement(_Prompt2.default, {
	          open: this.state.isCreatingFolder,
	          title: '新建文件夹',
	          label: '文件夹名字',
	          placeholder: '请输入合法的文件名',
	          onCancel: this.handleCancelCreateFolder,
	          onSubmit: this.handleCreateFolder
	        })
	      );
	    }
	  }]);

	  return Fab;
	}(_react.Component);

	Fab.propTypes = {
	  location: _react.PropTypes.object, // react-router 注入属性
	  children: _react.PropTypes.node
	};

	Fab.contextTypes = {
	  muiTheme: _react.PropTypes.object.isRequired
	};

	function mapStateToProps(state) {
	  return {};
	}

	function mapDispatchToProps(dispatch) {
	  return {
	    dispatch: dispatch,
	    actions: (0, _redux.bindActionCreators)({
	      createFolder: _files.createFolder,
	      uploadFile: _files.uploadFile,
	      openSnackBar: _snackBar.openSnackBar,
	      startProgress: _status.startProgress,
	      endProgress: _status.endProgress
	    }, dispatch)
	  };
	}

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Fab);

	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(Fab, 'Fab', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/views/Fab/index.js');

	  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/views/Fab/index.js');

	  __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/views/Fab/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Files/views/Fab/index.js');
	})();

	;

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = {
		"cover": "client-routes-Manage-routes-Files-views-Fab-style-index_cover_3JN",
		"closed": "client-routes-Manage-routes-Files-views-Fab-style-index_closed_JjS",
		"actions": "client-routes-Manage-routes-Files-views-Fab-style-index_actions_2Vm",
		"opened": "client-routes-Manage-routes-Files-views-Fab-style-index_opened_2iQ",
		"container": "client-routes-Manage-routes-Files-views-Fab-style-index_container_2Os",
		"button": "client-routes-Manage-routes-Files-views-Fab-style-index_button_22o",
		"action": "client-routes-Manage-routes-Files-views-Fab-style-index_action_2TG",
		"tooltip": "client-routes-Manage-routes-Files-views-Fab-style-index_tooltip_IUz",
		"main": "client-routes-Manage-routes-Files-views-Fab-style-index_main_3m9"
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = require("material-ui/FloatingActionButton");

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/content/add");

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/content/clear");

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/file/create-new-folder");

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/file/file-upload");

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.endProgress = exports.startProgress = undefined;

	var _StatusActionTypes = __webpack_require__(36);

	var _createAction = __webpack_require__(47);

	var _createAction2 = _interopRequireDefault(_createAction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var startProgress = exports.startProgress = (0, _createAction2.default)(_StatusActionTypes.START_PROGRESS, function (props) {
	  return props;
	});

	var endProgress = exports.endProgress = (0, _createAction2.default)(_StatusActionTypes.END_PROGRESS, function (props) {
	  return props;
	});
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(startProgress, 'startProgress', '/Users/mymomo/workspace/yunying/client/actions/status.js');

	  __REACT_HOT_LOADER__.register(endProgress, 'endProgress', '/Users/mymomo/workspace/yunying/client/actions/status.js');
	})();

	;

/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = require("material-ui/Checkbox");

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fullpath = exports.pageName = undefined;

	var _store = __webpack_require__(21);

	var _index = __webpack_require__(56);

	var pageName = 'edit';
	var path = 'edit';
	var fullpath = _index.fullpath + '/edit';

	var createRoute = function createRoute(store) {
	  return {
	    path: path,
	    getComponent: function getComponent(nextState, cb) {
	      var reducers = __webpack_require__(88).default;
	      (0, _store.injectAsyncReducer)(store, pageName, reducers);

	      if (true) {
	        cb(null, __webpack_require__(91).default);
	      } else {
	        require.ensure([], function (require) {
	          cb(null, require('./views/FileEditor').default);
	        }, 'manage/edit');
	      }
	    }
	  };
	};

	var _default = createRoute;
	exports.default = _default;
	exports.pageName = pageName;
	exports.fullpath = fullpath;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(pageName, 'pageName', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/index.js');

	  __REACT_HOT_LOADER__.register(path, 'path', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/index.js');

	  __REACT_HOT_LOADER__.register(fullpath, 'fullpath', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/index.js');

	  __REACT_HOT_LOADER__.register(createRoute, 'createRoute', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/index.js');
	})();

	;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(23);

	var _file = __webpack_require__(89);

	var _file2 = _interopRequireDefault(_file);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	  file: _file2.default
	});

	var _default = rootReducer;
	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(rootReducer, 'rootReducer', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/reducers/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/reducers/index.js');
	})();

	;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createReducer;

	exports.getFileContent = getFileContent;

	var _FileActionTypes = __webpack_require__(90);

	var _createReducer2 = __webpack_require__(31);

	var _createReducer3 = _interopRequireDefault(_createReducer2);

	var _index = __webpack_require__(87);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = {
	  name: undefined,
	  fullname: undefined,
	  ext: undefined,
	  content: ''
	};

	var _default = (0, _createReducer3.default)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _FileActionTypes.FETCH_FILE_CONTENT, function (state, action) {
	  return {
	    name: action.payload.name,
	    fullname: action.payload.fullname,
	    ext: action.payload.ext,
	    content: action.payload.content
	  };
	}), _defineProperty(_createReducer, _FileActionTypes.EDITOR_SAVE_FILE_CONTENT, function (state, action) {
	  return state;
	}), _createReducer));

	exports.default = _default;
	function getFileContent(state) {
	  return state[_index.pageName].file;
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(initialState, 'initialState', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/reducers/file.js');

	  __REACT_HOT_LOADER__.register(getFileContent, 'getFileContent', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/reducers/file.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/reducers/file.js');
	})();

	;

/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var FETCH_FILE_CONTENT = exports.FETCH_FILE_CONTENT = 'FETCH_FILE_CONTENT';
	var EDITOR_SAVE_FILE_CONTENT = exports.EDITOR_SAVE_FILE_CONTENT = 'EDITOR_SAVE_FILE_CONTENT';
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(FETCH_FILE_CONTENT, 'FETCH_FILE_CONTENT', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/constants/FileActionTypes.js');

	  __REACT_HOT_LOADER__.register(EDITOR_SAVE_FILE_CONTENT, 'EDITOR_SAVE_FILE_CONTENT', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/constants/FileActionTypes.js');
	})();

	;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(38);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(23);

	var _reactRedux = __webpack_require__(37);

	var _file = __webpack_require__(92);

	var _file2 = __webpack_require__(89);

	var _actionBar = __webpack_require__(93);

	var _IconButton = __webpack_require__(68);

	var _IconButton2 = _interopRequireDefault(_IconButton);

	var _done = __webpack_require__(95);

	var _done2 = _interopRequireDefault(_done);

	var _colors = __webpack_require__(51);

	var _snackBar = __webpack_require__(46);

	var _brace = __webpack_require__(96);

	var _brace2 = _interopRequireDefault(_brace);

	var _reactAce = __webpack_require__(97);

	var _reactAce2 = _interopRequireDefault(_reactAce);

	__webpack_require__(98);

	__webpack_require__(99);

	__webpack_require__(100);

	__webpack_require__(101);

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

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FileEditor).call(this, props, context));

	    _this.onChange = function (newValue) {
	      if (_this.originFileContent !== newValue) {
	        // file changed
	        _this.curFileContent = newValue;
	        _this.props.actions.setAactionBar({
	          iconElementRight: _this.saveBtn
	        });
	      } else {
	        // 没改变，隐藏保存图标
	        _this.props.actions.setAactionBar();
	      }
	    };

	    _this.saveFile = function () {
	      var _this$props = _this.props;
	      var _this$props$actions = _this$props.actions;
	      var saveFile = _this$props$actions.saveFile;
	      var openSnackBar = _this$props$actions.openSnackBar;
	      var setAactionBar = _this$props$actions.setAactionBar;
	      var fullname = _this$props.fullname;

	      saveFile({ filename: fullname, content: _this.curFileContent }).then(function () {
	        _this.originFileContent = _this.curFileContent;
	        setAactionBar();
	        openSnackBar({
	          message: '保存成功！'
	        });
	      }).catch(function () {
	        openSnackBar({
	          message: '保存失败！请重试！'
	        });
	      });
	    };

	    _this.originFileContent = props.content;

	    _this.saveBtn = _react2.default.createElement(
	      _IconButton2.default,
	      { onTouchTap: _this.saveFile },
	      _react2.default.createElement(_done2.default, { color: _colors.white })
	    );
	    return _this;
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
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.props.actions.setAactionBar();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.originFileContent = this.props.content;

	      return _react2.default.createElement(
	        'div',
	        { className: 'FileEditor' },
	        _react2.default.createElement(_reactAce2.default, {
	          name: 'Editor',
	          mode: getMode(this.props.ext),
	          theme: 'github',
	          value: this.props.content,
	          onChange: this.onChange,
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
	    name: file.name,
	    fullname: file.fullname,
	    ext: file.ext,
	    content: file.content
	  };
	}

	function mapDispatchToProps(dispatch) {
	  return {
	    dispatch: dispatch,
	    actions: (0, _redux.bindActionCreators)({
	      fetchFileContent: _file.fetchFileContent, saveFile: _file.saveFile,
	      setAactionBar: _actionBar.setAactionBar, openSnackBar: _snackBar.openSnackBar
	    }, dispatch)
	  };
	}

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FileEditor);

	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(getMode, 'getMode', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/views/FileEditor/index.js');

	  __REACT_HOT_LOADER__.register(FileEditor, 'FileEditor', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/views/FileEditor/index.js');

	  __REACT_HOT_LOADER__.register(ssrGetFileContent, 'ssrGetFileContent', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/views/FileEditor/index.js');

	  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/views/FileEditor/index.js');

	  __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/views/FileEditor/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/views/FileEditor/index.js');
	})();

	;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.saveFile = exports.fetchFileContent = undefined;

	var _FileActionTypes = __webpack_require__(90);

	var _createAction = __webpack_require__(47);

	var _createAction2 = _interopRequireDefault(_createAction);

	var _fetch = __webpack_require__(63);

	var _fetch2 = _interopRequireDefault(_fetch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var fetchFileContent = exports.fetchFileContent = (0, _createAction2.default)(_FileActionTypes.FETCH_FILE_CONTENT, function (filename) {
	  return (0, _fetch2.default)('files/' + encodeURIComponent(filename) + '?format=text');
	});

	var saveFile = exports.saveFile = (0, _createAction2.default)(_FileActionTypes.EDITOR_SAVE_FILE_CONTENT, function (_ref) {
	  var filename = _ref.filename;
	  var content = _ref.content;
	  return (0, _fetch2.default)('files/' + encodeURIComponent(filename), {
	    method: 'PUT',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({ content: content })
	  });
	});
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(fetchFileContent, 'fetchFileContent', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/actions/file.js');

	  __REACT_HOT_LOADER__.register(saveFile, 'saveFile', '/Users/mymomo/workspace/yunying/client/routes/Manage/routes/Edit/actions/file.js');
	})();

	;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setAactionBar = undefined;

	var _ActionBarActionTypes = __webpack_require__(94);

	var _createAction = __webpack_require__(47);

	var _createAction2 = _interopRequireDefault(_createAction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var setAactionBar = exports.setAactionBar = (0, _createAction2.default)(_ActionBarActionTypes.SET_ACTIONBAR_ELEMENT, function () {
	  var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  return props;
	});
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(setAactionBar, 'setAactionBar', '/Users/mymomo/workspace/yunying/client/routes/Manage/actions/actionBar.js');
	})();

	;

/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SET_ACTIONBAR_ELEMENT = exports.SET_ACTIONBAR_ELEMENT = 'SET_ACTIONBAR_ELEMENT';
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(SET_ACTIONBAR_ELEMENT, 'SET_ACTIONBAR_ELEMENT', '/Users/mymomo/workspace/yunying/client/routes/Manage/constants/ActionBarActionTypes.js');
	})();

	;

/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/action/done");

/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = require("brace");

/***/ },
/* 97 */
/***/ function(module, exports) {

	module.exports = require("react-ace");

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = require("brace/mode/javascript");

/***/ },
/* 99 */
/***/ function(module, exports) {

	module.exports = require("brace/mode/html");

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = require("brace/mode/css");

/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = require("brace/theme/github");

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(23);

	var _meta = __webpack_require__(103);

	var _meta2 = _interopRequireDefault(_meta);

	var _actionBar = __webpack_require__(105);

	var _actionBar2 = _interopRequireDefault(_actionBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	  meta: _meta2.default,
	  actionBar: _actionBar2.default
	});

	var _default = rootReducer;
	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(rootReducer, 'rootReducer', '/Users/mymomo/workspace/yunying/client/routes/Manage/reducers/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/reducers/index.js');
	})();

	;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.getMeta = getMeta;

	var _MetaActionTypes = __webpack_require__(104);

	var _createReducer2 = __webpack_require__(31);

	var _createReducer3 = _interopRequireDefault(_createReducer2);

	var _index = __webpack_require__(56);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = {
	  basePath: undefined
	};

	var _default = (0, _createReducer3.default)(initialState, _defineProperty({}, _MetaActionTypes.FETCH_BASE_PATH, function (state, action) {
	  return _extends({}, state, {
	    basePath: action.payload.data
	  });
	}));

	exports.default = _default;
	function getMeta(state) {
	  return state[_index.pageName].meta;
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(initialState, 'initialState', '/Users/mymomo/workspace/yunying/client/routes/Manage/reducers/meta.js');

	  __REACT_HOT_LOADER__.register(getMeta, 'getMeta', '/Users/mymomo/workspace/yunying/client/routes/Manage/reducers/meta.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/reducers/meta.js');
	})();

	;

/***/ },
/* 104 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var FETCH_BASE_PATH = exports.FETCH_BASE_PATH = 'FETCH_BASE_PATH';
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(FETCH_BASE_PATH, 'FETCH_BASE_PATH', '/Users/mymomo/workspace/yunying/client/routes/Manage/constants/MetaActionTypes.js');
	})();

	;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getActionBarProps = getActionBarProps;

	var _ActionBarActionTypes = __webpack_require__(94);

	var _createReducer2 = __webpack_require__(31);

	var _createReducer3 = _interopRequireDefault(_createReducer2);

	var _index = __webpack_require__(56);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = {};

	var _default = (0, _createReducer3.default)(initialState, _defineProperty({}, _ActionBarActionTypes.SET_ACTIONBAR_ELEMENT, function (state, action) {
	  return action.payload;
	}));

	exports.default = _default;
	function getActionBarProps(state) {
	  return state[_index.pageName].actionBar;
	}
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(initialState, 'initialState', '/Users/mymomo/workspace/yunying/client/routes/Manage/reducers/actionBar.js');

	  __REACT_HOT_LOADER__.register(getActionBarProps, 'getActionBarProps', '/Users/mymomo/workspace/yunying/client/routes/Manage/reducers/actionBar.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/reducers/actionBar.js');
	})();

	;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(107);

	var _index2 = _interopRequireDefault(_index);

	var _react = __webpack_require__(38);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(23);

	var _reactRedux = __webpack_require__(37);

	var _actionBar = __webpack_require__(93);

	var _actionBar2 = __webpack_require__(105);

	var _meta = __webpack_require__(108);

	var _meta2 = __webpack_require__(103);

	var _AppBar = __webpack_require__(109);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _Drawer = __webpack_require__(110);

	var _Drawer2 = _interopRequireDefault(_Drawer);

	var _MenuItem = __webpack_require__(71);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _history = __webpack_require__(26);

	var _history2 = _interopRequireDefault(_history);

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
	    key: 'goHme',


	    // getAppBarProps() {
	    //   const menu = {};
	    //   const { rightMenu, title } = this.props.appBar;
	    //   if (rightMenu) {
	    //     menu.iconElementRight = rightMenu.element;
	    //   }

	    //   if (title) {
	    //     menu.title = title.text;
	    //     menu.onTitleTouchTap = title.onTouchTap;
	    //   }

	    //   return menu;
	    // }

	    value: function goHme() {
	      _history2.default.push('/manage/files');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var appBar = this.props.appBar;
	      return _react2.default.createElement(
	        'div',
	        { className: 'Manage' },
	        _react2.default.createElement(_AppBar2.default, _extends({
	          title: 'Cloud File',
	          onTitleTouchTap: this.goHme,
	          onLeftIconButtonTouchTap: this.handleToggle
	        }, appBar)),
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
	          (0, _react.cloneElement)(this.props.children, { basePath: this.props.meta.basePath })
	        )
	      );
	    }
	  }]);

	  return Manage;
	}(_react.Component);

	Manage.propTypes = {
	  location: _react.PropTypes.object, // react-router 注入属性
	  children: _react.PropTypes.node,
	  appBar: _react.PropTypes.any };

	Manage.need = [ssrGetBasePath];

	function ssrGetBasePath(location) {
	  return (0, _meta.fetchBasePath)();
	}

	function mapStateToProps(state) {
	  return {
	    appBar: (0, _actionBar2.getActionBarProps)(state),
	    meta: (0, _meta2.getMeta)(state)
	  };
	}

	function mapDispatchToProps(dispatch) {
	  return {
	    dispatch: dispatch,
	    actions: (0, _redux.bindActionCreators)({ setAactionBar: _actionBar.setAactionBar }, dispatch)
	  };
	}

	var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Manage);

	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(Manage, 'Manage', '/Users/mymomo/workspace/yunying/client/routes/Manage/views/Manage/index.js');

	  __REACT_HOT_LOADER__.register(ssrGetBasePath, 'ssrGetBasePath', '/Users/mymomo/workspace/yunying/client/routes/Manage/views/Manage/index.js');

	  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/mymomo/workspace/yunying/client/routes/Manage/views/Manage/index.js');

	  __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/mymomo/workspace/yunying/client/routes/Manage/views/Manage/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mymomo/workspace/yunying/client/routes/Manage/views/Manage/index.js');
	})();

	;

/***/ },
/* 107 */
/***/ function(module, exports) {

	

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchBasePath = undefined;

	var _MetaActionTypes = __webpack_require__(104);

	var _createAction = __webpack_require__(47);

	var _createAction2 = _interopRequireDefault(_createAction);

	var _fetch = __webpack_require__(63);

	var _fetch2 = _interopRequireDefault(_fetch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var fetchBasePath = exports.fetchBasePath = (0, _createAction2.default)(_MetaActionTypes.FETCH_BASE_PATH, function (file) {
	  return (0, _fetch2.default)('basePath');
	});
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(fetchBasePath, 'fetchBasePath', '/Users/mymomo/workspace/yunying/client/routes/Manage/actions/meta.js');
	})();

	;

/***/ },
/* 109 */
/***/ function(module, exports) {

	module.exports = require("material-ui/AppBar");

/***/ },
/* 110 */
/***/ function(module, exports) {

	module.exports = require("material-ui/Drawer");

/***/ }
/******/ ]);