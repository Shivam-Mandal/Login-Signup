const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')
const JWT_SECRET = "employee"

const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' }); // Set token expiration as needed
}

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: 'Email not found' });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(401).json({ success: false, error: 'Incorrect password' });
        }

        const token = createToken(user._id);

        return res.status(200).json({ success: true, token });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

// Register
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Enter a valid email' });
        }

        if (password.length < 5) {
            return res.status(400).json({ success: false, message: 'Password must be at least 5 characters long' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            name: name,
            email: email,
            password: hashPassword
        });

        const token = createToken(newUser._id);
        return res.status(201).json({ success: true, token });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = { login, register, createToken };
