import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class SearchItem extends Component {
    render() {
        const { attributes } = this.props.person
        return (
            <div>
                
                    <Link to={'people/'+this.props.person.id}> 
                        {
                            ((attributes.first_name != null) ? (attributes.first_name + " ") : ("")) +
                            ((attributes.middle_name != null) ? (attributes.middle_name + " ") : ("")) +
                            ((attributes.last_name != null) ? (attributes.last_name) : (""))
                        }
                    </Link>
                
            </div>
        )
    }
}

export default SearchItem
