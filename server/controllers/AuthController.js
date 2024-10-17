const UserModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists', success: false });
        }

        // Create a new user model instance
        const userModel = new UserModel({ name, email, password });

        // Hash the password before saving
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        res.status(201).json({ message: "Successful sign-up", success: true });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "User Name already taken", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: 'Auth failed: email or password is wrong', success: false });
        }

        // Compare passwords
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: 'Auth failed: email or password is wrong', success: false });
        }

        // Generate JWT
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Successful login",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    signup,
    login
};
