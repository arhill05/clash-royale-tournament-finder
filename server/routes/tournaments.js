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

handleTournamentDates = (tournaments) => {
  tournaments.forEach(tournament => {
    tournament.timeDescription = getTimeDescription(tournament.startTime);
  })
  tournaments = sortTournaments(tournaments);
  return tournaments;
}

getLimitedTournaments = async(req, res) => {
  let tournaments = await Tournament
    .find()
    .limit(Number(req.params.limit));
  tournaments = handleTournamentDates(tournaments);
  res.json(tournaments);
}

getTournaments = async(req, res) => {
  let tournaments = await Tournament.find();
  tournaments = handleTournamentDates(tournaments);
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
router.get('/:limit', getLimitedTournaments);
router.post('/', createTournament)

module.exports = router;