const express = require('express');
const checkAuth = require('../middleware/check-auth');
const TeamsController = require('../controllers/teams');
const router = express.Router();

router.get('', TeamsController.getTeams);

router.post('', checkAuth, TeamsController.createTeam);

router.delete('/:id', checkAuth, TeamsController.deleteTeam);

router.put('/:id', TeamsController.updateTeam);

module.exports = router;