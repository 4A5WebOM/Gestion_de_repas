const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealPlanSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    days: [{
        day: {
            type: String,
            enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        },
        meals: [{
            time: {
                type: String,
                enum: ['Déjeuner', 'Diner', 'Souper'],
            },
            recipe: {
                type: Schema.Types.ObjectId,
                ref: 'Recipe',
            }
        }]
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
} , { timestamps: true });

module.exports = mongoose.model('MealPlan', mealPlanSchema);