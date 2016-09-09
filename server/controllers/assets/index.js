import express from 'express';
import formidable from 'formidable';

/**
 * 替换置顶的服务器资源
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function replaceAssets(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    // res.writeHead(200, {'content-type': 'text/plain'});
    // res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
  });
}

const router = new express.Router();

// replace assets
router.route('/assets').put(replaceAssets);

export default router;
