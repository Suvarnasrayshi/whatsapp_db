'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
          notEmpty: true,
          len: [3, 50],
        },
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
          notEmpty: true,
          len: [10],
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          isEmail: true, 
        }
      },
      password: {
        type: Sequelize.STRING,
        // set(value) {
        //   this.setDataValue('password', hash(value));
        // },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true 
      }
     });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};