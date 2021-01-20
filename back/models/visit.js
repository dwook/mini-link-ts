'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Home, Link }) {
      this.belongsTo(Home);
      this.belongsTo(Link);
    }
    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  User.init(
    {
      requestId: DataTypes.STRING,
      country: DataTypes.STRING(20),
      lat: DataTypes.DECIMAL(11, 8),
      long: DataTypes.DECIMAL(11, 8),
      r1: DataTypes.STRING(20),
      r2: DataTypes.STRING(20),
      r3: DataTypes.STRING(20),
      useragent: DataTypes.STRING,
      isMobile: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Visit',
      tableName: 'visits',
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
    }
  );
  return User;
};
