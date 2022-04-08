const router = require('express').Router();

const vestidoController = require('../controllers/vestidoController');


router.get('/', vestidoController.list);
router.post('/add', vestidoController.save);
router.get('/update/:id', vestidoController.edit);
router.post('/update/:id', vestidoController.update);
router.get('/delete/:id', vestidoController.delete);



module.exports = router;