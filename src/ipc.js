import ipc from 'ipc';

export default (sequelize) => {

  ipc.on('post-submit', function(event, arg) {
    console.log(arg);
    event.sender.send('post-submit-reply', 'success');
  });

};
