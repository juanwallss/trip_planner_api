const { Itinerario, Actividad } = require('../models')

exports.getAllItineraries = async (req, res) => {
  try {
    const userId = req.params.userId
    const itinerarios = await Itinerario.findAll({
      where: { usuarioId: userId },
      include: [
      { model: Actividad, as: 'actividades' }
      ],
      order: [['id', 'DESC']]
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
    const { titulo, descripcion, destino, fechaInicio, fechaFin, latitud, longitud, actividades } = req.body
    const nuevoItinerario = await Itinerario.create({
      usuarioId: userId,
      titulo,
      descripcion,
      destino,
      fechaInicio,
      fechaFin,
      latitud,
      longitud
    })
    console.log('nuevo itinerario', actividades)

    if (actividades && actividades.length > 0) {
      await Promise.all(actividades.map(async (actividad) => {
        await Actividad.create({
          ...actividad,
          itinerarioId: nuevoItinerario.id
        })
      }))
    }

    if (actividades && actividades.length > 0) {
      const createdActividades = await Actividad.findAll({
        where: { itinerarioId: nuevoItinerario.id }
      })
      nuevoItinerario.dataValues.actividades = createdActividades
    }
    return res.status(200).json(nuevoItinerario)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.modifyItinerary = async (req, res) => {
  try {
    const itineraryId = req.params.id
    const { titulo, descripcion, destino, fechaInicio, fechaFin, actividades } = req.body

    const itinerary = await Itinerario.findOne({ where: { id: itineraryId } })

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerario no encontrado' })
    }

    await itinerary.update({ titulo, descripcion, destino, fechaInicio, fechaFin })

    await Actividad.destroy({ where: { itinerarioId: itineraryId } })

    await Promise.all(actividades.map(async (actividad) => {
      await Actividad.create({
        ...actividad,
        itinerarioId: itineraryId
      })
    }
    ))
    res.status(200).json({ message: 'Itinerario modificado correctamente' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.deleteItinerary = async (req, res) => {
  try {
    const itineraryId = req.params.id
    const itinerary = await Itinerario.findOne({ where: { id: itineraryId } })

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerario no encontrado' })
    }

    await Actividad.destroy({ where: { itinerarioId: itineraryId } })

    await itinerary.destroy()
    res.status(200).json({ message: 'Itinerario eliminado correctamente' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}