module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cartRow', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER(100),
        },
    },  { underscored: true }
);
};