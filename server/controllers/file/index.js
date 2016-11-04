import express from 'express';
import util from 'util';
import * as fileUtil from '../../services/file';
import paramsRoute from '../../util/paramsRoute';
import config from '../../config';
import { argv } from 'optimist';
import mime from 'mime';
import path from 'path';
import bodyParser from 'body-parser';
import formidable from 'formidable';

let basePath = argv.basePath !== undefined ? argv.basePath : config.basePath;
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
  let filenames = [req.query, req.body]
    .map(body => (body ? body.filename : undefined))
    .filter(param => param !== undefined);
  let violates = [];
  violates = filenames.filter(filename => filename !== undefined && !(filename.indexOf(basePath) === 0 || filename === '<default>'));

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
  let filename = req.params.filename;
  if (filename === '<default>') {
    filename = basePath;
  }

  fileUtil.getDirFileStats(filename, (err, results) => {
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
  const directoryPath = path.join(req.params.filename, req.query.name);
  fileUtil
    .createFolder(directoryPath)
    .then(() => fileUtil.getFileStats(directoryPath))
    .then(stat => res.send(stat))
    .catch(err => next(err))
}

/**
 * 得到文件内容
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function getFileConent(req, res, next) {
  fileUtil
    .getFileStats(req.params.filename)
    .then(stat => {
      if (stat.directory) {
        next(new Error('文件类型不正确'));
      } else {
        fileUtil.getFileContent(stat.fullname)
          .then(data =>
            res.send({
              name: stat.name,
              fullname: stat.fullname,
              ext: path.extname(stat.name),
              content: data,
            })
          );
      }
    })
    .catch(err => next(err));
}

function saveFile(req, res, next) {
  const filename = req.params.filename;
  fileUtil
    .isFileExist(filename)
    .then(isExist => {
      if (!isExist) {
        next(new Error('文件不存在！'));
        return;
      }

      fileUtil
        .saveFile(filename, req.body.content)
        .then(() =>
          res.send({ code: 200 })
        )
        .catch(err => next(err));
    });
}

function newFile(req, res, next) {
  const filename = req.params.filename;
  fileUtil
    .isFileExist(filename)
    .then(isExist => {
      if (isExist) {
        next(new Error('文件已存在！'));
        return;
      }

      fileUtil
        .saveFile(filename, req.body.content)
        .then(() =>
          res.send({ code: 200 })
        )
        .catch(err => next(err));
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
  const oriPath = req.params.filename;
  const newName = req.query.name;
  const directory = path.dirname(oriPath);
  const destPath = path.join(directory, newName);
  fileUtil.rename(oriPath, destPath)
      .then(() => res.send({
        name: newName,
        fullname: destPath,
      }))
      .catch(err => next(err));
}

function uploadFile(req, res, next) {
  const basePath = req.params.filename;

  const form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    const file = files.file;
    if (!file) {
      return next(new Error('缺少参数!'));
    }
    fileUtil.rename(file.path, path.join(basePath, file.name))
      .then(filePath => fileUtil.getFileStats(filePath))
      .then(stat => res.send(stat))
      .catch(err => next(err));
  });

}

function downLoadFile(req, res, next) {
  fileUtil
    .getFileStats(req.params.filename)
    .then(stat => {
      if (stat.directory) {
        try {
          const zip = fileUtil.zipDirectory(stat.fullname)
          res.set('Content-Type', 'application/zip')
          res.set('Content-Disposition', `attachment; filename=${stat.name}.zip`);
          zip.pipe(res);
        } catch (error) {
          next(error)
        } 
      } else {
        res.set('Content-Type', mime.lookup(stat.fullname))
        res.set('Content-Disposition', `attachment; filename=${stat.name}`);
        res.sendFile(stat.fullname)
      }
    });
}

const router = new express.Router();

// 安全检查
router.param('filename', checkParamsPath)
// 安全检查
router.use(checkQueryPath);

// router.use('/files/:filename', checkPath);

// router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

// replace assets
const filesRoute = new paramsRoute();
filesRoute.add('format=file', downLoadFile);
filesRoute.add('children', getDirtoryFilesInfo);
filesRoute.add('format=text', getFileConent);

router.route('/files/:filename')
  .get(filesRoute.route())
  .put(saveFile)
  .post(newFile);

router.route('/files/:filename/directory')
  .post(newFolder);

router.route('/files/:filename/upload')
  .post(uploadFile);

router.route('/files/:filename/rename')
  .post(renameFile);

router.route('/basePath')
  .get(getBasePath);

export default router;


