const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Group = mongoose.model('Group');
const Figure = mongoose.model('Figure');

const { requireUser } = require('../../config/passport');
const { fetchArticlesFromNewYorkTimes } = require('../../config/api');

//ONLY FOR TESTING
router.get('/', async (req, res) => {
    try {
        const figures = await Figure.find();
            
        return res.json(figures);
    }
    catch (err) {
        return res.json([]);
    }
})

const hasFigure = (groups, figureId) => {
    for(let i = 0; i < groups.length; i++) {
        const idx = groups[i].figures.indexOf(figureId);
        if (idx !== -1) {
            return true;
        }
    }
    return false;
}

//CREATE A FIGURE
router.post('/', requireUser, async (req, res) => {
    try {
        let figure = await Figure.findOne({ name: req.body.name });
        if (!figure) {
            const newFigure = new Figure({
                name: req.body.name
            });
            figure = await newFigure.save();
        }

        const userId = req.user._id;

        const figureId = figure._id;

        let groups = await Group.find({ user: userId });

        if (!hasFigure(groups, figureId)) {
            const noGroup = groups.find(group => group.name === "No group");

            noGroup.figures.push(figure._id);

            await noGroup.save();
        }

        groups = await Group.find({ user: userId }).populate("figures");

        const groupsObj = {};
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            groupsObj[group._id] = group;
        }

        return res.json(groupsObj);
    }
    catch (err) {
        return res.json(null);
    }
});

//READ A FIGURE
router.get('/:id', requireUser, async (req, res) => {
    try {
        const user = await req.user.populate("savedArticles");

        const figureId = req.params.id;

        const figure = await Figure.findById(figureId);

        const savedArticles = user.savedArticles
            .filter(savedArticle => 
                savedArticle.figure.toString() === figure._id.toString());
        
        const obj = {
            ...figure._doc,
            savedArticles: savedArticles,
            fetchedArticles: await fetchArticlesFromNewYorkTimes(`"${figure.name}"`)
        };

        return res.json(obj);
    }
    catch (err) {
        return res.json(null);
    }
})

//DELETE A FIGURE
router.delete('/:id', requireUser, async (req, res) => {
    try {
        const userId = req.user._id;
        
        const figureId = req.params.id;

        const allGroups = await Group.find();

        let groups = allGroups.filter(group => 
            group.user.toString() === userId.toString());
        
        for(let i = 0; i < groups.length; i++){
            const idx = groups[i].figures.indexOf(figureId);
            if (idx !== -1){
                groups[i].figures = groups[i].figures.slice(0, idx)
                    .concat(groups[i].figures.slice(idx+1));
                await groups[i].save();
            }
        }

        if (!hasFigure(allGroups, figureId)) {
            await Figure.findByIdAndRemove(figureId);
        }

        groups = await Group.find({ user: userId }).populate("figures");

        const groupsObj = {};
        for (let i = 0; i < groups.length; i++) {
            const gp = groups[i];
            groupsObj[`${gp._id}`] = gp;
        }

        return res.json(groupsObj);
    }
    catch (err) {
        return res.json(null);
    }
});

module.exports = router;