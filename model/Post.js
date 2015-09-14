module.exports = function(sequelize, DataTypes) {

  var Post = sequelize.define('post', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    subtitle: {
      type: DataTypes.STRING,
      allowNull: false
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  });

  return Post;
};
