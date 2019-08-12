import React, { Component } from 'react'
import moment from 'moment'
export class UpcomingBirthdaysWidget extends Component {

    render() {
        return (
            <div>
                <h2>Upcoming Birthdays</h2>
                <h6>next 6 months</h6>
                {
                    (this.props.birthdays) ? 
                    (
                        this.props.birthdays.map( person => {
                            return(
                                <div key={person.id}>
                                    <p>{person.attributes.first_name} {person.attributes.last_name} : 
                                        {" " + moment( 
                                            (new Date(person.attributes.birthdate)).getTime() + (new Date(person.attributes.birthdate)).getTimezoneOffset() * 60000
                                            ).format('MMMM Do')}</p>

                                </div>
                            )
                        })
                    )
                     : ('')
                }
            </div>
        )
    }
}

export default UpcomingBirthdaysWidget
