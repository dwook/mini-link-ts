'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    static associate({ User, Visit }) {
      this.belongsTo(User);
      this.hasMany(Visit);
    }
  }
  Link.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      image: DataTypes.STRING,
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Link',
      tableName: 'links',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 이모티콘 저장
    }
  );
  return Link;
};
