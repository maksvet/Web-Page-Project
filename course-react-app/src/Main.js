import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Resume from "./Resume";
import Contact from "./Contact";
import Portfolio from "./Portfolio";
import Hobbies from "./Hobbies";
import Login from "./Login";
import entriesPage from "./entriesPage";
 
class Main extends Component {
  render() {
    return (
        <HashRouter>
        <div>
          <h1>Maksim Svetlakov</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/resume">Resume</NavLink></li>
            <li><NavLink to="/portfolio">Portfolio</NavLink></li>
            <li><NavLink to="/hobbies">Hobbies</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/resume" component={Resume}/>
            <Route path="/portfolio" component={Portfolio}/>
            <Route path="/hobbies" component={Hobbies}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/login" component={Login}/>
            <Route path="/entriespage" component={entriesPage}/>
            <Route path="/new" component={entriesPage}/>
             
          </div>
        </div>
        </HashRouter>
    );
  }
}
 
export default Main;