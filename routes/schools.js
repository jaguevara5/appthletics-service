const express = require('express');
const checkAuth = require('../middleware/check-auth');
const SchoolsController = require('../controllers/schools');
const router = express.Router();

router.get('', SchoolsController.getSchools);

router.post('', checkAuth, SchoolsController.createSchool);

router.delete('/:id', checkAuth, SchoolsController.deleteSchool);

router.put('/:id', checkAuth, SchoolsController.updateSchool);

module.exports = router;