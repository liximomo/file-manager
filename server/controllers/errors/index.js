export const errorPage = (err, req, res, next) => {
  const softTab = '&#32;&#32;&#32;&#32;';
  console.log(err)
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  res.status(500).send(`Server Error${errTrace}`);
};