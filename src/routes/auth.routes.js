const express = require('express');
const { register, login, resetPassword, updatePassword } = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { registerSchema, loginSchema, resetPasswordSchema, updatePasswordSchema } = require('../utils/validators');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);
router.post('/update-password', vlaidate(updatePasswordSchema), updatePassword);

module.exports = router;