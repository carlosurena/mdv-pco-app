// import React, { Component } from "react";
// import ReactDOM from "react-dom";

// export class DemographicsWidget extends Component {
//   chart = React.createRef();

//   componentWillMount() {}

//   componentDidMount() {
//     window.addEventListener("resize", this.renderGraph);

//     this.renderGraph();
//   }

//   componentWillUnmount() {
//     window.removeEventListener("resize", this.renderGraph);
//   }

//   renderGraph = () => {
//     const { clientWidth } = ReactDOM.findDOMNode(this.root);

//     //   c3.generate({
//     //     bindto: this.chart.current,
//     //     size: {
//     //       height: 300,
//     //       width: clientWidth - 20,
//     //     },
//     //     padding: {
//     //       top: 5,
//     //       right: 10,
//     //       bottom: 10,
//     //       left: 40,
//     //     },
//     //     data: {
//     //       columns: this.getColumns(),
//     //       type: "bar",
//     //       groups: [["male", "female", "unassigned"]],
//     //     },
//     //     axis: {
//     //       x: {
//     //         type: "category",
//     //         categories: Object.keys(this.props.stats.attributes.age),
//     //       },
//     //     },
//     //     bar: {
//     //       width: {
//     //         ratio: 0.4,
//     //       },
//     //     },
//     //     color: {
//     //       pattern: ["#93ABDE", "#9E4B75", "#2B5A82"],
//     //     },
//     //     legend: {
//     //       show: false,
//     //     },
//     //   })
//   };
//   render() {
//     return (
//       <div ref={(comp) => (this.root = comp)}>
//         <div>Demographics</div>
//         <div>
//           <div>
//             <div className="" ref={this.chart} />
//             <span className=""></span>
//             <h4 className="">Total: {this.props.stats.attributes.total}</h4>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   getColumns() {
//     const male = ["male"];
//     const female = ["female"];
//     const unassigned = ["unassigned"];

//     for (let key in this.props.stats.attributes.age) {
//       male.push(this.props.stats.attributes.age[key].male);
//       female.push(this.props.stats.attributes.age[key].female);
//       unassigned.push(this.props.stats.attributes.age[key].unassigned);
//     }

//     return [male, female, unassigned];
//   }
// }

// export default DemographicsWidget;
