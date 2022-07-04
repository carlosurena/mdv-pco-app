import React, { Component } from 'react'
import { getPersonByID } from '../../pco/requests'
import '../../App.css'

export class Person extends Component {
    state = {
        person : null,
        isFetching : true,
    }
    componentDidMount() {
        this.setState({isFetching : true})
        getPersonByID(this.props.match.params.person_id).then( data => {

			this.setState({isFetching : false, person : data})
		})

    }
    render() {
        const { person } = this.state
        return (
            <div>
                {this.state.isFetching || !person ? 'Loading' : (
                    <div>
                        <h2>{person.attributes.first_name + " " + person.attributes.last_name}</h2>
                        <div className="avatar-mask"><img className="avatar-img" src={person.attributes.avatar} alt={person.attributes.first_name + " " + person.attributes.last_name}/></div>
                    </div>

                )}
            </div>
        )
    }
}

export default Person
