const router = require('express').Router();
let Ticket = require('../models/ticket.model');

// GET
router.route('/').get((req, res) => {
    Ticket.find()
    .then(tickets => res.json(tickets))
    .catch(err => res.status(400).json('Error: ' + err));
});

// returning a ticket item given an id
router.route('/:id').get((req, res) => {
    Ticket.findById(req.params.id)
    .then(ticket => res.json(ticket))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;