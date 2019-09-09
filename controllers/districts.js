const District = require('../models/district');

exports.getDistricts = (req, res, next) => {
    District.find({}, null, {sort: {name: 1}})
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not get districts."
        });
    });
}

exports.createDistrict = (req, res, next) => {
    const district = new District({
        name: req.body.name
    });
    district.save()
    .then(createdDistrict => {
        res.status(201).json({
            message: 'success',
            districtId: createdDistrict._id
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Creating district failed.'
        })
    });
}

exports.deleteDistrict = (req, res, next) => {
    District.remove({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not delete district."
        });
    });;
}

exports.updateDistrict = (req, res, next) => {
    District.findOne({_id: req.params.id})
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
                    message: 'Saving updated district failed.'
                })
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Updating district failed.'
        })
    });
}