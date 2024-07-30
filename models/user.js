'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.message, { as: 'Sender', foreignKey: 'sender_id' });
      user.hasMany(models.message, { as: 'Receiver', foreignKey: 'receiver_id' });
      // Define association with Contact
      user.hasMany(models.contact, { foreignKey: 'user_id' });
      user.hasMany(models.contact, { foreignKey: 'contact_user_id' });

      user.hasMany(models.groupuser, { foreignKey: 'user_id' });
      user.belongsToMany(models.group, { through: 'groupuser', foreignKey: 'user_id' });

      user.hasMany(models.session, {
        foreignKey: 'user_id', onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  user.init({
    username: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'user',
    paranoid: true,
    hooks: {
      beforeCreate: (user) => {
        user.username = user.username.toLowerCase();
      },
    }
  });
  return user;
};