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

//CREATE A FIGURE
router.post('/', requireUser, async (req, res) => {
    try {
        const newFigure = new Figure({
            name: req.body.name
        });

        const figure = await newFigure.save();

        const userId = req.user._id;

        const noGroup = await Group.find({ user: userId, name: "No group" });
        
        noGroup[0].figures.push(figure._id);
        await noGroup[0].save();

        return res.json(`Successfully added ${figure.name}`);
    }
    catch (err) {
        return res.json(null);
    }
});

//READ A FIGURE
router.get('/:id', async (req, res) => {
    try {
        const figureId = req.params.id;

        const figure = await Figure.findById(figureId);

        const obj = {
            ...figure._doc,
            articles: await fetchArticlesFromNewYorkTimes(`"${figure.name}"`)
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

        const groups = await Group.find({ user: userId });


        for(let i = 0; i < groups.length; i++){
            const idx = groups[i].figures.indexOf(figureId);
            if (idx !== -1){
                groups[i].figures = groups[i].figures.slice(0, idx)
                    .concat(groups[i].figures.slice(idx+1));
                await groups[i].save();
            }
        }

        await Figure.findByIdAndRemove(figureId);

        return res.json(`Successfully deleted.`);
    }
    catch (err) {
        return res.json(null);
    }
});

module.exports = router;