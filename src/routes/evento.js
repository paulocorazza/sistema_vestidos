const router = require('express').Router();

const eventoController = require('../controllers/eventoController');

router.get('/', eventoController.listProvas);
router.get('/retirada', eventoController.listRetirada);
router.get('/devolucao', eventoController.listDevolucao);

module.exports = router;