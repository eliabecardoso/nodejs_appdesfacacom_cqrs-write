"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Products", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      stateCondition: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      enable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("products");
  }
};
