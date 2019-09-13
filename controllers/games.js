const Game = require('../models/game');

exports.getGames = (req, res, next) => {
    Game.find({ district: req.query.district, sport: req.query.sport, category: req.query.category })
        .populate('homeTeam')
        .populate('awayTeam')
        .populate('district')
        .populate('category')
        .populate('stadium')
        .populate('sport')
        .then((documents) => {
            res.status(200).json({
                message: 'success',
                data: documents
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Could not get games."
            });
        });
}