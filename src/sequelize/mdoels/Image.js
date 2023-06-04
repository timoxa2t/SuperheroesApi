const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const { Superhero } = require('./Superhero');


const Image = sequelize.define('Image', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  superheroId: {
    type: DataTypes.INTEGER,
    references: {
      model: Superhero,
      key: 'id'
    }
  },
}, {});

module.exports = {
  Image,
}