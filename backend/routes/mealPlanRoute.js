const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const { getAllMealPlans, getMealPlanById, createMealPlan, updateMealPlanById, deleteMealPlanById } = require('../controllers/mealPlanController');

const router = express.Router();

router.get('/', getAllMealPlans);

router.get('/:id', getMealPlanById);

router.post('/', requireAuth, createMealPlan);

router.patch('/:id', requireAuth, updateMealPlanById);

router.delete('/:id', requireAuth, deleteMealPlanById);

module.exports = router;