/*
    PeopleList : Retrieves a list of all people in the PCO database and displays them in a table.
    @author Carlos Urena
*/
import React from 'react'
import {Link} from 'react-router-dom'

const PeopleList = ({people}) => {
    return (
        <div>
                
                    {people ? people.data.map( person => {
                        return(
                            <div key= {person.id}>
                                <Link to={"/people/"+person.id}>{person.attributes.first_name + " " + person.attributes.last_name} </Link>
                            </div>
                        )
                    })
                    :
                    (
                        'Loading...'
                    )}
                </div>

    )
}

export default PeopleList
