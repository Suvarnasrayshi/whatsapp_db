'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groupmessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      groupmessage.belongsTo(models.group, { foreignKey: 'group_id' });

      groupmessage.belongsTo(models.user, { foreignKey: 'sender_id' });
    }
  }
  groupmessage.init({
    group_id: DataTypes.INTEGER,
    sender_id: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'groupmessage',
    paranoid: true,
  });
  return groupmessage;
};