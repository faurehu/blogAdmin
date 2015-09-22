import ipc from 'ipc';

let error = (err) => { console.log(err); };

export default (sequelize) => {

  ipc.on('post-submit', (event, arg) => {

    let success = () => {
      event.sender.send('post-submit-reply', 'success');
    };

    sequelize.Post.create(arg).then(success).catch(error);

  });

  ipc.on('fetch-all-posts', (event) => {

    let success = (data) => {
      event.sender.send('posts-fetched', data);
    };

    sequelize.Post.findAll().then(success).catch(error);

  });

  ipc.on('fetch-post', (event, arg) => {

    let success = (data) => {
      event.sender.send('post-fetched', data);
    };

    sequelize.Post.findById(arg).then(success).catch(error);

  });

  ipc.on('delete-post', (event, arg) => {

    let success = () => {
      event.sender.send('post-deleted', 'success');
    };

    let found = (data) => {
      data.destroy().then(success).catch(error);
    };

    sequelize.Post.findById(arg).then(found).catch(error);

  });

  ipc.on('update-post', function(event, arg) {

    let success = () => {
      event.sender.send('post-updated', 'success');
    };

    let found = (data) => {
      data.updateAttributes({
        title: arg.title,
        subtitle: arg.subtitle,
        content: arg.content
      }).then(success).catch(error);
    };

    sequelize.Post.findById(arg.id).then(found).catch(error);

  });

};
