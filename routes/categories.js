const express = require('express');
const checkAuth = require('../middleware/check-auth');
const CategoriesController = require('../controllers/categories');
const router = express.Router();

router.post('', checkAuth, CategoriesController.createCatogory);

router.get('', CategoriesController.getCategories);

router.delete('/:id', checkAuth, CategoriesController.deleteCategory);

router.put('/:id', checkAuth, CategoriesController.createCatogory);

module.exports = router;