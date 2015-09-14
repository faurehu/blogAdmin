import ipc from 'ipc';

export default (sequelize) => {

  ipc.on('post-submit', function(event, arg) {

    let success = () => {
      event.sender.send('post-submit-reply', 'success');
    };

    let error = (err) => { console.log(err); };

    sequelize.Post.create(arg).then(success).catch(error);

  });

  ipc.on('fetch-all-posts', function(event) {

    let success = (data) => {
      event.sender.send('posts-fetched', data);
    };

    let error = (err) => { console.log(err); };

    sequelize.Post.findAll().then(success).catch(error);

  });

};
