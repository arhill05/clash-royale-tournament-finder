import React, {Component} from 'react';
import addHours from 'date-fns/add_hours';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import Tournament from './Tournament';

const baseUrl = process.env.NODE_ENV === 'production' ? window.location.href + '/api/': "";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tournaments: []
        };
    }

    async getStartingTournaments() {
        const response = await fetch('tournaments/limit/6');
        const tournaments = await response.json();
        this.setStateAsync({tournaments: tournaments})
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    getTimeDescription(time) {
        let response = '';
        if (Date.now() < time) {
            response = `Starts in ${distanceInWordsStrict(Date.now(), time)}`;
        } else {
            response = `Ends in ${distanceInWordsStrict(Date.now(), addHours(time, 1))}`
        }

        return response;
    }

    async componentDidMount() {
        await this.getStartingTournaments();
    }

    render() {
        const tournamentItems = this.state.tournaments.length
            ? this
                .state
                .tournaments
                .map((tournament, index) => {
                    return <Tournament key={index} tournament={tournament}/>;
                })
            : null;
        console.log(this.state.tournaments);
        return (
                <section className="home">
                    <section className="current-tournaments">
                        <h2>
                            Current Tournaments
                        </h2>
                        <div className="tournaments-content">
                            {tournamentItems}
                        </div>
                    </section>
                </section>
        );
    }
}

export default Home;