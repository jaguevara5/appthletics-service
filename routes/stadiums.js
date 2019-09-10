const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();
const StadiumsController = require('../controllers/stadiums');

router.get('', StadiumsController.getStadiums);

router.post('', checkAuth, StadiumsController.createStadium);

router.delete('/:id', checkAuth, StadiumsController.deleteStadium);

router.put('/:id', checkAuth, StadiumsController.updateStadium);

module.exports = router;