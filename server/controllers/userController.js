import users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { authorizeUser } from "../middlewares/authorizeUser.js";

const addUser = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password and confirm password do not match!" });
    }

    const isDuplicate = await users.findOne({ email });
    if (isDuplicate) {
        return res.status(400).json({ message: "User already exists." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new users({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (err) {
        return res.status(500).json({ message: "Error creating user", error: err.message });
    }
};

const getUser = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await users.findOne({ email });
    if (!existingUser) {
        return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Wrong password entered!" });
    }

    //token is created here
    const token = authorizeUser(existingUser);
    console.log(token)
    return res.status(200).json({ message: "User authenticated successfully!" ,token});
};



const displayUsers = async (req, res) => {
    try {
        const allUsers = await users.find({});
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};


export { addUser, getUser, displayUsers };
