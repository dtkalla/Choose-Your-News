const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Group = mongoose.model('Group');

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

router.get('/:id', async (req, res, next) => {
    try {
        const group = await Group.findById(req.params.id)
            .populate("figures");
        return res.json(group);
    }
    catch (err) {
        const error = new Error('Group not found');
        error.statusCode = 404;
        error.errors = { message: "No group found with that id" };
        return next(error);
    }
})

router.get('/user/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const groups = await Group.find({ user: userId })
            .sort({ createdAt: -1 });
        // .populate("figures");
        return res.json(groups);
    }
    catch (err) {
        return res.json([]);
    }
})

module.exports = router;