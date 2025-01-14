import React, { Component, Fragment } from 'react';
import Input from './Input';
import './AppClass.css'

export default class AppClass extends Component {
    constructor(props) {
        super(props);

        this.firstNameRef = React.createRef(null);
        this.lastNameRef = React.createRef(null);
        this.dobRef = React.createRef(null);

        this.state = {
            isTrue: false,
            crowd: [],
        };
    }

    setFirstName = (newFirstName) => {
        this.setState({firstName: newFirstName});
    }

    setLastName = (newLastName) => {
        this.setState({lastName: newLastName});
    }

    setDob = (newDob) => {
        this.setState({dob: newDob});
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.state.firstName !== "") {
            this.addPerson(this.state.firstName, this.state.lastName, this.state.dob);
        }
    }

    addPerson = (newFirst, newLast, newDob) => {
        let newPerson = {
            id: this.state.crowd.length + 1,
            firstName: newFirst,
            lastName: newLast,
            dob: newDob,
        }

        const newList = this.state.crowd.concat(newPerson);

        const sorted = newList.sort((a,b) => {
            if (a.lastName < b.lastName) {
                return -1;
            } else if (a.lastName > b.lastName) {
                return 1;
            }
            return 0;
        })

        this.setState({crowd: sorted, firstName: "", lastName: "", dob: ""})

        this.firstNameRef.current.value = ""
        this.lastNameRef.current.value = ""
        this.dobRef.current.value = ""
    }

    componentDidMount() {
        this.setState({
            firstName: "",
            lastName: "",
            dob: "",
            crowd: [{
                id: 1,
                firstName: "Sudarshan",
                lastName: "Raptor",
                dob: "21-09-2009"
            },
            {
                id: 2,
                firstName: "Sud",
                lastName: "TheRaptor",
                dob: "21-09-2010"
            }],
        })
    }

    toggleTrue = () => {
        if (this.state.isTrue) {
            this.setState({
                isTrue: false,
            })
            return
        }
        this.setState({
            isTrue: true,
        })
    }

    render() {
        return (
            <>
                <hr />
                <h1 className="h1-red">{this.props.msg}</h1> 
                <hr />
                {this.state.isTrue &&
                    <Fragment>
                        <p>The current value of isTrue is true</p>
                        <hr />
                    </Fragment>
                }
                <hr />  
                {this.state.isTrue
                ? <p>Is true</p>
                : <p>Is false</p>
                }
                <hr />
                <a href="#!" className="btn btn-outline-secondary" onClick={this.toggleTrue}>Toggle isTrue</a>

                <hr />
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <Input
                            title="First Name"
                            type="text"
                            name="first-name"
                            ref={this.firstNameRef}
                            autoComplete="first-name-new"
                            className="form-control"
                            onChange={(event) => this.setFirstName(event.target.value)} // the state can be set like this
                        ></Input>

                        <Input
                            title="Last Name"
                            type="text"
                            name="last-name"
                            ref={this.lastNameRef}
                            autoComplete="last-name-new"
                            className="form-control"
                            onChange={(event) => this.setState({lastName: event.target.value})} // or the state can be set like this
                        ></Input>

                        <Input
                            title="DOB"
                            type="date"
                            name="dob"
                            ref={this.dobRef}
                            autoComplete="dob-new"
                            className="form-control"
                            onChange={(event) => this.setDob(event.target.value)}
                        ></Input>

                        <input type="submit" value="Submit" className="btn btn-primary"></input>
                    </div>
                </form>

                <div>
                    First Name: {this.state.firstName} <br />
                    Last Name: {this.state.lastName} <br />
                    DOB: {this.state.dob} <br />
                </div>

                <hr />

                <h3>People</h3>
                <ul className="list-group">
                    {this.state.crowd.map((person) => (
                        <li key={person.id} className="list-group-item">{person.firstName} {person.lastName}</li>
                    ))}
                </ul>
            </>
        );
    }
}