import React, {Component} from 'react';
import addMinutes from 'date-fns/add_minutes';
import './App.css';
import Tournament from './Tournament';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tournaments: []
    };
  }

  getStartingTournaments() {
    const tournaments = [
      {
        name: 'Tournament 1',
        startTime: addMinutes(Date.now(), 8),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempus est. ' +
            'Cras ac neque a odio ',
        password: '123456'
      }, {
        name: 'Tournament 2',
        startTime: addMinutes(Date.now(), 35),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempus est. ' +
            'Cras ac neque a odio ',
        password: '123456'
      }, {
        name: 'Tournament 3',
        startTime: addMinutes(Date.now(), 50),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempus est. ' +
            'Cras ac neque a odio ',
        password: '123456'
      }, {
        name: 'Tournament 4',
        startTime: addMinutes(Date.now(), 70),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempus est. ' +
            'Cras ac neque a odio ',
        password: '123456'
      }, {
        name: 'Tournament 5',
        startTime: addMinutes(Date.now(), 100),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempus est. ' +
            'Cras ac neque a odio ',
        password: '123456'
      }, {
        name: 'Tournament 6',
        startTime: addMinutes(Date.now(), 120),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempus est. ' +
            'Cras ac neque a odio ',
        password: '123456'
      }
    ]
    this.setState({tournaments: tournaments})
  }

  componentDidMount() {
    this.getStartingTournaments();
  }

  render() {
    const tournamentItems = this.state.tournaments.map((tournament, index) => {
      return <Tournament key={index} tournament={tournament} />;
    })
    console.log(this.state.tournaments);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clash Royale Tournament Finder</h1>
          <button className="button button-primary">Find Tournaments</button>
          <button className="button button-secondary">Add a Tournament</button>
        </header>
        <section className="content">
          <section className="current-tournaments">
            <h2>Current Tournaments</h2>
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
