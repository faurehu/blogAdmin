import Upload from 's3-uploader';

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

module.exports = client;

// client.upload(path, {}, function(err, versions) {
//   if (err) { throw err; }
//
//   versions.forEach(function(image) {
//     console.log(image.width, image.height, image.url);
//   });
// });
