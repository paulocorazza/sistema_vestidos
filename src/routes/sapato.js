const router = require('express').Router();

const sapatoController = require('../controllers/sapatoController');

router.get('/', sapatoController.list);
router.post('/add', sapatoController.save);
router.get('/update/:id', sapatoController.edit);
router.post('/update/:id', sapatoController.update);
router.get('/delete/:id', sapatoController.delete);

module.exports = router;

