module.exports = (sequelize, DataTypes) => {

const Countries = sequelize.define('Countries', {
  CountryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Countries.associate = function ({Holidays}) {
  Countries.belongsToMany(Holidays);
 }
}