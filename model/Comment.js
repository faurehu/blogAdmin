module.exports = function(sequelize, DataTypes) {

  var Comment = sequelize.define('comment', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  });

  return Comment;
};
