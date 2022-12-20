const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Figure = mongoose.model('Figure');
const Group = mongoose.model('Group');

const User = mongoose.model('User');
const { requireUser } = require('../../config/passport');
const validateTweetInput = require('../../validation/tweets');

router.get('/', async (req, res) => {
    try {
        const figures = await Figure.find()
            .sort({ createdAt: -1 });
        return res.json(figures);
    }
    catch (err) {
        return res.json([]);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const figure = await Figure.findById(req.params.id)
            .sort({ createdAt: -1 });
        return res.json(figure);
    }
    catch (err) {
        return res.json(null);
    }
})

router.get('/group/:groupId', async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId)
            .sort({ createdAt: -1 })
            .populate("figures");

        return res.json(group.figures);
    }
    catch (err) {
        return res.json([]);
    }
})

router.get('/user/:userId', async (req, res) => {
    try {
        const groups = await Group.find({ user: req.params.userId })
            .sort({ createdAt: -1 })
            .populate("figures");

        const figures = [];
        groups.forEach(group => {
            for(let i = 0; i < group.figures.length; i++) {
                figures.push(group.figures[i]);
            }
        });

        return res.json(figures);
    }
    catch (err) {
        return res.json([]);
    }
})

module.exports = router;