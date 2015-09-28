module.exports = function(sequelize, DataTypes) {

  var Image = sequelize.define('image', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    caption: {
      type: DataTypes.TEXT
    },

    thumb: {
      type: DataTypes.STRING
    },

    large: {
      type: DataTypes.STRING
    },

    medium: {
      type: DataTypes.STRING
    },

    small: {
      type: DataTypes.STRING
    }

  });

  return Image;
};
