const express = require('express');

const Stadium = require('../models/stadium');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
    const post = new Stadium({
        name: req.body.name,
        address: req.body.address
    });
    post.save().then(createdStadium => {
        res.status(201).json({
            message: 'success',
            stadiumId: createdStadium._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {
    Stadium.find({}, null, {sort: {name: 1}})
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

exports.deleteStadium = (req, res, next) => {
    Stadium.remove({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not delete stadium."
        });
    });;
}

router.put('/:id', (req, res, next) => {

    Stadium.findOne({_id: req.params.id}, (err, foundStadium) => {
        if(err) {
            res.status(500).send();
        } else {
            if(!foundStadium) {
                res.status(404).send();
            } else {
                foundStadium.name = req.body.name;

                foundStadium.save((err, updatedStadium) => {
                    if(err) {
                        res.status(500).send();
                    } else {
                        res.status(200).json({
                            message: 'success',
                            data: updatedStadium
                        });
                    }
                });
            }
        }
    });
});

module.exports = router;