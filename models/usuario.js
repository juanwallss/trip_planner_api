'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.Itinerario, {
        foreignKey: 'usuarioId',
        as: 'itinerarios'
      })
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING(80),
    email: DataTypes.STRING(60),
    contraseña: DataTypes.STRING,
    token: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};