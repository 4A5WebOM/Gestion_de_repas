const User = require('../models/users');



// Connexion d'un utilisateur
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
  }


// Creer un nouvel utilisateur
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.signup(username, email, password);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
  
  module.exports = { signupUser, loginUser }