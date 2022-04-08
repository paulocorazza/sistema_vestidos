const router = require('express').Router();

const calcaController = require('../controllers/calcaController');


router.get('/', calcaController.list);
router.post('/add', calcaController.save);
router.get('/update/:id', calcaController.edit);
router.post('/update/:id', calcaController.update);
router.get('/delete/:id', calcaController.delete);



module.exports = router;