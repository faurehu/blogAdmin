import ipc from 'ipc';
import parsePost from './postParser';

let error = (err) => { console.log(err); };

export default (sequelize) => {

  let submitPost = (post) => {
    return new Promise((resolve, reject) => {
      sequelize.Post.create(post).then(resolve).catch(reject);
    });
  };

  let findPost = (arg) => {
    return new Promise((resolve, reject) => {
      sequelize.Post.findById(arg.id).then(resolve).catch(reject);
    });
  };

  ipc.on('post-submit', (event, arg) => {

    let success = () => {
      event.sender.send('post-submit-reply', 'success');
    };

    parsePost(arg).then(submitPost).then(success).catch(error);

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

    parsePost(arg).then(findPost).then(found).catch(error);

  });

  ipc.on('fetch-all-images', (event) => {

    let success = (data) => {
      event.sender.send('images-fetched', data);
    };

    sequelize.Image.findAll().then(success).catch(error);
  });

};
