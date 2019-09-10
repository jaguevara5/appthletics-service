const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();
const DistrictsController = require('../controllers/districts');

router.get('', DistrictsController.getDistricts);

router.post('', checkAuth, DistrictsController.createDistrict);

router.delete('/:id', checkAuth, DistrictsController.deleteDistrict);

router.put('/:id', checkAuth, DistrictsController.updateDistrict);

module.exports = router;