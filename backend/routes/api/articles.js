const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Group = mongoose.model('Group');
const Article = mongoose.model('Article');

const { requireUser } = require('../../config/passport');
const { fetchArticlesFromNewYorkTimes } = require('../../config/api');

//ONLY FOR TESTING
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();

        return res.json(articles);
    }
    catch (err) {
        return res.json([]);
    }
})

//ONLY FOR TESTING
router.get('/:id', async (req, res) => {
    try {
        const articleId = req.params.id;

        const article = await Article.findById(articleId).populate("figure");

        return res.json(article);
    }
    catch (err) {
        return null;
    }
})

const hasArticle = (user, url, figureId) => {
    const savedArticles = user.savedArticles;
    return savedArticles.some(savedArticle => {
        return savedArticle.url === url &&
            savedArticle.figure.toString() === figureId.toString();
    });
}

const hasFigure = (groups, figureId) => {
    for (let i = 0; i < groups.length; i++) {
        const idx = groups[i].figures.indexOf(figureId);
        if (idx !== -1) {
            return true;
        }
    }
    return false;
}

//CREATE - SAVE AN ARTICLE
router.post('/', requireUser, async (req, res, next) => {
    try {
        const headline      = req.body.headline;
        const summary       = req.body.summary;
        const source        = req.body.source;
        const publishedDate = req.body.publishedDate;
        const url           = req.body.url;
        const figureId      = req.body.figure;

        const groups = await Group.find({ user: req.user._id });
        if (!hasFigure(groups, figureId)) {
            return res.json("Must follow figure to save article");
        }

        const user = await req.user.populate("savedArticles");

        let article = await Article.findOne({
            url,
            figure: figureId
        });
        if (!article) {
            article = new Article({
                headline,
                summary,
                source,
                publishedDate,
                url,
                figure: figureId
            });
        }
        
        if (!hasArticle(user, url, figureId)) {
            article = await article.save();
            user.savedArticles.push(article._id);
            await user.save();
            return res.json("Article successfully saved");
        }
        else {
            return res.json("Article already saved");
        }
    }
    catch(err) {
        return res.json(null);
    }
});

//READ CURRENT USER'S FETCHED ARTICLES
router.get('/user/current/fetched', requireUser, async (req, res) => {
    try {
        const userId = req.user._id;

        const groups = await Group.find({ user: userId }).populate("figures");

        const searchTerms = [];
        groups.forEach(group => {
            group.figures.forEach(figure => searchTerms.push(figure.name));
        });

        const fetchedArticles = searchTerms.length === 0 ? [] :
            await fetchArticlesFromNewYorkTimes(searchTerms.join(" OR "))

        return res.json(fetchedArticles);
    }
    catch (err) {
        return res.json([]);
    }
})

//READ CURRENT USER'S SAVED ARTICLES
router.get('/user/current/saved', requireUser, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("savedArticles");

        const savedArticles = [];
        for(let i = 0; i < user.savedArticles.length; i++){
            savedArticles.push(await user.savedArticles[i].populate("figure"));
        }

        return res.json(savedArticles);
    }
    catch (err) {
        return res.json([]);
    }
})

//READ GROUP'S FETCHED ARTICLES
router.get('/group/:groupId/fetched', requireUser, async (req, res) => {
    try {
        const groupId = req.params.groupId;

        const group = await Group.findById(groupId).populate("figures");

        const searchTerms = group.figures.map(figure => `"${figure.name}"`);

        const fetchedArticles = searchTerms.length === 0 ? [] :
            await fetchArticlesFromNewYorkTimes(searchTerms.join(" OR "));

        return res.json(fetchedArticles);
    }
    catch (err) {
        return res.json([]);
    }
})

//READ FIGURE'S FETCHED ARTICLES
router.get('/figure/:figureName/fetched', requireUser, async (req, res) => {
    try {
        const figureName = req.params.figureName;

        const fetchedArticles = await fetchArticlesFromNewYorkTimes(figureName);

        return res.json(fetchedArticles);
    }
    catch (err) {
        return res.json([]);
    }
})

//DELETE - UNSAVE AN ARTICLE
router.delete('/:id', requireUser, async (req, res, next) => {
    try {
        const user = req.user;

        const articleId = req.params.id;

        const idx = user.savedArticles.indexOf(articleId);
        if (idx !== -1) {
            user.savedArticles = user.savedArticles.slice(0, idx)
                .concat(user.savedArticles.slice(idx + 1));
            await user.save();
        }

        let hasArticle = false;
        const users = await User.find();
        for (let i = 0; i < users.length; i++) {
            const idx = users[i].savedArticles.indexOf(articleId);
            if (idx !== -1) {
                hasArticle = true;
                break;
            }
        }

        if (!hasArticle) {
            await Article.findByIdAndRemove(articleId);
        }

        return res.json("Article successfully unsaved");
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;