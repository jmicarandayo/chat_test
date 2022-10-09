import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const router = express.Router();

//Register 
router.post('/register', async (req, res) => {
 try {
    //generate hashed password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    //create new user
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    const user = await newUser.save();
    res.status(200).json(user);
 } catch(err) {
    res.status(500).json(err.message)
 }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) throw new Error('User not found');
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isPasswordCorrect) throw new Error('Incorrect password!')
        // const token = jwt.sign({id:user._id}, process.env.JWT)

        // res.cookie("access_token", token, {
        //     httpOnly: true,
        // }).status(201).json(user)
        res.status(201).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
})

export default router;