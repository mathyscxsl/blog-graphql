const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/sequelize');

const Comment = sequelize.define('Comment', {
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


module.exports = Comment;
