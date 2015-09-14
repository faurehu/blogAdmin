import ipc from 'ipc';

export default (sequelize) => {

  ipc.on('post-submit', function(event, arg) {

    console.log(arg);

    let success = () => {
      event.sender.send('post-submit-reply', 'success');
    };

    let error = (err) => { console.log(err); };

    sequelize.Post.create(arg).then(success).catch(error);

  });

};
