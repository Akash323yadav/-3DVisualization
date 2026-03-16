const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation log
        console.log(`[Auth] Register attempt: ${email}`);

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('[Auth Error] Register:', error.message);
        res.status(500).json({ message: 'Registration failed: ' + error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`[Auth] Login attempt: ${email}`);

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
        console.error('[Auth Error] Login:', error.message);
        res.status(500).json({ message: 'Login failed: ' + error.message });
    }
};

module.exports = { register, login };
