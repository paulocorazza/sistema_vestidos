const router = require('express').Router();

const bolsaController = require('../controllers/bolsaController');

router.get('/', bolsaController.list);
router.post('/add', bolsaController.save);
router.get('/update/:id', bolsaController.edit);
router.post('/update/:id', bolsaController.update);
router.get('/delete/:id', bolsaController.delete);

module.exports = router;