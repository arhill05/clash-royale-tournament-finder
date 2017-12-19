import React, {Component} from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { distanceInWords } from 'date-fns';

const Tournament = ({tournament}) => {
    return (
        <div className="tournament">
            <h2>{tournament.name}</h2>
            <h3>{tournament.timeDescription}</h3>
            <p>{tournament.description}</p>
            <p>Password: {tournament.password}</p>
            <p>Max Players: {tournament.maxPlayers}</p>
        </div>
    )
}

export default Tournament;