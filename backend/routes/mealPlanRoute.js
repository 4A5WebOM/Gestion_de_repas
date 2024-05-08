const express = require('express');
const { getAllMealPlans, getMealPlanById, createMealPlan, updateMealPlanById, deleteMealPlanById } = require('../controllers/mealPlanController');

const router = express.Router();

router.get('/', getAllMealPlans);

router.get('/:id', getMealPlanById);

router.post('/', createMealPlan);

router.patch('/:id', updateMealPlanById);

router.delete('/:id', deleteMealPlanById);

module.exports = router;