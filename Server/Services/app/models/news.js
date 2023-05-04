'use strict';
const {
  Model
} = require('sequelize');
const { slug } = require('../helpers/slug');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.Category, { foreignKey: "CategoryId" })
      News.hasMany(models.Tag, { foreignKey: "NewsId" })
    }
  }
  News.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required"
        }, notEmpty: {
          msg: "Title is required"
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Slug is required"
        }, notEmpty: {
          msg: "Slug is required"
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Content is required"
        }, notEmpty: {
          msg: "Content is required"
        }
      }
    },
    imgUrl: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    UserMongoId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'News',
  });

  News.beforeValidate((news) => {
    news.slug = slug(news.title)
  })
  return News;
};