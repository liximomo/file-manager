const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

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

export function zipDirectory(dir) {
  const archive = archiver.create('zip', {}); 

  archive.on('error', function(err){
    throw err;
  });
  archive.directory(dir);
  archive.finalize();
  return archive;
};
