// Definierar user modellen, den har fälten id, email, användarnamn,
// namn, efternamn, lösenord
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: [4, 200],
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING(50),
            validate: {
                len: [3, 50]
            }
        },
        firstName: DataTypes.STRING(50),
        lastName: DataTypes.STRING(50),
        password: {
            type: DataTypes.STRING(50),
            validate: {
                len: [6, 50]
            }
        },

    },  { underscored: true }
);
};
