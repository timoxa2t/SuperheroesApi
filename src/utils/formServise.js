const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const formidable = require('formidable');

const parseForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        res.end(String(err));
  
        reject(err)
      }

      const superhero = { ...fields };
  
      const { filepath, originalFilename } = files.image;
      const fileParts = originalFilename.split('.');
      const newFilename = [uuid.v4(), fileParts.slice(-1)].join('.');

      superhero.image = `img/${newFilename}`;

      const readStream = fs.createReadStream(filepath);
      const writeStream = fs.createWriteStream(path.join(
        __dirname,
        '..',
        '..',
        'public',
        'img',
        newFilename,
      ));

      readStream.pipe(writeStream);

      readStream.on('end', () => {
        resolve(superhero);
      })
    });
  })
}

module.exports = {
  parseForm
}