import React, { Component } from "react"
import './codemirror.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import tagmap from "./Tag_mapping";
import Loader from './Components/Loader'
import Result from "./Components/Result"
require('codemirror/mode/python/python');

class Editor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
        console.log(this.props.location)
        this.Result = this.Result.bind(this);
        this.updateCode = this.updateCode.bind(this);
        this.Toggle = this.Toggle.bind(this);
    }

    componentDidMount() {
        let data = this.props.location.search.substring(1).split("&")
        const script = document.createElement("script")
        script.innerHTML = ""
        script.async = true
        console.log(script);
        document.body.appendChild(script)
        console.log(data[2].substr(data[2].indexOf("=") + 1))

        fetch("http://172.23.175.142:3001/problems" + this.props.location.search, { method: 'GET' })
            .then(response => response.json())
            .then(res => {
                this.setState({
                    isLoading: false,
                    level: data[0].substr(data[0].indexOf("=") + 1),
                    id: data[1].substr(data[1].indexOf("=") + 1),
                    operation: data[2].substr(data[2].indexOf("=") + 1),
                    question: res[0],
                    mode: "python",
                    code: res[0].template.python
                })
                console.log("data returned" + data)
            });
    }

    updateCode(newCode) {
        this.setState({
            code: newCode,
        });
    }


    Result(e) {
        console.log(e)
        this.setState({
            gotResult: false
        })
        fetch("http://172.23.175.142:3001/compile",
            {
                method: 'POST',
                body: JSON.stringify({
                    "level": this.state.level,
                    "type": e.target.id,
                    "_id": this.state.id,
                    "lang": this.state.mode,
                    "code": this.state.code
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    result: data,
                    gotResult: true
                });
                console.log(this.state)
            })
    }

    Toggle(e) {
        let i = e.target.selectedIndex;
        let lang = e.target.options[i].value;
        this.setState({
            mode: lang,
            code: this.state.question.template[lang]
        });
    }

    render() {
        var data = this.state.question;
        console.log(data)
        let options = {
            mode: this.state.mode,
            lineNumbers: true,
        };
        var result = null;
        if (this.state.gotResult == false) {
            result = <Loader />;
        } else if (this.state.gotResult == true) {
            const rset = []
            let data = this.state.result.result;
            for (var i = 0; i < data.length; i++) {
                rset.push(<Result key={i} index={i + 1} testCase={data[i].test_case} uoutput={data[i].user_output} reqoutput={data[i].req_output} result={data[i].result} error={data[i].error} />)
            }

            result = (
                <table className="table table-striped table-responsive-md btn-table box-shadow--6dp" style={{ margin: "60px" }}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Test Case</th>
                            <th scope="col">Your Output</th>
                            <th scope="col">Required Output</th>
                            <th scope="col">Result</th>
                            <th scope="col">Compilation Log</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rset}
                    </tbody>
                </table>
            )
        }
        return (
            this.state.isLoading == true ? <Loader position="absolute" top="50%" left="50%" /> :
                (
                    <div>
                        <div className="jumbotron" style={{ margin: "100px" }}>
                            <h1><strong> {this.state.operation} : {data.qname} </strong></h1>
                            <hr />
                            <p dangerouslySetInnerHTML={{ __html: data.description }} />
                            <p> <b>Tags:</b> {data.tags.reduce((str1, str2) => str1 + tagmap[str2] + ", ", "")}</p>
                        </div>

                        <div className="jumbotron" style={{ margin: "100px" }}>
                            <h1><strong> Code Area</strong></h1>
                            <select className="browser-default float-right"name="lang" onChange={this.Toggle}>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                            </select><br />
                            <hr />
                            <CodeMirror
                                value={this.state.code}
                                
                                options={options}
                                onBeforeChange={(editor, data, value) => {
                                    this.setState({code: value});
                                }}
                                onChange={(editor, data, value) => {
                                }}
                                resetCursorOnSet="false"
                            />
                            

                            <button className="btn btn-danger" id="atd" name="type" value="atd">Add to Debug</button>
                            <button className="btn btn-primary float-right" href="#result" id="cr" onClick={this.Result} /*onClick={compile}*/ name="type" value="cr">Compile and Run</button>
                            <button className="btn btn-success float-right" href="#result" id="sub" onClick={this.Result}/*onclick={submit}*/ name="type" value="sub">Submit</button>

                        </div>

                        <div id="result" className="container" style={{ margin: "60px" }}>{result}</div>

                    </div>
                )
        )
    }

}

export default Editor