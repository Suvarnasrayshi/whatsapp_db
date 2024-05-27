'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      contact.belongsTo(models.user, { foreignKey: 'user_id' });
      contact.belongsTo(models.user, { foreignKey: 'contact_user_id'});
    }
  }
  contact.init({
    user_id: DataTypes.INTEGER,
    contact_user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true 
    }
  }, {
    sequelize,
    modelName: 'contact',
    paranoid: true,
  });
  return contact;
};






