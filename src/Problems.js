import React, { Component } from "react"

import EachCard from "./Components/EachCard"
import ds from "./Data/Datastructures";
import algos from "./Data/Algorithms";
import tagmap from "./Tag_mapping";
import Question from "./Components/Question"
import Loader from './Components/Loader'


class Problems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.match.params.type,
      isLoading: true,
      questions: []
    }
  }


  componentDidMount() {
    console.log("state type", this.state.type)
    fetch("http://172.23.175.142:3001/questions?type=" + this.state.type, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          questions: data,
          isLoading: false
        })
      })
    console.log(this.state.questions);
  }
  render() {
    let prob = ""
    const pset = []
    let count = 0;
    console.log(tagmap)
    if (this.state.isLoading == false) {
      let data = this.state.questions;
      for (var i = 0; i < data.length; i++) {
        var temp = data[i]
        for (var j = 0; j < temp.length; j++) {
          count++;
          var tags = temp[j].tags;
          var tagStr = tags.reduce((acc, val) => {
            console.log(val)
            return acc + tagmap[val] + ", ";
          }, "");
          tagStr = tagStr.substring(0, tagStr.length - 2);
          pset.push(<Question key={0} index={count} qname={temp[j].qname} id={temp[j]._id} level={i} tags={tagStr} />)
        }
      }
    }
    console.log(pset)
    return (
      this.state.isLoading === true ? <Loader position="absolute" top="50%" left="50%" /> : (
        <div className="container" style={{ margin: "60px" }}>
          <h3>{tagmap[(this.state.type).toLowerCase()]}</h3>
          <table className="table table-striped table-responsive-md btn-table box-shadow--6dp" style={{ margin: "60px" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Questions</th>
                <th scope="col">Level</th>
                <th scope="col">Tags</th>
                <th scope="col">Solve</th>
              </tr>
            </thead>
            <tbody>
              {pset}
            </tbody>
          </table>
        </div>
      )
    )
  }
}

export default Problems