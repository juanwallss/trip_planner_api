const express = require('express');
const itineraryController = require('../controllers/itineraryController')
const authMiddleware = require('../middlewares/authMiddleware');

require('dotenv').config();

const router = express.Router();

router.get('/:userId', itineraryController.getAllItineraries);
router.get('/:userId/:id', itineraryController.getSingleItinerary);
router.post('/:userId', itineraryController.createItinerary);
router.put('/:id',  itineraryController.modifyItinerary);
router.delete('/:id', itineraryController.deleteItinerary);

module.exports = router;
