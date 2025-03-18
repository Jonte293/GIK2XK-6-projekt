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
            allownull: false
        },
        description: DataTypes.TEXT(255),
        imageUrl: {
           type: DataTypes.STRING(255),
           validate: {
            isUrl: true
           }
        } 
    },  { underscored: true }
);
};
