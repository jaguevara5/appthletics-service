const express = require('express');
const checkAuth = require('../middleware/check-auth');
const GamesController = require('../controllers/games');
const router = express.Router();

router.get('', GamesController.getGames);

module.exports = router;