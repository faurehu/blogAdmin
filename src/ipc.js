import ipc from 'ipc';
import traverse from 'traverse';
import fs from 'fs';
import marked from 'marked-ast';
import Upload from 's3-uploader';

let client = new Upload('faurephoto', {
  aws: {
    region: 'us-west-2',
    acl: 'public-read'
  },

  original: {
    awsImageAcl: 'private'
  },

  cleanup: {
    original: false,
    versions: true
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
    client.upload(path, {}, (err, versions) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          old: path,
          large: versions[0].url,
          medium: versions[1].url,
          small: versions[2].url,
          thumb: versions[3].url,
          width: versions[0].width,
          height: versions[0].height
        });
      }
    });
  });
};

let traverseTree = (tree) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    traverse(tree).forEach((node) => {
      if(!Array.isArray(node) && typeof node === 'object' && node !== null
        && node.type === 'image') {
        try {
          let stats = fs.statSync(node.href);
          if (stats.isFile()) {
            promises.push(uploadImage(node.href));
          }
        } catch (e) {
          return;
        }
      }
    });
    Promise.all(promises).then(resolve).catch(reject);
  });
};

let parsePost = (post) => {

  let ast = marked.parse(post.content);

  let replaceURL = (strings) => {
    return new Promise((resolve) => {
      post.content = post.content.replace(strings.old, strings.medium);
      resolve();
    });
  };

  let replace = (array) => {
    return new Promise((resolve, reject) => {
      let replacePromises = [];
      array.forEach((node) => {
        replacePromises.push(replaceURL(node));
      });
      Promise.all(replacePromises)
      .then(() => {
        return post;
      })
      .then(resolve).catch(reject);
    });
  };

  return new Promise((resolve, reject) => {
    traverseTree(ast).then(replace).then(resolve).catch(reject);
  });
};

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

  let findImage = (arg) => {
    return new Promise((resolve, reject) => {
      sequelize.Image.findById(arg.id).then(resolve).catch(reject);
    });
  };

  let uploadSingleImage = (arg) => {

    let saveImage = (paths) => {
      return new Promise((resolve, reject) => {
        let image = arg;
        image.local = null;
        image.small = paths.small;
        image.thumb = paths.thumb;
        image.large = paths.large;
        image.medium = paths.medium;
        image.width = paths.width;
        image.height = paths.height;
        sequelize.Image.create(image).then(resolve).catch(reject);
      });
    };

    return new Promise((resolve, reject) => {
      uploadImage(arg.local).then(saveImage).then(resolve).catch(reject);
    });
  };

  let destroySingleImage = (arg) => {

    let destroy = (data) => {
      data.destroy();
    };

    return new Promise((resolve, reject) => {
      findImage(arg).then(destroy).then(resolve).then(reject);
    });
  };

  let editSingleImage = (arg) => {

    let update = (data) => {
      return new Promise((resolve, reject) => {
        data.updateAttributes({
          caption: arg.edit
        }).then(resolve).catch(reject);
      });
    };
    return new Promise((resolve, reject) => {
      findImage(arg).then(update).then(resolve).catch(reject);
    });
  };

  let handleImages = (arg) => {
    return new Promise((resolve, reject) => {
      let promises = [];
      arg.forEach((image) => {
        if(image.delete) {
          promises.push(destroySingleImage(image));
        } else if (image.edit && image.content !== image.edit) {
          promises.push(editSingleImage(image));
        } else if (image.local) {
          promises.push(uploadSingleImage(image));
        }
      });
      Promise.all(promises).then(resolve).catch(reject);
    });
  };

  ipc.on('post-submit', (event, arg) => {

    let success = () => {
      event.sender.send('post-submit-reply', 'success');
    };

    let error = (err) => {
      console.log(err);
    };

    parsePost(arg).then(submitPost).then(success).catch(error);
  });

  ipc.on('fetch-all-posts', (event) => {

    let success = (data) => {
      event.sender.send('posts-fetched', data);
    };

    let error = (err) => {
      console.log(err);
    };

    sequelize.Post.findAll().then(success).catch(error);
  });

  ipc.on('fetch-post', (event, arg) => {

    let success = (data) => {
      event.sender.send('post-fetched', data);
    };

    let error = (err) => {
      console.log(err);
    };

    sequelize.Post.findById(arg).then(success).catch(error);
  });

  ipc.on('delete-post', (event, arg) => {

    let success = () => {
      event.sender.send('post-deleted', 'success');
    };

    let error = (err) => {
      console.log(err);
    };

    let found = (data) => {
      data.destroy().then(success).catch(error);
    };

    sequelize.Post.findById(arg).then(found).catch(error);
  });

  ipc.on('update-post', (event, arg) => {

    let success = () => {
      event.sender.send('post-updated', 'success');
    };

    let error = (err) => {
      console.log(err);
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

    let error = (err) => {
      console.log(err);
    };

    sequelize.Image.findAll().then(success).catch(error);
  });

  ipc.on('save-images', (event, arg) => {

    let success = () => {
      sequelize.Image.findAll().then((data) => {
        event.sender.send('images-saved', data);
      });
    };

    let error = (err) => {
      console.log(err);
    };

    handleImages(arg).then(success).catch(error);
  });

};
