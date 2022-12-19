const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Figure = mongoose.model('Figure');
const Group = mongoose.model('Group');

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

router.get('/:id', async (req, res, next) => {
    try {
        const figure = await Figure.findById(req.params.id)
            .sort({ createdAt: -1 });
        return res.json(figure);
    }
    catch (err) {
        const error = new Error('Figure not found');
        error.statusCode = 404;
        error.errors = { message: "No figure found with that id" };
        return next(error);
    }
})

router.get('/group/:groupId', async (req, res, next) => {
    let group;
    try {
        group = await Group.findById(req.params.groupId)
            .sort({ createdAt: -1 })
            .populate("figures");
    } catch (err) {
        const error = new Error('Group not found');
        error.statusCode = 404;
        error.errors = { message: "No Group found with that id" };
        return next(error);
    }
    try {
        return res.json(group.figures);
    }
    catch (err) {
        return res.json([]);
    }
})

router.get('/user/:userId', async (req, res, next) => {
    try {
        const groups = await Group.find({ user: req.params.userId })
            .sort({ createdAt: -1 })
            .populate("figures");
        const figures = [];
        groups.forEach(group => {
            for(let i = 0; i < group.figures.length; i++) {
                figures.push(group.figures[i]);
            }
        })
        return res.json(figures);
    }
    catch (err) {
        const error = new Error('Groups belong to User with that id are not found');
        error.statusCode = 404;
        error.errors = { message: "No Groups found in User with that id" };
        return next(error);
    }
})

module.exports = router;