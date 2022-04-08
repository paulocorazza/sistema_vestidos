const router = require('express').Router();

const agendaController = require('../controllers/agendaController');

router.get('/agenda', agendaController.showSchedule);

module.exports = router;

