'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      message.belongsTo(models.user, { as: 'Sender', foreignKey: 'sender_id' });
      message.belongsTo(models.user, { as: 'Receiver',foreignKey: 'receiver_id' });
    }
  }
  message.init({
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true 
    }
  }, {
    sequelize,
    modelName: 'message',
    paranoid: true,
  });
  return message;
};