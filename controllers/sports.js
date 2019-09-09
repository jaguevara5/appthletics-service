const Sport = require('../models/sport');

exports.getSports = (req, res, next) => {
    Sport.find({}, null, {sort: {name: 1}})
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
    const sport = new Sport({
        name: req.body.name
    });
    sport.save()
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

exports.deleteSport = (req, res, next) => {
    Sport.remove({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not delete sport."
        });
    });;
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