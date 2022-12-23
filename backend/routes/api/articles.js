const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Group = mongoose.model('Group');
const Article = mongoose.model('Article');

const { requireUser } = require('../../config/passport');
const { fetchArticlesFromNewYorkTimes } = require('../../config/api');

//HELPER METHODS
const hasArticle = (user, url) => {
    const savedArticles = user.savedArticles;
    return savedArticles.some(savedArticle => {
        return savedArticle.url === url;
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


//READ CURRENT USER'S SAVED ARTICLES, WORKS
router.get('/user/current/saved', requireUser, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("savedArticles");

        const articles = [];
        for (let i = 0; i < user.savedArticles.length; i++) {
            articles.push(await user.savedArticles[i]);
        }

        const articlesObj = {};
        for (let i = 0; i < articles.length; i++) {
            const al = articles[i];
            articlesObj[`"${al._id}"`] = al;
        }

        return res.json(articlesObj);
    }
    catch (err) {
        return res.json({});
    }
})

//READ CURRENT USER'S FETCHED ARTICLES, WORKS
router.get('/user/current/fetched', requireUser, async (req, res) => {
    try {
        const userId = req.user._id;

        const groups = await Group.find({ user: userId }).populate("figures");

        const searchTerms = [];
        for(let i = 0; i < groups.length; i++) {
            const group = groups[i];
            for(let j = 0; j < group.figures.length; j++) {
                const figure = group.figures[j];
                searchTerms.push(figure.name);
            }
        }

        const articles = searchTerms.length === 0 ? [] :
            await fetchArticlesFromNewYorkTimes(searchTerms.join(" OR "))

        const articlesObj = {};
        for (let i = 0; i < articles.length; i++) {
            const al = articles[i];
            articlesObj[`${al.url}`] = al;
        }

        return res.json(articlesObj);
    }
    catch (err) {
        return res.json({});
    }
})

//READ GROUP'S FETCHED ARTICLES, WORKS
router.get('/group/:groupId/fetched', requireUser, async (req, res) => {
    try {
        const groupId = req.params.groupId;

        const group = await Group.findById(groupId).populate("figures");

        const searchTerms = group.figures.map(figure => `"${figure.name}"`);

        const articles = searchTerms.length === 0 ? [] :
            await fetchArticlesFromNewYorkTimes(searchTerms.join(" OR "));

        const articlesObj = {};
        for (let i = 0; i < articles.length; i++) {
            const al = articles[i];
            articlesObj[`${al.url}`] = al;
        }

        return res.json(articlesObj);
    }
    catch (err) {
        return res.json({});
    }
})

//READ FIGURE'S FETCHED ARTICLES, WORKS
router.get('/figure/:figureName/fetched', requireUser, async (req, res) => {
    try {
        const figureName = req.params.figureName;

        const articles = await fetchArticlesFromNewYorkTimes(`"${figureName}"`);

        const articlesObj = {};
        for (let i = 0; i < articles.length; i++) {
            const al = articles[i];
            articlesObj[`${al.url}`] = al;
        }

        return res.json(articlesObj);
    }
    catch (err) {
        return res.json({});
    }
})


//CREATE - SAVE AN ARTICLE, WORKS
router.post('/', requireUser, async (req, res) => {
    try {
        const headline = req.body.headline;
        const summary = req.body.summary;
        const source = req.body.source;
        const publishedDate = req.body.publishedDate;
        const url = req.body.url;
        const figureId = req.body.figureId;

        const groups = await Group.find({ user: req.user._id });

        let user = await req.user.populate("savedArticles");

        let article = await Article.findOne({
            url
        });
        if (!article) {
            article = new Article({
                headline,
                summary,
                source,
                publishedDate,
                url
            });
        }

        if (!hasArticle(user, url)) {
            await article.save();
            user.savedArticles.push(article);
            await user.save();
        }

        const articles = user.savedArticles;

        const articlesObj = {};
        for (let i = 0; i < articles.length; i++) {
            articlesObj[`"${articles[i]._id}"`] = articles[i];
        }

        return res.json(articlesObj);
    }
    catch (err) {
        return res.json({});
    }
});

//DELETE - UNSAVE AN ARTICLE, WORKS
router.delete('/:id', requireUser, async (req, res) => {
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

        await user.populate("savedArticles");
        const articles = user.savedArticles;

        const articlesObj = {};
        for (let i = 0; i < articles.length; i++) {
            await articles[i].populate("figure");
            articlesObj[`"${articles[i]._id}"`] = articles[i];
        }

        return res.json(articlesObj);
    }
    catch(err) {
        return res.json({});
    }
});


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


module.exports = router;