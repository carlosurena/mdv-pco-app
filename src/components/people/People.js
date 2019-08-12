import React, { Component } from 'react';
import axios from 'axios'
import Vault from '../vault/vault'
import PeopleList from './PeopleList'
import Searchbar from '../Searchbar'
import SearchResult from '../SearchResult'

const vault = new Vault();

export class People extends Component {

    state = {
        //List of all people in the Church
        people: null,
        //List of people returned from user query (Searchbar)
        list: undefined
    }
    componentDidMount() {
        axios.get("https://api.planningcenteronline.com/people/v2/people?per_page=1000", {
            auth: {
                username: vault.username,
                password: vault.password
            }
        })
            .then(res => {
                const people = res.data;
                this.setState({ people });
                console.log("successfully retrieved all people.")
            }).catch(err => {
                console.log(err)
                alert("We've encountered an error. Please check your internet connection and try again later.")
            }
            );

    }

    // parses Searchbar input and cross-references with the PCO database for first/last name matches
    searchData = (e) => {
        const { people } = this.state
        var queryData = [];
        if (e.target.value !== '') {
            people && people.data.forEach(function (person) {
                //gets rid of accents, tildes, etc
                var first_name = (person.attributes.first_name != null) ? (person.attributes.first_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) : (null);
                var middle_name = (person.attributes.middle_name != null) ? (person.attributes.middle_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) : (null);
                var last_name = (person.attributes.last_name != null) ? (person.attributes.last_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) : (null);

                if (
                    ( first_name !== null && first_name.toLowerCase().indexOf(e.target.value) !== -1 ) ||
                    ( middle_name !== null && middle_name.toLowerCase().indexOf(e.target.value) !== -1 ) ||
                    ( last_name !== null && last_name.toLowerCase().indexOf(e.target.value) !== -1 )) {
                    if (queryData.length < 10) {
                        queryData.push(person);
                        //console.log(queryData)
                    }
                }
            });
        }
        this.setState({ list: queryData });
    }

    render() {
        return (
            <div>
                <Searchbar data={this.state.people} search={this.searchData} />
                {(this.state.list) ? <SearchResult data={this.state.list} /> : null}

               
                <PeopleList people={this.state.people} />
            </div>
        )
    }
}

export default People
