const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

/**
 * 检测是否存在并且是 file
 * @param  {[type]} filename [description]
 * @return {[type]}          [description]
 */
export function isFileExist(filename) {
  return new Promise((resolve, reject) => {
    fs.stat(filename, function(err, stat) {
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
export function isFolderExist(filename) {
  return new Promise((resolve, reject) => {
    fs.stat(filename, function(err, stat) {
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
export function getFileStats(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, function(err, stat) {
      if (err) reject(err);
      resolve(Object.assign({}, stat, {
        name: path.basename(file),
        fullname: file,
        file: stat.isFile(),
        directory: stat.isDirectory(),
      }));
    });
  });
};

export function getDirFileStats(dir, done) {
  const dirStat = getFileStats(dir)
    .then(stat => ({
      ...stat,
      parent: path.join(dir, '..'),
    }));
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    const readStats = list.map(file =>
      new Promise((resolve, reject) => {
        file = path.resolve(dir, file);
        fs.stat(file, function(err, stat) {
          if (err) reject(err);
          resolve(Object.assign({}, stat, {
            name: path.basename(file),
            fullname: file,
            file: stat.isFile(),
            directory: stat.isDirectory(),
          }));
        });
      })
    );

    Promise
      .all([dirStat].concat(readStats))  
      .then(results => {
        const [dir, ...children] = results;
        done(null, { ...dir, children });
      })
      .catch(err => done(err));
  });
};

export function createFolder(filename, content) {
  return isFolderExist(filename)
    .then(isExist => {
      if (isExist) {
        throw new Error('文件夹已存在！');
      }

      return new Promise((resolve, reject) => {
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

export function getFileContent(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.toString());
    });
  });
}

export function saveFile(filename, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, content, 'utf-8', function (err) {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
}

export function rename(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(newPath);
    });
  });
}

export function zipDirectory(dir) {
  const archive = archiver.create('zip', {}); 

  archive.on('error', function(err){
    throw err;
  });
  archive.directory(dir);
  archive.finalize();
  return archive;
};
