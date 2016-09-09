import express from 'express';
import * as fileUtil from '../../services/file';
import paramsRoute from '../../util/paramsRoute';
import config from '../../config';
import { argv } from 'optimist';
import mime from 'mime';
import path from 'path';

let basePath = argv.basePath !== undefined ? argv.basePath : config.basePath;
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
  let fiename = req.params.fiename;
  if (fiename === '<default>') {
    fiename = basePath;
  }

  fileUtil.getDirFileStats(fiename, (err, results) => {
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
  fileUtil
    .getFileStats(req.params.fiename)
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
    });
}

function downLoadFile(req, res, next) {
  fileUtil
    .getFileStats(req.params.fiename)
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
router.param('fiename', checkPath)
// router.use('/files/:fiename', checkPath);

// replace assets
const filesRoute = new paramsRoute();
filesRoute.add('format=file', downLoadFile);
filesRoute.add('children', getDirtoryFilesInfo);
filesRoute.add('format=text', getFileConent);

router.route('/files/:fiename')
  .get(filesRoute.route());

router.route('/basePath')
  .get(getBasePath);

export default router;


