const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Group = mongoose.model('Group');

const { requireUser } = require('../../config/passport');


//CREATE A GROUP, WORKS
router.post('/', requireUser, async (req, res) => {
    try {
        const userId = req.user._id;

        const newGroup = new Group({
            user: userId,
            name: req.body.name,
            figures: []
        });

        await newGroup.save();

        const groups = await Group.find({ user: userId }).populate("figures");

        const groupsObj = {};
        for (let i = 0; i < groups.length; i++) {
            const gp = groups[i];
            groupsObj[`${gp._id}`] = gp;
        }

        return res.json(groupsObj);
    }
    catch (err) {
        return res.json({});
    }
});


//READ CURRENT USER'S GROUPS, WORKS
router.get('/user/current', requireUser, async (req, res) => {
    try {
        const userId = req.user._id;

        const groups = await Group.find({ user: userId }).populate("figures");

        const groupsObj = {};
        for (let i = 0; i < groups.length; i++) {
            const gp = groups[i];
            groupsObj[gp._id] = gp;
        }

        return res.json(groupsObj);
    }
    catch (err) {
        return res.json({});
    }
})


//UPDATE - ADD A FIGURE TO A GROUP, WORKS
router.put('/:id/figure/:figureId', requireUser, async (req, res) => {
    try {
        const userId = req.user._id;

        const groupId = req.params.id;

        const figureId = req.params.figureId;

        let groups = await Group.find({ user: userId });
        
        let noGroup;

        let group;

        for (let i = 0; i < groups.length; i++) {
            if (groups[i].name === "No group") {
                noGroup = groups[i];
            }

            if (groups[i]._id.toString() === groupId) {
                group = groups[i];
            }
        }

        idx = noGroup.figures.indexOf(figureId);
        if (idx !== -1) {
            noGroup.figures = noGroup.figures.slice(0, idx)
                .concat(noGroup.figures.slice(idx + 1));
            await noGroup.save();
        }

        idx = group.figures.indexOf(figureId);
        if (idx === -1) {
            group.figures.push(figureId);
            await group.save();
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
        return res.json({});
    }
});


//UPDATE - REMOVE A FIGURE FROM A GROUP, WORKS
router.patch('/:id/figure/:figureId', requireUser, async (req, res) => {
    try {
        const userId = req.user._id;

        const groupId = req.params.id;

        const figureId = req.params.figureId;

        let groups = await Group.find({ user: userId });
        
        let hasGroup = false;

        let noGroup;

        let group;

        for (let i = 0; i < groups.length; i++) {
            if (!hasGroup &&
                groups[i]._id.toString() !== groupId &&
                groups[i].figures.indexOf(figureId) !== -1) {
                hasGroup = true;
            }

            if (groups[i].name === "No group") {
                noGroup = groups[i];
            }

            if (groups[i]._id.toString() === groupId) {
                group = groups[i];
            }
        }

        let idx;

        idx = group.figures.indexOf(figureId);
        if (idx !== -1) {
            group.figures = group.figures.slice(0, idx)
                .concat(group.figures.slice(idx + 1));
            await group.save();
        }

        if (!hasGroup) {
            idx = noGroup.figures.indexOf(figureId);
            if (idx === -1) {
                noGroup.figures.push(figureId);
                await noGroup.save();
            }
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
        return res.json({});
    }
});


//HELPER FOR DELETE A GROUP
const hasFigure = (groups, excludedGroupId, figureId) => {
    for (let i = 0; i < groups.length; i++) {
        if (groups[i]._id.toString() !== excludedGroupId) {
            const idx = groups[i].figures.indexOf(figureId);
            if (idx !== -1) {
                return true;
            }
        }
    }
    return false;
}

//DELETE A GROUP, WORKS
router.delete('/:id', requireUser, async (req, res) => {
    try {
        const groupId = req.params.id;

        const userId = req.user._id;

        let groups = await Group.find({ user: userId });

        let group;

        let noGroup;

        for (let i = 0; i < groups.length; i++) {
            if (groups[i]._id.toString() === groupId){
                group = groups[i];
            }
            if (groups[i].name === "No group") {
                noGroup = groups[i];
            }
        }

        const figures = group.figures;
        
        for (let i = 0; i < figures.length; i++){
            const figureId = figures[i]._id;
            if (!hasFigure(groups, groupId, figureId)) {
                noGroup.figures.push(figureId);
            }
        }

        await noGroup.save();

        await Group.findByIdAndRemove(groupId);

        groups = await Group.find({ user: userId }).populate("figures");

        const groupsObj = {};
        for (let i = 0; i < groups.length; i++) {
            const gp = groups[i];
            groupsObj[`${gp._id}`] = gp;
        }

        return res.json(groupsObj);
    }
    catch (err) {
        return res.json({});
    }
});


//UPDATE - SHARE/UNSHARE A GROUP
router.put('/:id', requireUser, async (req, res) => {
    try {
        const userId = req.user._id;
        const groupId = req.params.id;
        const groups = await Group.find({ user: userId });
        const group = groups.find(group => {
            return group.name !== "No group" && group._id.toString() === groupId;
        });

        group.shared = !group.shared;
        group.save();

        return res.json(`Group successfully ${group.shared ? "shared" : "unshared"}`);
    }
    catch (err) {
        return res.json(null);
    }
})


//ONLY FOR TESTING
router.get('/', async (req, res) => {
    try {
        const groups = await Group.find().populate("figures");

        return res.json(groups);
    }
    catch (err) {
        return res.json([]);
    }
})

module.exports = router;

// //READ A GROUP
// router.get('/:id', async (req, res) => {
//     try {
//         const groupId = req.params.id;

//         const group = await Group.findById(groupId).populate("figures"); //populate user?

//         const searchTerms = group.figures.map(figure => `"${figure.name}"`);

//         const obj = {
//             ...group._doc,
//             fetchedArticles: searchTerms.length === 0 ? [] :
//                 await fetchArticlesFromNewYorkTimes(searchTerms.join(" OR "))
//         };
        
//         return res.json(obj);
//     }
//     catch (err) {
//         return res.json(null);
//     }
// })