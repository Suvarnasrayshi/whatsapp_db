'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    phoneNumber: DataTypes.INTEGER,
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
      },
    }
  });
  return user;
};