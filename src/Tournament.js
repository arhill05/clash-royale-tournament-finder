import React, {Component} from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { distanceInWords } from 'date-fns';

const Tournament = ({tournament}) => {
    return (
        <div className="tournament">
            <h1>{tournament.name}</h1>
            <h2>Starts in {distanceInWordsToNow(tournament.startTime)}</h2>
            <p>{tournament.description}</p>
            <p>Password: {tournament.password}</p>
        </div>
    )
}

export default Tournament;