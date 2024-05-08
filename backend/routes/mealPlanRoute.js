const express = require('express');
const { getMealPlans, getMealPlanById, createMealPlan, updateMealPlanById, deleteMealPlanById } = require('../controllers/mealPlanController');

const router = express.Router();

router.get('/', getMealPlans);

router.get('/:id', getMealPlanById);

router.post('/', createMealPlan);

router.patch('/:id', updateMealPlanById);

router.delete('/:id', deleteMealPlanById);

module.exports = router;