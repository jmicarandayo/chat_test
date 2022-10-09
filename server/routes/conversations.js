import express from 'express'
import Conversation from '../models/Conversation.js'


const router = express.Router();

//New Conversation
router.post('/', async(req, res) => {
    const conversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })
    try {
        const savedConversation = await conversation.save();
        res.status(200).json(savedConversation)
    } catch(err) {
        res.status(500).json(err)
    }
})

//Get Conversation of a user
router.get('/:userId', async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.userId]}
        });
        res.status(200).json(conversations)
    } catch(err) {
        res.status(500).json(err)
    }
})

export default router;