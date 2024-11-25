const authService = require('../services/auth.service');
const { catchAsync } = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
    const user = await authService.register(req.body);
    const token =await authService.generateToken(user);
    res.status(201).json({ user, token });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.json({ user, token });
});

module.exports = {
    register,
    login
}