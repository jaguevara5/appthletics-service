const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();
const DistrictsController = require('../controllers/districts');

router.post('', checkAuth, DistrictsController.createDistrict);

router.get('', DistrictsController.getDistricts);

router.delete('/:id', checkAuth, DistrictsController.deleteDistrict);

router.put('/:id', checkAuth, DistrictsController.updateDistrict);

module.exports = router;