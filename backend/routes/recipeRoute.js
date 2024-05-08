const express = require('express');
const { getRecipes, getRecipeById, createRecipe, updateRecipeById, deleteRecipeById } = require('../controllers/recipeController');

const router = express.Router();

router.get('/', getRecipes);

router.get('/:id', getRecipeById);

router.post('/', createRecipe);

router.patch('/:id', updateRecipeById);

router.delete('/:id', deleteRecipeById);

module.exports = router;