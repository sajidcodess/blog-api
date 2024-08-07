const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model");
async function register(req, res) {
  const { username, email, password } = req.body;
  try {
    const user = await userModel.create({ username, email, password });

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    console.log(username, email, password, token);
    res.status(201).json({success: true, token: token})
  } catch (error) {
    if(error.name == 'TokenExpiredError') {
      res.status(401).json({success: false, error: 'The access tokan has expired'})
    }
    res.status(400).json({success: false, error: error.message})
  }
}

module.exports = register;
