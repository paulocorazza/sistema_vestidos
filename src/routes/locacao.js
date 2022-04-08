const router = require('express').Router();

const { addItemToLocation } = require('../controllers/locacaoController');
const locacaoController = require('../controllers/locacaoController');

router.get('/', locacaoController.list);
router.get('/get-next-id',locacaoController.nextId);
router.get('/update/:id', locacaoController.edit);
router.post('/update/:id',locacaoController.update);
router.get('/delete/:id', locacaoController.delete);
router.post('/add-locacao',locacaoController.addLocacao);
router.post('/add-item-location',locacaoController.addItemToLocacao);
router.get('/items-locacao/:id',locacaoController.listItemsFromLocation);
router.get('/items-locacao/delete/:id', locacaoController.deleteItemFromLocationById);
router.get('/items-locacao/delete/:id/:codigo', locacaoController.deleteItemFromLocation);
router.get('/get-data-prova/:data_prova',locacaoController.getDataProva);
router.get('/get-data-retira/:data_retira',locacaoController.getDataRetira);
router.get('/pecas/:codigo',locacaoController.validaPeca);
router.get('/atualiza-banco',locacaoController.atualizaBanco);
router.get('/pesquisa/:cliente',locacaoController.getLocacoesByCliente);
router.get('/pesquisa-clientes',locacaoController.getClientesLocacoes);











module.exports = router;




