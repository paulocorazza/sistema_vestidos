const router = require('express').Router();

const paletoController = require('../controllers/paletoController');

router.get('/', paletoController.list);
router.post('/add', paletoController.save);
router.get('/update/:id', paletoController.edit);
router.post('/update/:id', paletoController.update);
router.get('/delete/:id', paletoController.delete);

module.exports = router;

