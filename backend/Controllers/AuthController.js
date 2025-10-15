const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserModel = require('../Models/User');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists',
        success: false
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: 'Signup successful',
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Internal server error',
      success: false
    });
  }
};



const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
    return res.status(403).json({
        message: 'email or password invalid',
        success: false
      });
    }

    // decrypt password
    const isPassEqual = await bcrypt.compare(password, existingUser.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: 'Email or password invalid',
        success: false
      });
    }

    // generate JWT token
    const jwToken = jwt.sign(
      { email: existingUser.email, _id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    

    res.status(200).json({
      message: 'login successful',
      success: true,
      jwToken,
      email,
      name: user.name
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Internal server error',
      success: false
    });
  }
};

module.exports = { signup, login };
