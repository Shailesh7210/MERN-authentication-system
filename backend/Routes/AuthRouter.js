const express = require('express');   // <-- missing import
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');
const { signup, login } = require('../Controllers/AuthController');

const router = express.Router();      // create router instance

// login route (dummy for now)
router.post('/login', (req, res) => {
    res.send('login success');
});

// signup route
router.post('/signup', signupValidation, signup);

router.post('/signup', loginValidation, login);

module.exports = router;
