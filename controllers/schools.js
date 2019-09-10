const School = require('../models/school');

exports.getSchools = (req, res, next) => {
    School.find({}, null, {sort: {name: 1}})
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not get schools."
        });
    });
}

exports.createSchool = (req, res, next) => {
    const post = new School({
        name: req.body.name,
        address: req.body.address
    });
    post.save()
    .then(createdSchool => {
        res.status(201).json({
            message: 'success',
            schoolId: createdSchool._id
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not create school."
        });
    });
}

exports.deleteSchool = (req, res, next) => {
    School.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not delete school."
        });
    });
}

exports.updateSchool = (req, res, next) => {
    School.findOne({_id: req.params.id}, (err, foundSchool) => {
        if(err) {
            res.status(500).send();
        } else {
            if(!foundSchool) {
                res.status(404).send();
            } else {
                foundSchool.name = req.body.name;
                foundSchool.address = req.body.address;

                foundSchool.save((err, updatedSchool) => {
                    if(err) {
                        res.status(500).send();
                    } else {
                        res.status(200).json({
                            message: 'success',
                            data: updatedSchool
                        });
                    }
                });
            }
        }
    });
}