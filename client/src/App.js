import React, {Component} from 'react';
import addMinutes from 'date-fns/add_minutes';
import addHours from 'date-fns/add_hours';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import './App.css';
import Tournament from './Tournament';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tournaments: []
    };
  }

  async getStartingTournaments() {
    const response = await fetch('api/tournaments');
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
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clash Royale Tournament Finder</h1>
          <button className="button button-primary">
            Find Tournaments
          </button>
          <button className="button button-secondary">
            Add a Tournament
          </button>
        </header>
        <section className="content">
          <section className="current-tournaments">
            <h2>
              Current Tournaments
            </h2>
            <div className="tournaments-content">
              {tournamentItems}
            </div>
          </section>
        </section>
      </div>
    );
  }
}

export default App;