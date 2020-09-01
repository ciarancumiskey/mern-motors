import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddVehicle from "./components/create-vehicle.component";
import EditVehicle from "./components/edit-vehicle.component";
import VehiclesList from "./components/vehicles-list.component";

//import logo from "./logo.png";
//import logo from "./logo.png";

class App extends Component {
	render() {
		return(
			<Router>
				<div className="container">
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<Link to="/" className="navbar-brand">MERN Motors</Link>
						<div className="collapse navbar-collapse">
							<ul className="navbar-nav mr-auto">
								<li className="navbar-item"><Link to="/" className="nav-link">All vehicles</Link></li>
								<li className="navbar-item"><Link to="/create" className="nav-link">Add vehicle</Link></li>
							</ul>
						</div>
					</nav>
				<br/>
				<Route path="/" exact component={VehiclesList} />
				<Route path="/edit/:id" component={EditVehicle} />
				<Route path="/create" component={AddVehicle} />
				</div>
			</Router>
		);
	}
}
export default App;