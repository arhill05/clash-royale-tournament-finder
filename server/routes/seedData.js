var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Tournament = mongoose.model('Tournament');
const addMinutes = require('date-fns/add_minutes');

const tournaments = [{
    name: 'Tournament 1',
    startTime: addMinutes(Date.now(), -16),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempus est. ' +
      'Cras ac neque a odio ',
    password: '123456',
    timeDescription: null,
    maxPlayers: 50
  }, {
    name: 'Tournament 2',
    startTime: addMinutes(Date.now(), -8),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempus est. ' +
      'Cras ac neque a odio ',
    password: '123456',
    timeDescription: null,
    maxPlayers: 50
  }, {
    name: 'Tournament 3',
    startTime: addMinutes(Date.now(), 50),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempus est. ' +
      'Cras ac neque a odio ',
    password: '123456',
    timeDescription: null,
    maxPlayers: 50
  }, {
    name: 'Tournament 4',
    startTime: addMinutes(Date.now(), 70),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempus est. ' +
      'Cras ac neque a odio ',
    password: '123456',
    timeDescription: null,
    maxPlayers: 50
  }, {
    name: 'Tournament 5',
    startTime: addMinutes(Date.now(), 100),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempus est. ' +
      'Cras ac neque a odio ',
    password: '123456',
    timeDescription: null,
    maxPlayers: 50
  }, {
    name: 'Tournament 6',
    startTime: addMinutes(Date.now(), 120),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempus est. ' +
      'Cras ac neque a odio ',
    password: '123456',
    timeDescription: null,
    maxPlayers: 50
  },
  {
    name: 'Old Tournament',
    startTime: addMinutes(Date.now(), -180),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempus est. ' +
      'Cras ac neque a odio ',
    password: '123456',
    timeDescription: null,
    maxPlayers: 50
  }]

router.get('/', (req, res, next) => {
   createTournaments(req, res);
})

createTournaments = async (req, res) => {
    tournaments.forEach(tournament => {
        let response = new Tournament(tournament).save();
    });

    res.json('success');
}

module.exports = router;