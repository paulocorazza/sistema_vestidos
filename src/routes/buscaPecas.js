const router = require('express').Router();


const buscaPecaController = require('../controllers/buscaPecaController');


router.get('/',buscaPecaController.fetchPecas);


module.exports = router;