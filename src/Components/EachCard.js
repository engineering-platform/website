import React, { Component } from "react"
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Problems from "../Problems";

// async function navigate(e) {
//   //window.location.assign("http://172.23.175.142:3001/questions?type=math");
//  // e.preventDefault()
//  console.log("name",e.target.n)
//     console.log("name",e.target)
//     // const response = await fetch("http://172.23.175.142:3001/questions?type=math", {
//     //   method: 'GET',
//     // });
//     // const body = await response.text();
//     // console.log(body);
//     // window.location.assign("/problems/"+body)

// };

class EachCard extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
      cardType: this.props.Ecard.type
    }
    this.navigate = this.navigate.bind(this);
  }

  navigate() {
    console.log("name", this.state.cardType);
    window.location = "/problems/" + this.state.cardType;
  }

  render() {
    return (
      <div className="card shadow-box-example hoverable" onClick={this.navigate}
        style={{ borderRadius: "20px", cursor: "pointer", marginRight: "15px", width: "250px", height: "250px", flexShrink: 0 }}>
        <img className="card-img-top img-fluid" name="Array"
          style={{ borderRadius: "25px 25px 0px 0px", minHeight: "150px", maxHeight: "150px", width: "100%", height: "150px" }}
          src={require(this.props.Ecard.image + "")} alt="Card image cap" />
        <div className="card-body"  >
          <h3 className="card-title" style={{ width: "100%", height: "75px" }}>{this.props.Ecard.title}</h3>
        </div>

      </div>
    )
  }
}

export default EachCard