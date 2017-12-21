import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom';

import './App.css';
import Home from './Home';
import Add from './AddTournament';
import TournamentList from './TournamentsList';

const NotFound = () => <div>That page doesn't exist :(</div>
const HomeHeaderButtons = () => (
  <div>
    <Link to="/list" className="button button-primary">
      Find Tournaments
    </Link>
    <Link to="/add" className="button button-secondary">
      Add a Tournament
    </Link>
  </div>
)

const OtherHeaderButtons = () => (
  <div>
    <button className="button button-primary">
      Go Back Home
    </button>
  </div>
)

const Layout = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Clash Royale Tournament Finder</h1>
      <Route path="/" exact component={HomeHeaderButtons}></Route>
    </header>
    <main>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/add" component={Add}/>
        <Route path="/list" component={TournamentList}/>
        <Route path="/404" component={NotFound}/>
        <Redirect to="/404"/>
      </Switch>
    </main>
  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    );
  }
}

export default App;