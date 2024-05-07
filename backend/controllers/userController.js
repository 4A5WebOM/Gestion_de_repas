const { default: mongoose } = require("mongoose");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

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
};

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
};

// GET un utilisateur
const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID utilisateur invalide" });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  } else {
    res.status(200).json({ user });
  }
};

// Modifier un utilisateur
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const user = await Users.findByIdAndUpdate(id, updateData, { new: true });

  if (!user) {
    return res.status(400).json({ error: "Utilisateur non-trouvé" });
  } else {
    res.status(200).json(user);
  }
};

module.exports = { signupUser, loginUser, getUserById, updateUserById};
