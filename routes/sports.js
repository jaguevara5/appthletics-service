const express = require('express');
const checkAuth = require('../middleware/check-auth');
const SportsController = require('../controllers/sports');
const router = express.Router();

router.get('', SportsController.getSports);

router.post('', checkAuth, SportsController.createSport);

router.delete('/:id', checkAuth, SportsController.deleteSport);

router.put('/:id', SportsController.updateSport);

module.exports = router;