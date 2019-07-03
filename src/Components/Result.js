import React, { Component } from "react"

class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: ""
        }
    }

    componentDidMount() {
        var colour = ""
        switch (this.props.result) {
            case 'pass':
                colour = "green"
                break;
            case 'fail':
                colour = "red"
                break;
        }
        this.setState({
            color: colour
        })
    }
    render() {
        return (
            <tr className="view overlay zoom">
                <td>
                    {this.props.index}
                </td>
                <td>
                    {this.props.testCase}
                </td>
                <td >
                    {this.props.uoutput}
                </td>
                <td >
                    {this.props.reqoutput}
                </td>
                <td style={{ color: this.state.color }}>
                    <b>{this.props.result}</b>
                </td>
                <td>
                    {this.props.error}
                </td>
            </tr>

        )
    }
}

export default Question