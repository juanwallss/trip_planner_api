'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Itinerario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Itinerario.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario'
      })

      Itinerario.hasMany(models.Actividad, {
        foreignKey: 'itinerarioId',
        as: 'actividades',
        onDelete: 'CASCADE'
      })
    }
  }
  Itinerario.init({
    usuarioId: DataTypes.UUID,
    titulo: DataTypes.STRING(50),
    descripcion: DataTypes.STRING,
    destino: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
    latitud: DataTypes.FLOAT,
    longitud: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Itinerario',
  });
  return Itinerario;
};