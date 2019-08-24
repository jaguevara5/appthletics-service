const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('', checkAuth, (req, res, next) => {
    User.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    });
});

router.post('/new', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            username: req.body.username,
            name: req.body.name,
            lastname: req.body.lastname,
            userId: req.body.userId,
            password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'success',
                data: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Invalid authentication credentials!"
            });
        });
    });
});

router.post('/delete', (req, res, next) => {
    User.deleteMany({ _id: {$in: req.body.users }})
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    });
});

router.put('/:id', (req, res, next) => {
    if(req.body.password) {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.findOne({_id: req.params.id}, (err, foundUser) => {
                if(err) {
                    res.status(500).send();
                } else {
                    if(!foundUser) {
                        res.status(404).send();
                    } else {
                        foundUser.username = req.body.username;
                        foundUser.name = req.body.name;
                        foundUser.lastname = req.body.lastname;
                        foundUser.password = hash;
                        foundUser.userId = req.body.userId;

                        foundUser.save((err, updatedUser) => {
                            if(err) {
                                res.status(500).send();
                            } else {
                                res.status(200).json({
                                    message: 'success'
                                });
                            }
                        });
                    }
                }
            });
        });
    } else {
        User.findOne({_id: req.params.id}, (err, foundUser) => {
            if(err) {
                res.status(500).send();
            } else {
                if(!foundUser) {
                    res.status(404).send();
                } else {
                    foundUser.username = req.body.username;
                    foundUser.name = req.body.name;
                    foundUser.lastname = req.body.lastname;
                    foundUser.userId = req.body.userId;

                    foundUser.save((err, updatedUser) => {
                        if(err) {
                            res.status(500).send();
                        } else {
                            res.status(200).json({
                                message: 'success',
                                data: updatedUser
                            });
                        }
                    });
                }
            }
        });
    }
});

module.exports = router;