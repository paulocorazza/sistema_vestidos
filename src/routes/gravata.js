const router = require('express').Router();

const gravataController = require('../controllers/gravataController');

router.get('/', gravataController.list);
router.post('/add', gravataController.save);
router.get('/update/:id', gravataController.edit);
router.post('/update/:id', gravataController.update);
router.get('/delete/:id', gravataController.delete);

module.exports = router;

