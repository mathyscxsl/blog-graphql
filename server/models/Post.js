const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/sequelize');
const Comment = require('./Comment');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      const rawDate = this.getDataValue('date');
      return new Date(rawDate).toISOString();
    },
  },
}, {
  timestamps: true,
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  as: 'comments',
  onDelete: 'CASCADE',
});

module.exports = Post;
