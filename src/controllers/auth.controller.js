const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const nodemailer = require('../utils/email');

module.exports = {
  register: async (req, res, next) => {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { email } = req.body;

      const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      await nodemailer.sendEmail(email, 'Password Reset', `Your reset token is: ${resetToken}`);
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      next(error);
    }
  },

  updatePassword: async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      await authService.changePassword(id, null, newPassword); // Passing null for oldPassword
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      next(error);
    }
  },
};