'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groupuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      groupuser.belongsTo(models.User, { foreignKey: 'user_id'});
      groupuser.belongsTo(models.group, { foreignKey: 'group_id'});
    }
  }
  groupuser.init({
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'groupuser',
    paranoid: true,
  });
  return groupuser;
};