const { Actividad } = require('../models')

exports.createActivity = async (req, res) => {
  try {
    const { itinerarioId, titulo, descripcion, fecha, hora, latitud, longitud } = req.body
    const actividad = await Actividad.create({
      itinerarioId,
      titulo,
      descripcion,
      fecha,
      hora,
      latitud,
      longitud
    })
    return res.status(200).json(actividad)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.deleteActivity = async (req, res) => {
  try {
    const actividadId = req.params.id
    const actividad = await Actividad.findByPk(actividadId)
    if (!actividad) {
      return res.status(404).json({ message: 'Actividad no encontrado' })
    }

    await actividad.destroy()
    res.status(200).json({ message: 'Actividad eliminado correctamente' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.updateActivity = async (req, res) => {
  try {
    const actividadId = req.params.id
    const { titulo, descripcion, fecha, hora, latitud, longitud } = req.body
    const actividad = await Actividad.findByPk(actividadId)
    if (!actividad) {
      return res.status(404).json({ message: 'Actividad no encontrado' })
    }
    await actividad.update({ titulo, descripcion, fecha, hora, latitud, longitud })
    res.status(200).json({ message: 'Actividad modificada correctamente' })
  } catch (e) {

  }
}