const router = require('express').Router();

const coleteController = require('../controllers/coleteController');

router.get('/', coleteController.list);
router.post('/add', coleteController.save);
router.get('/update/:id', coleteController.edit);
router.post('/update/:id', coleteController.update);
router.get('/delete/:id', coleteController.delete);

module.exports = router;

