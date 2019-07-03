import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Cards from "./Dashboard";
import * as serviceWorker from './serviceWorker';
import {Route,Link,BrowserRouter as Router} from "react-router-dom";
import Problems from "./Problems";
import Custombar from "./Components/Navbar.js"
import Questions from "./Components/Question"
import Editor from "./Editor";
import Questionrender from "./Questionrender";

const Routing=(
    <Router>
        <div style={{margin:"20px"}}> 
                 <div><Custombar style={{margin:"20px"}}/></div>
                <Route exact path="/" component={Cards} state={{name:"swetha"}}></Route>
                {/* <Route path="/problems" 
                render={() => <Problems  name="swetha" />}></Route> */}
                <Route path="/problems/:type" component={Problems}></Route>
                <Route path="/questions"  component={Editor} />
                <Route path="/test"  component={Questionrender} />
        </div>
    </Router>
)

ReactDOM.render(Routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
