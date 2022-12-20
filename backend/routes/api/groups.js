const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Group = mongoose.model('Group');

const User = mongoose.model('User');
const { requireUser } = require('../../config/passport');
const validateTweetInput = require('../../validation/tweets');

router.get('/', async (req, res) => {
    try {
        const groups = await Group.find()
            .sort({ createdAt: -1 });

        return res.json(groups);
    }
    catch (err) {
        return res.json([]);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id)
            .sort({ createdAt: -1 })
            .populate("figures");
        
        return res.json(group);
    }
    catch (err) {
        return res.json(null);
    }
})

//Better build up figures at the frontend with groups instead of using api/figures/user/:userId
router.get('/user/:userId', async (req, res) => {
    try {
        const groups = await Group.find({ user: req.params.userId })
            .sort({ createdAt: -1 })
            .populate("figures");

        return res.json(groups);
    }
    catch (err) {
        return res.json([]);
    }
})

module.exports = router;    