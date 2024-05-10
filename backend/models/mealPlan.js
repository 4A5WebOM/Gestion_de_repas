const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealPlanSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    days: [{
        day: {
            type: String,
            enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
            required: true
        },
        meals: [{
            time: {
                type: String,
                enum: ['Déjeuner', 'Diner', 'Souper'],
                required: true
            },
            recipe: {
                type: Schema.Types.ObjectId,
                ref: 'Recipe',
                required: true
            }
        }]
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
} , { timestamps: true });

// cette methode va generer une liste d'epicerie
// elle va parcourir les jours et les repas du meal plan
// pour chaque repas, elle va chercher la recette correspondante
// et pour chaque ingrédient de la recette, elle va l'ajouter à la liste d'épicerie
// si l'ingrédient est déjà dans la liste, elle va augmenter la quantité    
// elle va retourner la liste d'épicerie
mealPlanSchema.method('generateGroceryList', async function() {
    let groceryList = {};

    for (let day of this.days) {
        for (let meal of day.meals) {
            // fetch les recettes
            let recipe = await mongoose.model('Recipe').findById(meal.recipe);
            for (let ingredient of recipe.ingredients) {
                // si l'ingrédient est déjà dans la liste d'épicerie, augmenter la quantité
                if (groceryList[ingredient.name]) {
                    groceryList[ingredient.name].quantity += ingredient.quantity;
                } else {
                    // sinon, ajouter l'ingrédient à la liste d'épicerie
                    groceryList[ingredient.name] = {
                        quantity: ingredient.quantity,
                        unit: ingredient.unit
                    };
                }
            }
        }
    }

    return groceryList;
});
module.exports = mongoose.model('MealPlan', mealPlanSchema);