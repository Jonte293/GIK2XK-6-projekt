// Definierar en cart-modell, den har ett id och en payed "check"
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        payed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        
    },  { underscored: true }
);
};

