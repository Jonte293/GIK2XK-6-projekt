// Definierar produkt modellen, den har fälten id, namn, pris,
// beskrivning och bildUrl.
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            validate: {
                len: [1, 100]
            }
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        description: DataTypes.TEXT,
        imageUrl: {
           type: DataTypes.STRING(255),
           validate: {
            isUrl: true
           }
        } 
    },  { underscored: true }
);
};
