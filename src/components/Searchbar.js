import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

export class Searchbar extends Component {
    state = {
        value: null
    }

       

    render() {


        return (
            <div>
                <Form>
                    <Form.Control type="text" onChange= {this.props.search} placeholder="Search People">

                    </Form.Control>
                </Form>
                
            </div>
        )
    }
}

export default Searchbar