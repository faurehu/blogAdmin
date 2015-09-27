import traverse from 'traverse';
import marked from 'marked-ast';
import uploadImage from './uploader';

let traverseTree = (tree) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    traverse(tree).forEach((node) => {
      if(!Array.isArray(node) && typeof node === 'object' && node !== null
        && node.type === 'image') {
        promises.push(uploadImage(node.href));
      }
    });
    Promise.all(promises).then(resolve).catch(reject);
  });
};

let parsePost = (post) => {

  let ast = marked.parse(post.content);

  let replaceURL = (strings) => {
    return new Promise((resolve) => {
      post.content = post.content.replace(strings.old, strings.new);
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

module.exports = parsePost;
