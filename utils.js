const { Sequelize, DataTypes } = require('sequelize');

module.exports.createStore = async () => {
  const sequelize = new Sequelize('todos', 'laira', 'aimhigher', {
    host: 'localhost',
    dialect: 'postgres'
  });

  try {
    await sequelize.authenticate();
    console.log('success');
  } catch (err) {
    console.error('error', err);
  }

  const todos = sequelize.define('todos', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    checked: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    tableName: 'todos',
    timestamps: false,
  });

  return todos;
};
