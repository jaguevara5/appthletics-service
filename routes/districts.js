const express = require('express');

const District = require('../models/district');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
    const post = new District({
        name: req.body.name
    });
    post.save().then(createdDistrict => {
        res.status(201).json({
            message: 'success',
            districtId: createdDistrict._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {
    District.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

router.delete('/:id', (req, res, next) => {
    District.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

router.put('/:id', (req, res, next) => {
    District.findOne({_id: req.params.id}, (err, foundDistrict) => {
        if(err) {
            res.status(500).send();
        } else {
            if(!foundDistrict) {
                res.status(404).send();
            } else {
                foundDistrict.name = req.body.name;

                foundDistrict.save((err, updatedDistrict) => {
                    if(err) {
                        res.status(500).send();
                    } else {
                        res.status(200).json({
                            message: 'success',
                            data: updatedDistrict
                        });
                    }
                });
            }
        }
    });
});

module.exports = router;