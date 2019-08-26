const Sport = require('../models/sport');

exports.getSports = (req, res, next) => {
    Sport.find()
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not get sports."
        });
    });
}

exports.createSport = (req, res, next) => {
    const post = new Sport({
        name: req.body.name
    });
    post.save()
    .then(createdSport => {
        res.status(201).json({
            message: 'success',
            sportId: createdSport._id
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Creating sport failed.'
        })
    });
}

exports.deleteSports = (req, res, next) => {
    Sport.deleteMany({ _id: {$in: req.body.sports }})
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Deleting sport failed.'
        })
    });
}

exports.updateSport = (req, res, next) => {
    Sport.findOne({_id: req.params.id})
    .then((document) => {
        if(!document) {
            res.status(404).send({
                message: 'Record not found.'
            });
        } else {
            document.name = req.body.name;
            document.save()
            .then(() => {
                res.status(200).json({
                    message: 'success',
                    data: document
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Saving updated sport failed.'
                })
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Updating sport failed.'
        })
    });
}