import React, { Component } from 'react'
import DemographicsWidget from './DemographicsWidget'
import MembershipWidget from './MembershipWidget'
import UpcomingBirthdaysWidget from './UpcomingBirthdaysWidget'
import Vault from '../vault/vault'
import axios from 'axios'

const vault = new Vault();

export class Dashboard extends Component {

    state = {
        //All org stats retrieved from PCO
        stats: null,
        isFetching: true,
        isFetchingBD: true,
        birthdays: null,
    }
    componentDidMount() {
        this.getStats();
        this.getUpcomingBirthdays()
    }

    //fetches user-made upcoming birthday list (next 6 months) from PCO's List api
    getUpcomingBirthdays = () => {
        //Birthday List
        this.setState({ isFetchingBD: true })
        axios.get("https://api.planningcenteronline.com/people/v2/lists/909452/people", {
            auth: {
                username: vault.username,
                password: vault.password
            }
        })
            .then(res => {
                const birthdays = res.data.data;
                console.log("successfully retrieved all birthdays in the next 6 months.")
                console.log(birthdays)
                this.setState({ birthdays, isFetchingBD: false });
            }).catch(err => {
                console.log(err)
                alert("We've encountered an error. Please check your internet connection and try again later.")
                this.setState({ isFetchingBD: false });
            }
            );

    }
    //fetches predefined PCO stats
    getStats = () => {
        this.setState({ isFetching: true })
        axios.get("https://api.planningcenteronline.com/people/v2/stats", {
            auth: {
                username: vault.username,
                password: vault.password
            }
        })
            .then(res => {
                const stats = res.data.data;
                console.log("successfully retrieved all stats.")
                this.setState({ stats, isFetching: false });
            }).catch(err => {
                console.log(err)
                alert("We've encountered an error. Please check your internet connection and try again later.")
                this.setState({ isFetching: false });
            }
            );

    }

    render() {
        return (
            <div>
                {(this.state.isFetching ? (<p>Loading..</p>) :
                    (
                        <div>
                            <DemographicsWidget stats={this.state.stats} />
                            <MembershipWidget stats={this.state.stats} />
                            <UpcomingBirthdaysWidget birthdays={this.state.birthdays} />
                        </div>
                    ))}
            </div>
        )
    }
}

export default Dashboard
