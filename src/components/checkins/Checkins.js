import React, { Component } from 'react'
import {Button, Grid} from '@mantine/core'
import firebase from '../../firebase/firebase'
import moment from 'moment'
import SheetStats from './SheetStats'

export class Checkins extends Component {
    state = {
        events: null,
        selectedEvent: null,
        locations: null,
        selectedLocation: null,
        sheets: null,
        selectedSheet: null
    }
    componentDidMount() {
        this.getEvents();
    }

    getEvents = () => {
        let db = firebase.firestore();
        let eventRef = db.collection('events');
        eventRef.get().then(events => {
            var data = events.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            this.setState({
                events: data
            })
        }).catch((err) => {
            console.log("there's been an error.", err)

        }
        )
    }
    getLocations = (id) => {
        let db = firebase.firestore();
        let locRef = db.collection('locations').where('eventRef', '==', id);
        locRef.get().then(locations => {
            var data = locations.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            this.setState({
                locations: data
            })
        }).catch((err) => {
            console.log("there's been an error.", err)

        }
        )
    }

    getSheets = (id) => {
        let db = firebase.firestore();
        let sheetRef = db.collection('sheets').where('locationRef', '==', id).orderBy('date', 'desc');
        sheetRef.get().then(sheets => {
            var data = sheets.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            this.setState({
                sheets: data
            })
        }).catch((err) => {
            console.log("there's been an error.", err)

        }
        )
    }

    getAttendees = (sheetId) => {
        let db = firebase.firestore();
        let attendeeRef = db.collection('sheets').doc(sheetId).collection("attendees");
        attendeeRef.get().then(attendees => {
            var data = attendees.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            this.setState({
                attendees: data
            })
        }).catch((err) => {
            console.log("there's been an error.", err)

        }
        )
    }

    onEventsDropdownSelect = (e) => {

        this.setState({
            selectedEvent: null,
            locations: null,
            selectedLocation: null,
            sheets: null,
            selectedSheet: null,
            attendees: null,
        })
        var text = this.state.events.filter((obj) => {
            return obj.id === e
        })
        if (e !== "clear") {
            this.setState({
                selectedEvent: text[0].title
            })
        }


        this.getLocations(e);

    }
    onLocationsDropdownSelect = (e) => {

        this.setState({
            selectedLocation: null,
            selectedSheet: null
        })

        var text = this.state.locations.filter((obj) => {
            return obj.id === e
        })

        if (e !== "clear") {
            this.setState({
                selectedLocation: text[0].title
            })
        }
        this.getSheets(e);


    }
    onSheetsDropdownSelect = (e) => {

        this.setState({
            selectedSheet: null
        })

        var sheetObj = this.state.sheets.filter((obj) => {
            return obj.id === e
        })
        console.log(sheetObj)

        if (e !== "clear") {
            var date = moment(new Date(sheetObj[0].date.toDate())).format("MMMM Do YYYY")

            this.setState({
                selectedSheet: date
            })        
            this.getAttendees(sheetObj[0].id)

        }


    }

    test = () => {
        console.log(this.state.attendees)
    }
    render() {
        return (
            <div>

                <Grid>
                        <Grid.Col>
                            {/* <DropdownButton onSelect={this.onEventsDropdownSelect} id="dropdown-basic-button" title={this.state.selectedEvent ? (this.state.selectedEvent) : ('Select an event')}>
                                <Dropdown.Item eventKey='clear'>N/A</Dropdown.Item>
                                {this.state.events ?
                                    (
                                        this.state.events.map(event => {
                                            return (
                                                <Dropdown.Item key={event.id} eventKey={event.id}>{event.title}</Dropdown.Item>
                                            )
                                        })
                                    ) : ('Loading..')}
                            </DropdownButton> */}
                        </Grid.Col>

                        <Grid.Col>
                            {/* <DropdownButton disabled={this.state.selectedEvent ? ((this.state.locations && this.state.locations.length > 0) ? (false) : (true)) : (true)} onSelect={this.onLocationsDropdownSelect} id="dropdown-basic-button" title={this.state.selectedLocation ? (this.state.selectedLocation) : ('Select a location')}>
                                <Dropdown.Item eventKey='clear'>N/A</Dropdown.Item>

                                {this.state.locations ?
                                    (
                                        this.state.locations.map(location => {
                                            return (
                                                <Dropdown.Item key={location.id} eventKey={location.id}>{location.title}</Dropdown.Item>
                                            )
                                        })
                                    ) : ('Loading..')}
                            </DropdownButton> */}
                        </Grid.Col>

                        <Grid.Col>
                            {/* <DropdownButton disabled={this.state.selectedLocation ? ((this.state.sheets && this.state.sheets.length > 0) ? (false) : (true)) : (true)} onSelect={this.onSheetsDropdownSelect} id="dropdown-basic-button" title={this.state.selectedSheet ? (this.state.selectedSheet) : ('Select a sheet')}>
                                <Dropdown.Item eventKey='clear'>N/A</Dropdown.Item>
                                {this.state.sheets ?
                                    (
                                        this.state.sheets.map(sheet => {
                                            return (
                                                <Dropdown.Item key={sheet.id} eventKey={sheet.id}>{moment(new Date(sheet.date.toDate())).format("MMMM Do YYYY")}</Dropdown.Item>
                                            )
                                        })
                                    ) : ('Loading..')}
                            </DropdownButton> */}
                        </Grid.Col>

                        <Grid.Col>
                            <Button disabled={this.state.selectedEvent ? ((this.state.selectedLocation) ? (false) : (true)) : (true)}>
                                New Sheet
                            </Button>
                        </Grid.Col>



                    {this.state.selectedSheet && (
                        <div>
                            <SheetStats attendees= {this.state.attendees} />
                            <Button onClick={this.test}>clik</Button>
                        </div>
                    )}



                </Grid>

            </div>
        )
    }
}

  export default Checkins
