import React, {Component} from 'react';
import './tournaments-list.css';
import Tournament from './Tournament';

const baseUrl = process.env.NODE_ENV === 'production' ? window.location.href + '/api/': "";

class TournamentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tournaments: []
        };
    }
    setStateAsync = (state) => {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    componentDidMount = async() => {
        const tournamentsResponse = await fetch('tournaments');
        const tournaments = await tournamentsResponse.json();
        this.setState({tournaments: tournaments});
    }

    render() {
        const tournamentItems = this.state.tournaments.length
            ? this
                .state
                .tournaments
                .map((tournament, index) => {
                    return <li key={index}><Tournament tournament={tournament}/></li>;
                })
            : null;
        return (
            <section className="tournaments-list">
                <div className="list-container">
                    <h2>Tournament List</h2>
                    <h3>Total Number of Tournaments: {this.state.tournaments.length}</h3>
                    <ul>
                        {tournamentItems}
                    </ul>
                </div>
            </section>
        )
    }
}

export default TournamentList;