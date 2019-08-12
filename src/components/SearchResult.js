import React, { Component } from 'react'
import SearchItem from './SearchItem'
import Button from 'react-bootstrap/Button'

export class SearchResult extends Component {
    render() {
        console.log(this.props.data)
        return (
            <div>
                <ul>
                    {this.props.data.length > 0 ? (this.props.data.map(function (person) {
                        return <SearchItem key={person.id} person={person} />
                    })) :
                    (
                        <span>Person not found. <Button>+ Person</Button></span>
                    )}
                </ul>
            </div>
        )
    }
}

export default SearchResult
