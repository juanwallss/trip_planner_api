const { Itinerario, Actividad } = require('../models')

exports.getAllItineraries = async (req, res) => {
  try {
    const userId = req.params.userId
    const itinerarios = await Itinerario.findAll({
      where: { usuarioId: userId },
      include: [
        { model: Actividad, as: 'actividades' }
      ]
    })
    return res.status(200).json(itinerarios)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.getSingleItinerary = async (req, res) => {
  try {
    const itineraryId = req.params.id
    const itinerary = await Itinerario.findByPk(itineraryId, {
      where: { usuarioId: req.params.userId },
      include: [
        { model: Actividad, as: 'actividades' }
      ]
    })
    return res.status(200).json(itinerary)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.createItinerary = async (req, res) => {
  try {
    const userId = req.params.userId
    const { titulo, descripcion, destino, fechaInicio, fechaFin } = req.body
    const nuevoItinerario = await Itinerario.create({
      usuarioId: userId,
      titulo,
      descripcion,
      destino,
      fechaInicio,
      fechaFin
    })
    return res.status(200).json(nuevoItinerario)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.modifyItinerary = async (req, res) => {
  try {
    const userId = req.params.userId
    const itineraryId = req.params.id
    const { titulo, descripcion, destino, fechaInicio, fechaFin } = req.body

    const itinerary = await Itinerario.findOne({ where: { id: itineraryId, usuarioId: userId } })

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerario no encontrado' })
    }

    await itinerary.update({ titulo, descripcion, destino, fechaInicio, fechaFin })
    res.status(200).json({ message: 'Itinerario modificado correctamente' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.deleteItinerary = async (req, res) => {
  try {
    const userId = req.params.userId
    const itineraryId = req.params.id
    const itinerary = await Itinerario.findOne({ where: { id: itineraryId, usuarioId: userId } })

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerario no encontrado' })
    }

    await itinerary.destroy()
    res.status(200).json({ message: 'Itinerario eliminado correctamente' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}