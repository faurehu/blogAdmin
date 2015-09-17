import ipc from 'ipc';

let error = (err) => { console.log(err); };

export default (sequelize) => {

  ipc.on('post-submit', function(event, arg) {

    let success = () => {
      event.sender.send('post-submit-reply', 'success');
    };

    sequelize.Post.create(arg).then(success).catch(error);

  });

  ipc.on('fetch-all-posts', function(event) {

    let success = (data) => {
      event.sender.send('posts-fetched', data);
    };

    sequelize.Post.findAll().then(success).catch(error);

  });

  ipc.on('fetch-post', function(event, arg) {

    let success = (data) => {
      event.sender.send('post-fetched', data);
    };

    sequelize.Post.findById(arg).then(success).catch(error);

  });

};
