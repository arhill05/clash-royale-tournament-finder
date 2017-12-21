import React, {Component} from 'react';
import addHours from 'date-fns/add_hours';
import format from 'date-fns/format';
import './add-form.css';
import swal from 'sweetalert2';

const baseUrl = process.env.NODE_ENV === 'production' ? window.location.href + '/api/': "";

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tournament: {
                name: "",
                startTime: format(addHours(Date.now(), 2), 'YYYY-MM-DDTHH:mm'),
                description: "",
                password: "",
                maxPlayers: 50
            }
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let tournament = this.state.tournament;
        tournament[name] = value;
        this.setState({tournament});
        console.log(this.state.tournament);
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        const response = await fetch('tournaments', {
            method: 'post',
            body: JSON.stringify(this.state.tournament),
            headers: new Headers({
                "Content-Type":"application/json"
            })
        });

        if (response.ok) {
            swal({
                title: 'Success!',
                text: 'Your tournament was successfully added',
                type: 'success',
                confirmButtonClass: 'button button-primary',
                buttonsStyling: false
            });
            this.setState({
                tournament: {
                    name: "",
                    startTime: "",
                    description: "",
                    password: "",
                    maxPlayers: ""
                }
            });
        } else {
            swal({
                title: 'Uh oh!',
                text: 'There was an error trying to add your tournament. Try it again!',
                type: 'error',
                confirmButtonClass: 'button button-primary',
                buttonsStyling: false
            });
        }
    }

    render() {
        return (
            <section className="add">
                <div className="form-container">
                    <h2>Add Tournament</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Tournament Name</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.tournament.name}
                                onChange={this.handleInputChange}
                                required></input>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                rows="3"
                                cols="30"
                                type="text"
                                name="description"
                                value={this.state.tournament.description}
                                onChange={this.handleInputChange}></textarea>
                        </div>
                        <div className="form-group">
                            <label>Start Time</label>
                            <input
                                type="datetime-local"
                                name="startTime"
                                value={this.state.tournament.startTime}
                                onChange={this.handleInputChange}
                                required></input>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="text"
                                name="password"
                                value={this.state.tournament.password}
                                onChange={this.handleInputChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Max Players</label>
                            <input
                                type="number"
                                name="maxPlayers"
                                value={this.state.tournament.maxPlayers}
                                min="50"
                                onChange={this.handleInputChange}></input>
                        </div>
                        <input className="button button-primary" type="submit" value="Submit" />
                    </form>
                </div>
            </section>
        )
    }
}

export default Add;