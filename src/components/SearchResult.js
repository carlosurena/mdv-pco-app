import React, { Component } from 'react'
import SearchItem from './SearchItem'
import { Button } from '@mantine/core'
export class SearchResult extends Component {
    render() {
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
