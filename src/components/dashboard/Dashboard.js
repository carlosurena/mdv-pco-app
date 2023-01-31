import React, { Component } from "react";
import axios from "axios";
import { getCookie } from "../../utils/cookieUtils";
import IncomeWidget from "./IncomeWidget";

export class Dashboard extends Component {
  state = {
    //All org stats retrieved from PCO
    stats: null,
    isFetching: true,
    isFetchingBD: true,
    birthdays: null,
  };
  componentDidMount() {
    // this.getStats();
    // this.getUpcomingBirthdays()
  }

  //fetches user-made upcoming birthday list (next 6 months) from PCO's List api
  getUpcomingBirthdays = () => {
    let jwt = getCookie("jwt");

    //Birthday List
    this.setState({ isFetchingBD: true });
    axios
      .get(
        "https://api.planningcenteronline.com/people/v2/lists/909452/people",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        const birthdays = res.data.data;
        console.log(
          "successfully retrieved all birthdays in the next 6 months."
        );
        console.log(birthdays);
        this.setState({ birthdays, isFetchingBD: false });
      })
      .catch((err) => {
        console.log(err);
        console.error(
          "We've encountered an error. Please check your internet connection and try again later."
        );
        this.setState({ isFetchingBD: false });
      });
  };
  //fetches predefined PCO stats
  getStats = () => {
    let jwt = getCookie("jwt");
    this.setState({ isFetching: true });
    axios
      .get("https://api.planningcenteronline.com/people/v2/stats", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        const stats = res.data.data;
        console.log("successfully retrieved all stats.");
        this.setState({ stats, isFetching: false });
      })
      .catch((err) => {
        console.log(err);
        alert(
          "We've encountered an error. Please check your internet connection and try again later."
        );
        this.setState({ isFetching: false });
      });
  };

  render() {
    return (
      <div>
        {this.state.isFetching ? (
          <p>Loading..</p>
        ) : (
          <div>
            {/* <DemographicsWidget stats={this.state.stats} />
                            <MembershipWidget stats={this.state.stats} />
                            <UpcomingBirthdaysWidget birthdays={this.state.birthdays} /> */}
            <IncomeWidget />
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
