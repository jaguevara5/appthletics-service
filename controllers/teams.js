const Team = require('../models/team');

exports.getTeams = (req, res, next) => {
    Team.find({ district: req.query.district, sport: req.query.sport, category: req.query.category })
    .populate('district')
    .populate('sport')
    .populate('school')
    .populate('category')
    .then((documents) => {
        res.status(200).json({
            message: 'success',
            data: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not get teams."
        });
    });
}

exports.createTeam = (req, res, next) => {
    const post = new Team({
        name: req.body.name,
        district: req.body.district,
        sport: req.body.sport,
        school: req.body.school,
        category: req.body.category
    });
    post.save()
    .then(createdTeam => {
        res.status(201).json({
            message: 'success',
            teamId: createdTeam._id
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not create team."
        });
    });
}

exports.deleteTeam = (req, res, next) => {
    Team.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'success'
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not delete team."
        });
    });
}

exports.updateTeam = (req, res, next) => {

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
}