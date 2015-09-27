import Upload from 's3-uploader';
import fs from 'fs';

let client = new Upload('faurephoto', {
  aws: {
    region: 'us-west-2',
    acl: 'public-read'
  },

  original: {
    awsImageAcl: 'private'
  },

  versions: [{
    maxHeight: 1040,
    maxWidth: 1040,
    format: 'jpg',
    suffix: '-large',
    quality: 80
  }, {
    maxWidth: 780,
    aspect: '3:2!h',
    suffix: '-medium'
  }, {
    maxWidth: 320,
    aspect: '16:9!h',
    suffix: '-small'
  }, {
    maxHeight: 100,
    aspect: '1:1',
    format: 'png',
    suffix: '-thumb'
  }]
});

let uploadImage = (path) => {
  return new Promise((resolve, reject) => {
    fs.exists(path, (exists) => {
      if(exists) {
        client.upload(path, {}, (err, versions) => {
          if (err) {
            reject(err);
          } else {
            resolve({old: path, new: versions[1].url});
          }
        });
      } else {
        reject('Path is invalid');
      }
    });
  });
};

module.exports = uploadImage;
