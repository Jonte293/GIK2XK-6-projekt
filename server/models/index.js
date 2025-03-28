'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// En kundvagn tillhör en kund, varje kundvagn kan ha många användare.
db.cart.belongsTo(db.user, { foreignKey: { allowNull: false } });
db.user.hasMany(db.cart, {
  allowNull: false,
  onDelete: 'CASCADE'
});

// En produkt tillhör en kategori, varje categori kan ha många produkter.
db.product.belongsTo(db.category, { foreignKey: { allowNull: false } });
db.category.hasMany(db.product, {
  allowNull: false,
  onDelete: 'CASCADE'
});

// En betygsättning tillhör en produkt, en produkt kan ha många betyg.
db.rating.belongsTo(db.product, { foreignKey: { allowNull: false } });
db.product.hasMany(db.rating, {
  allowNull: false,
  onDelete: 'CASCADE'
});

// En betygsättning sätts av en användare, en användare kan sätta flera betyg.
db.rating.belongsTo(db.user, { foreignKey: { allowNull: false } });
db.user.hasMany(db.rating, {
  allowNull: false,
  onDelete: 'CASCADE'
});

// En produkt tillhör en kundvagn, en kundvagn kan ha flera produkter
db.product.belongsToMany(db.cart, { through: db.cartRow });
db.cart.belongsToMany(db.product, { through: db.cartRow });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

