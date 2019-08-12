import React, { Component } from 'react'
import axios from 'axios'
import Vault from '../vault/vault'
import '../../App.css'
const vault = new Vault();

export class Person extends Component {
    state = {
        person : null,
        isFetching : true,
    }
    componentDidMount() {
        this.setState({isFetching : true})
        axios.get("https://api.planningcenteronline.com/people/v2/people/"+ this.props.match.params.person_id , {
            auth: {
                username: vault.username,
                password: vault.password
            }
        })
            .then(res => {
                const person = res.data.data;
                console.log("successfully retrieved person of id:" + this.props.match.params.person_id)
                console.log(person)
                this.setState({ person, isFetching : false });
            }).catch(err => {
                console.log(err)
                alert("We've encountered an error. Please check your internet connection and try again later.")
                this.setState({ isFetching : false });
            }
            );

    }
    render() {
        const { person } = this.state
        return (
            <div>
                {this.state.isFetching ? 'Loading' : (
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
