const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();

const { FULL_ADDRESS } = process.env;

const sequelize = new Sequelize(
  FULL_ADDRESS,
  {
    dialectOptions: {
      ssl: true,
    },
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log(error);
  }

  return sequelize;
};

module.exports = {
  connect,
  sequelize,
}