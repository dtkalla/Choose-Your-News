const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
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
            savedArticle.figure._id.toString() === figureId.toString();
    });
}

//SAVE AN ARTICLE
router.post('/', requireUser, async (req, res, next) => {
  try {
    const url = req.body.url;
    
    const figureId = req.body.figureId;

    let article = Article.find({
        url: url,
        figure: figureId
    });

    if (!article) {
        article = new Article({
            headline:       req.body.headline,
            summary:        req.body.summary,
            publishedDate:  req.body.publishDate,
            url:            req.body.url,
            figure:         req.body.figureId
        });
    }
      
    const user = req.user.populate("savedArticles");

    hasArticle(user, req.body.url)
    await article.save();

    // req.user.savedArticles.push(article._id); //Test this; if it doesn't work, find user by req.user._id
    // article = await article.populate('author', '_id, username');
    return res.json(article);
  }
  catch(err) {
    next(err);
  }
});


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