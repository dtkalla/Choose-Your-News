const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Article = mongoose.model('Article');
const { requireUser } = require('../../config/passport');
// const validateArticleInput = require('../../validation/articles');

router.get('/', async (req, res) => {
    try {
        const articles = await Article.find()
            .sort({ createdAt: -1 })
            .populate("figure");
        return res.json(articles);
    }
    catch (err) {
        return res.json([]);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id)
            .sort({ createdAt: -1 })
            .populate("figure");
        return res.json(article);
    }
    catch (err) {
        const error = new Error('Article not found');
        error.statusCode = 404;
        error.errors = { message: "No article found with that id" };
        return next(error);
    }
})

router.get('/figure/:figureId', async (req, res, next) => {
    try {
        const articles = await Article.find({ figure: req.params.figureId })
            .sort({ createdAt: -1 })
            .populate("figure");
        return res.json(articles);
    } catch (err) {
        return res.json([]);
    }
})

router.get('/user/:userId', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)
            .sort({ createdAt: -1 })
            .populate("savedArticles");
        return res.json(user.savedArticles);
    } catch (err) {
        return res.json([]);
    }
})

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no 
// current user.) Also attach validateArticleInput as a middleware before the 
// route handler.
// router.post('/', requireUser, validateArticleInput, async (req, res, next) => {
//   try {
//     let article = Article.find({ url : req.body.url })
//     if (!article) {
//         const newArticle = new Article({
//             headline: req.body.headline,
//             summary: req.body.summary,
//             publishedDate: req.body.publishDate,
//             url: req.body.url,
//             userIds: [req.user._id],
//         });

//         article = await newArticle.save()
//     } else {
//         article.userIds.push(req.user._id)
//     }

//     // req.user.savedArticles.push(article._id); //Test this; if it doesn't work, find user by req.user._id
//     // article = await article.populate('author', '_id, username');
//     return res.json(article);
//   }
//   catch(err) {
//     next(err);
//   }
// });


// router.delete('/:id', requireUser, validateArticleInput, async (req, res, next) => {
//     try {
//         const article = await Article.findById(req.params.id)
//         article.userIds.delete(req.user._id)

//         if (article.userIds == []) article.delete()

//       // req.user.savedArticles.push(article._id); // Test this; if it doesn't work, find user by req.user._id
//       // article = await article.populate('author', '_id, username');
//         // return res.json(article);
//     }
//     catch(err) {
//         next(err);
//     }
// });




module.exports = router;