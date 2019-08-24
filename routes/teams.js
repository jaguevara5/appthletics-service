const express = require('express');

const Team = require('../models/team');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
    const post = new Team({
        name: req.body.name,
        district: req.body.district,
        sport: req.body.sport,
        school: req.body.school,
        category: req.body.category
    });
    post.save().then(createdTeam => {
        res.status(201).json({
            message: 'success',
            teamId: createdTeam._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {
    Team.find()
    .populate('district')
    .populate('sport')
    .populate('school')
    .populate('category')
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

router.delete('/:id', (req, res, next) => {
    Team.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

router.put('/:id', (req, res, next) => {

    Team.findOne({_id: req.params.id}, (err, foundTeam) => {
        if(err) {
            res.status(500).send();
        } else {
            if(!foundTeam) {
                res.status(404).send();
            } else {
                foundTeam.name = req.body.name;
                foundTeam.district = req.body.district;
                foundTeam.sport = req.body.sport;
                foundTeam.school = req.body.school;
                foundTeam.category = req.body.category;

                foundTeam.save((err, updatedTeam) => {
                    if(err) {
                        res.status(500).send();
                    } else {
                        res.status(200).json({
                            message: 'success',
                            data: updatedTeam
                        });
                    }
                });
            }
        }
    });
});

module.exports = router;