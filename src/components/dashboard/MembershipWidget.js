import React, { Component } from 'react'
import c3 from 'c3'
import _ from 'underscore'

const colors = {
    blue: "#93ABDE",
    teal: "#44AA99",
    green: "#117733",
    orange: "#D89059",
    pink: "#CC6677",
    magenta: "#9E4B75",
    gray: "#5D5D5D",
    navy: "#2B5A82",
}


export class MembershipWidget extends Component {
    chart = React.createRef()

    componentWillMount(){
    }
    componentDidMount() {
      c3.generate({
        bindto: this.chart.current,
        size: {
          height: 180,
          width: 180,
        },
        data: {
          columns: this.getColumns(),
          type: "donut",
        },
        donut: {
          width: 32,
          label: {
            show: false,
          },
        },
        tooltip: {
          format: {
            value: (value, ratio) => `${value} (${(ratio * 100).toFixed(1)}%)`,
          },
        },
        color: {
          pattern: Object.keys(colors).map(e => colors[e]),
        },
        legend: {
          show: false,
        },
      })
    }
  
    render() {
  
      return (
        <div>
          <div>Membership Status</div>
          <div>
            <div>
              <div className="" ref={this.chart} />
              <span className="">
              </span>
              <h4 className="">
                Total: {this.props.stats.attributes.total}
              </h4>
            </div>
            
          </div>
        </div>
      )
    }
  
    getColumns() {
        return _.map(this.props.stats.attributes.membership, (number, status) => {
        return [status, number]
      })
      
      
    }
}

export default MembershipWidget
