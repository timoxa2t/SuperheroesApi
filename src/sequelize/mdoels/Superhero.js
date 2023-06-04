const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Superhero = sequelize.define('Superhero', {
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  real_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  origin_description: {
    type: DataTypes.STRING,
  },
  catch_phrase: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  }
}, {});

module.exports = {
  Superhero,
}