var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Tournament = mongoose.model('Tournament');
const addMinutes = require('date-fns/add_minutes');
const addHours = require('date-fns/add_hours');
const distanceInWordsStrict = require('date-fns/distance_in_words_strict');

getTimeDescription = (time) => {
  let response = '';
  if (Date.now() < time) {
    response = `Starts in ${distanceInWordsStrict(Date.now(), time)}`;
  } else {
    response = `Ends in ${distanceInWordsStrict(Date.now(), addHours(time, 1))}`
  }
  return response;
}

sortTournaments = (tournaments) => {
  return tournaments.sort((a, b) => {
    return a.startTime > b.startTime;
  })
}

handleTournamentDates = async(tournaments) => {
  let tournamentIdsToDelete = [];
  tournaments.forEach((tournament, index) => {
    if (addHours(tournament.startTime, 1) < Date.now()) {
      tournamentIdsToDelete.push(tournament.id);
      tournaments.splice(index, 1);
    } else {
      tournament.timeDescription = getTimeDescription(tournament.startTime);
    }
  })
  tournaments = sortTournaments(tournaments);
  let test = await Tournament.remove({
    _id: {
      $in: tournamentIdsToDelete
    }
  });
  return tournaments;
}

getLimitedTournaments = async(req, res) => {
  let tournaments = [];
  const limit = Number(req.params.limit);
  let count = null;
  while (tournaments.length < limit && tournaments.length != count) {
    count = await Tournament.count();
    tournaments = await Tournament
      .find()
      .limit(limit);
    tournaments = await handleTournamentDates(tournaments);
  }
  res.json(tournaments);
}

getTournaments = async(req, res) => {
  const count = await Tournament.count();
  let tournaments = await Tournament.find();
  tournaments = await handleTournamentDates(tournaments);
  res.json(tournaments);
}

createTournament = async(req, res) => {
  try {
    const tournament = await new Tournament(req.body).save();
    res.send('successfully added tournament. ' + tournament.toString());
  } catch (error) {
    res.send('An error occured. ' + error.message);
  }
}

router.get('/', getTournaments);
router.get('/limit/:limit', getLimitedTournaments);
router.post('/', createTournament)

module.exports = router;