const express = require('express');
const itineraryController = require('../controllers/itineraryController')
const authMiddleware = require('../middlewares/authMiddleware');

require('dotenv').config();

const router = express.Router();

router.get('/:userId', authMiddleware, itineraryController.getAllItineraries);
router.get('/:userId/:id', authMiddleware, itineraryController.getSingleItinerary);
router.post('/:userId', authMiddleware, itineraryController.createItinerary);
router.put('/:userId/:id', authMiddleware, itineraryController.modifyItinerary);
router.delete('/:userId/:id', authMiddleware, itineraryController.deleteItinerary);

module.exports = router;
