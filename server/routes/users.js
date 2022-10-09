import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const router = express.Router();

//Get Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json(err)
    }
})

//Get a User
router.get('/:userId', async(req, res) => {
    const id = req.params.userId;
    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
})

// Update a User
router.put('/:userId', async(req, res) => {
    const id = req.params.userId;
    console.log(req.body)
    if(req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    try{
        const updatedUser = await User.findByIdAndUpdate
        (id, 
            { $set: req.body},
            { new: true}
            )
        res.status(200).json(updatedUser)
    }catch(err){
        console.log(err)
    }
})


//Delete a User
router.delete('/:userId', async(req, res) => {
    const id = req.params.userId;
    try{
        await User.findByIdAndDelete(id);
        res.status(200).json('User has been deleted')
    } catch(err) {
        console.log(err)
    }
})

export default router;