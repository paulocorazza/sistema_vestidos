const router = require('express').Router();

const pesquisaController = require('../controllers/pesquisaController');

router.get('/vestido/:codigo', pesquisaController.searchVestido);
router.get('/sapato/:codigo', pesquisaController.searchSapato);
router.get('/gravata/:codigo', pesquisaController.searchGravata);
router.get('/calca/:codigo', pesquisaController.searchCalca);
router.get('/paleto/:codigo', pesquisaController.searchPaleto);
router.get('/colete/:codigo', pesquisaController.searchColete);
router.get('/conjunto/:codigo', pesquisaController.searchConjunto);
router.get('/camisa/:codigo', pesquisaController.searchCamisa);
router.get('/bolsa/:codigo', pesquisaController.searchBolsa);


module.exports = router;