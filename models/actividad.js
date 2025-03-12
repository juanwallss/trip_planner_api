'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actividad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Actividad.belongsTo(models.Itinerario, {
        foreignKey: 'itinerarioId',
        as: 'itinerario'
      })
    }
  }
  Actividad.init({
    itinerarioId: DataTypes.UUID,
    titulo: DataTypes.STRING(50),
    descripcion: DataTypes.TEXT,
    fecha: DataTypes.DATE,
    hora: DataTypes.TIME,
    latitud: DataTypes.FLOAT,
    longitud: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Actividad',
    tableName: 'actividades'
  });
  return Actividad;
};