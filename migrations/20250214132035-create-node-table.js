module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Node", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      position_x: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      position_y: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
     
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Node");
  },
};
