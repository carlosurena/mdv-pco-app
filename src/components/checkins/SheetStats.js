import React, { Component } from 'react'

export class SheetStats extends Component {
    render() {
        return (
            <div>
                sheet stats
                {
                    this.props.attendees && this.props.attendees.map( attendee => {
                        return(
                            <div key={attendee.id}>{attendee.checkedInBy}</div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SheetStats
