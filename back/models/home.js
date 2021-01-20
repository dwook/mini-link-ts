'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Home extends Model {
    static associate({ User, Visit }) {
      this.belongsTo(User);
      this.hasMany(Visit);
    }
  }
  Home.init(
    {
      coverImage: DataTypes.STRING,
      mainColor: DataTypes.STRING,
      introduction: DataTypes.STRING,
      instagram: DataTypes.STRING,
      youtube: DataTypes.STRING,
      website: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Home',
      tableName: 'homes',
      charset: 'utf8',
    }
  );
  return Home;
};
