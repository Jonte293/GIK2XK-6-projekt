// Definierar rating modellen, den har fälten id, score, review.
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('rating', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        score: {
            type: DataTypes.INTEGER,
            validate: {
              min: 1,  
              max: 5   
            }
        },
        review: {
            type: DataTypes.STRING(255),
        }
    },  { underscored: true }
);
};
