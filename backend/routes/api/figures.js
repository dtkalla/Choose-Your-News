const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Figure = mongoose.model('Figure');
const Group = mongoose.model('Group');
const User = mongoose.model('User');

const axios = require("axios").default;
const { newyorktimesApiKey } = require('../../config/keys');

const { requireUser } = require('../../config/passport');
// potential future use
// const validateTweetInput = require('../../validation/tweets');

const fetchArticlesFromNewyorktime = async (query) => {
    const newyorktimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
    
    const filterQueryObj = {
        'headline' : query,
        'document_type' : 'article'
    };

    let filterQueryString = "";
    for (const key in filterQueryObj) {
        if (filterQueryObj.hasOwnProperty(key)) {
            filterQueryString += `fq=${key}:(${filterQueryObj[key]})&`
        }
    }
    
    const url = `${newyorktimesUrl}${filterQueryString}api-key=${newyorktimesApiKey}`;
    const response = await axios.get(url);
    const data = response.data.response.docs;
    const articles = data.map(datum => {
        return {
            headline: datum.headline.main,
            summary: datum.abstract,
            source: datum.source,
            publishedDate: datum.pub_date,
            url: datum.web_url
        }
    })
    return articles;
}

//for testing
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

        const obj = {
            ...figure._doc,
            articles: await fetchArticlesFromNewyorktime(`"${figure.name}"`)
        };

        return res.json(obj);
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

        const searchTerms = group.figures.map(figure => `"${figure.name}"`);

        const obj = {
            ...group._doc,
            articles: await fetchArticlesFromNewyorktime(searchTerms.join(" OR "))
        };

        return res.json(obj);
    }
    catch (err) {
        return res.json([]);
    }
})

router.get('/user/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .sort({ createdAt: -1 });

        const groups = await Group.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate("figures");

        const userFigures = [];
        groups.forEach(group => {
            for(let i = 0; i < group.figures.length; i++) {
                userFigures.push(group.figures[i]);
            }
        });

        const searchTerms = userFigures.map(figure => `"${figure.name}"`);

        const obj = {
            _id: user._id,
            username: user.username,
            email: user.email,
            groups: groups,
            articles: await fetchArticlesFromNewyorktime(searchTerms.join(" OR "))
        };

        return res.json(obj);
    }
    catch (err) {
        return res.json([]);
    }
})

router.post('/', requireUser, async (req, res) => {
    try {
        const userId = req.user._id;

        const newFigure = new Figure({
            name: req.body.name
        });

        let figure = await newFigure.save();

        let noGroup = await Group.find({ user: userId, name: "No group" });
        noGroup.figures.push(figure._id);
        noGroup = await noGroup.save();

        return res.json(noGroup.populate("figures"));
    }
    catch (err) {
        return res.json(null);
    }
});

module.exports = router;