const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.img_publicKey,
  privateKey: process.env.img_privateKey,
  urlEndpoint: process.env.img_urlEndpoint,
});

module.exports = imagekit;