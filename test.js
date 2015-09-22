import AWS from 'aws-sdk';

var s3 = new AWS.S3();

s3.listObjects({ Bucket: 'faurephoto'}, (err, data) => {
  if (err) { console.log(err); }
  else {
    console.log(data);
  }
});
