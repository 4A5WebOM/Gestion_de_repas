const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Static signup method
userSchema.statics.signup = async function (username, email, password) {
    
    const emailExists = await this.findOne({ email });
    const usernameExists = await this.findOne({ username });
    
    if (emailExists) {
        throw new Error('L\'email existe déjà');
    }
    
    if (usernameExists) {
        throw new Error('Le nom d\'utilisateur existe déjà');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, email, password: hash });

    return user;
}

module.exports = mongoose.model('User', userSchema);
