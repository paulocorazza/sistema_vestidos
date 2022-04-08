const router = require('express').Router();

const camisaController = require('../controllers/camisaController');

router.get('/', camisaController.list);
router.post('/add', camisaController.save);
router.get('/update/:id', camisaController.edit);
router.post('/update/:id', camisaController.update);
router.get('/delete/:id', camisaController.delete);

module.exports = router;

