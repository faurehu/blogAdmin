module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.changeColumn(
      'images',
      'caption',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
  }
};
