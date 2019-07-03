import React, { Component } from "react"
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Editor from "../Editor";

class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
            difficulty: ""
        }
        this.load = this.load.bind(this);
    }

    load(e) {
        e.preventDefault();
        console.log(this)
        console.log(e.target)
        this.setState({
            difficulty: this.state.difficulty,
            operation: e.target.value,
            _id: this.props.id
        })
        console.log(this.state)
        window.location = "/questions?" + "level=" + this.state.difficulty + "&_id=" + this.props.id + "&operation=" + e.target.value
    }

    componentDidMount() {
        var result = ""
        var colour = ""
        switch (this.props.level) {
            case 0: result = "easy";
                colour = "#DAA520"
                break;
            case 1: result = "medium";
                colour = "green"
                break;
            case 2: result = "hard";
                colour = "red";
                break;
        }
        this.setState({
            difficulty: result,
            color: colour
        })
    }
    render() {
        return (
            <tr className="view overlay zoom">
                <td>
                    {this.props.index}
                </td>
                <td >
                    {this.props.qname}
                </td>
                <td style={{ color: this.state.color }}>
                    <b>{this.state.difficulty}</b>
                </td>
                <td>
                    {this.props.tags}
                </td>
                <td><button className="btn btn-info btn-sm m-0 waves-effect" name="type"
                    value="code" onClick={this.load}>Code</button>&nbsp;&nbsp;
                <button type="submit" className="btn btn-indigo btn-sm m-0 waves-effect" name="type"
                        value="debug" onClick={this.load}>Debug</button></td>
                <Route path="/questions" component={Editor} ></Route>
            </tr>

        )
    }
}

export default Question