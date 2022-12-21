const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Group = mongoose.model('Group');
const Article = mongoose.model('Article');

const { requireUser } = require('../../config/passport');

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