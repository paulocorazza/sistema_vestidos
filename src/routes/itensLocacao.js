const router = require('express').Router();

const itenLocacaoController = require('../controllers/itemLocacaoController');

router.get('/:codigo', itenLocacaoController.listLocacoes);


module.exports = router;