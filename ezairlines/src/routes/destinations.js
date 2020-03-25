const router = require('express').Router();
let Destination = require('../models/destination.model');

// GET
router.route('/').get((req, res) => {
    Destination.find()
    .then(destinations => res.json(destinations))
    .catch(err => res.status(400).json('Error: ' + err));
});

// returning a destination item given an id
router.route('/:id').get((req, res) => {
    Destination.findById(req.params.id)
    .then(destination => res.json(destination))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;