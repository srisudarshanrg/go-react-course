import React, { Fragment, useEffect, useRef, useState } from 'react';
import "./App.css"
import Input from './Input';

function App(props) {
    const [isTrue, setIsTrue] = useState(false) // Here useState returns an array whose first element is a boolean
                                                // and the second element is a function that updates the array
                                                // example of how destructuring works:
                                                // const [a, b] = [aValue, bValue]
                                                // so, here useState returns [bool, functionToUpdateBool] which do this:
                                                // isTrue is populated by the bool and setIsTrue is populated by the function that updates the bool
    const [crowd, setCrowd] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dob, setDob] = useState("")

    // refs
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const dobRef = useRef(null);
    
    const toggleTrue = () => {
        if (isTrue) {
            setIsTrue(false)
            return
        }
        setIsTrue(true)
    };

    useEffect(() => {
        console.log("useEffect fired")
        let people = [
            {
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
            },
        ]
        setCrowd(people);
        console.log(people)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        if (lastName !== "") {
            addPerson(firstName, lastName, dob)
        }
    }

    const addPerson = (newFirst, newLast, newDOB) => {
        let newPerson = {
            id: crowd.length + 1,
            firstName: newFirst,
            lastName: newLast,
            dob: newDOB,
        }

        const newList = crowd.concat(newPerson);

        const sorted = newList.sort((a,b) => {
            if (a.lastName < b.lastName) {
                return -1;
            } else if (a.lastName > b.lastName) {
                return 1;
            }
            return 0;
        })

        setCrowd(sorted);
        setFirstName("")
        setLastName("")
        setDob("")

        firstNameRef.current.value = ""
        lastNameRef.current.value = ""
        dobRef.current.value = ""
    }

    return (        
        <Fragment>
           <hr />
           <h1 className="h1-green">{props.msg}</h1> 

           <hr />

           {isTrue &&
                <Fragment>
                    <p>The current value of isTrue is true</p>
                    <hr />
                </Fragment>
           }

           <hr />

           {isTrue
            ? <p>Is true</p>
            : <p>Is false</p>
           }
           <hr />

           <a href="#!" className="btn btn-outline-secondary" onClick={toggleTrue}>Toggle isTrue</a>

           <hr />
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <Input
                            title="First Name"
                            type="text"
                            name="first-name"
                            ref={firstNameRef}
                            autoComplete="first-name-new"
                            className="form-control"
                            onChange={(event) => setFirstName(event.target.value)} // event: event object passed to event handler
                                                                                // event.target: DOM element that triggered the event (here, the input field) 
                                                                                // event.target.value: current value of input field
                        ></Input>

                        <Input
                            title="Last Name"
                            type="text"
                            name="last-name"
                            ref={lastNameRef}
                            autoComplete="last-name-new"
                            className="form-control"
                            onChange={(event) => {setLastName(event.target.value)}}
                        ></Input>

                        <Input
                            title="DOB"
                            type="date"
                            name="dob"
                            ref={dobRef}
                            autoComplete="dob-new"
                            className="form-control"
                            onChange={(event) => {setDob(event.target.value)}}
                        ></Input>

                        <input type="submit" value="Submit" className="btn btn-primary"></input>
                    </div>
                </form>

                <div>
                    First Name: {firstName} <br />
                    Last Name: {lastName} <br />
                    DOB: {dob} <br />
                </div>
           <hr />

           <h3>People</h3>
           <ul className="list-group">
                {crowd.map((person) => (
                    <li key={person.id} className="list-group-item">{person.firstName} {person.lastName}</li>
                ))}
           </ul>
        </Fragment>
        
        // instead of <Fragment></Fragment> <></> can be used as well
    );
}

export default App;