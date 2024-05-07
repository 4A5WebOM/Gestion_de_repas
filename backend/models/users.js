const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    FirstName: String,
    LastName: String,

    // Champs pour stocker les recettes préférées de l'utilisateur
    favoriteRecipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
    }],
}, { timestamps: true });

moduel.exports = mongoose.model('User', userSchema);