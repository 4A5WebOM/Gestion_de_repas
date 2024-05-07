const User = require('../models/users');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
   return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

// Connexion d'un utilisateur
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // Créer un token
        const token = createToken(user._id);

        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }



  }


// Creer un nouvel utilisateur
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.signup(username, email, password);

    // Créer un token
    const token = createToken(user._id);

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
  
  module.exports = { signupUser, loginUser }