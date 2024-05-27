'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.message, { foreignKey: 'sender_id' });
      user.hasMany(models.message, { foreignKey: 'receiver_id' });
      // Define association with Contact
      user.hasMany(models.contact, { foreignKey: 'user_id' });
      user.hasMany(models.contact, { foreignKey: 'contact_user_id' });

      user.hasMany(models.groupuser, { foreignKey: 'user_id'});
      user.belongsToMany(models.group, { through: 'groupuser', foreignKey: 'userId'});
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
  },{
    sequelize,
    modelName: 'user',
    paranoid: true,
    hooks: {
      beforeCreate: (user) => {
        user.username = user.username.toLowerCase();
        if (user.password) {
          const salt = bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
         }
      },
    }
  });
  return user;
};