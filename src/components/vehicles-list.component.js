import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axios from 'axios';

//TODO: Implement search filters
//This formats the Vehicle data for the table which will show the Vehicles.
function Vehicle(props){
	return(
		<tr>
			<td className={props.vehicle.vehicle_sold ? 'vehicle_sold' : ''}>
				{props.vehicle.vehicle_make}
			</td>
			<td className={props.vehicle.vehicle_sold ? 'vehicle_sold' : ''}>
				{props.vehicle.vehicle_model}
			</td>
			<td className={props.vehicle.vehicle_sold ? 'vehicle_sold' : ''}>
				{props.vehicle.vehicle_year}
			</td>
			<td className={props.vehicle.vehicle_sold ? 'vehicle_sold' : ''}>
				{props.vehicle.vehicle_price}
			</td>
			<td className={props.vehicle.vehicle_sold ? 'vehicle_sold' : ''}>
				{props.vehicle.vehicle_description}
			</td>
			<td className={props.vehicle.vehicle_sold ? 'vehicle_sold' : ''}>
				{props.vehicle.vehicle_fuel}
			</td>
			<td>
				<Link to={"/edit/"+props.vehicle._id}>Edit</Link>
			</td>
		</tr>
	);
}
export default class VehiclesList extends Component {
	constructor(props){
		super(props);

		this.onChangeVehicleMakeFilter = this.onChangeVehicleMakeFilter.bind(this);

		this.state = {vehicles: []};
	}
	componentDidMount(){
		axios.get('http://localhost:4008/vehicles')
			.then(response => {
				this.setState({ vehicles: response.data});
			}).catch(function(error){
				console.log(error);
			})
	}
	/**
	 * This accesses the retrieved Vehicle objects and renders them in a list.
	 * @returns the list of Vehicles
	 */
	vehicleList() {
		console.log("Accessing vehicle list");
		return this.state.vehicles.map(function(currentVehicle, listIndex){
			console.log(currentVehicle);
			return <Vehicle vehicle={currentVehicle} key={listIndex}/>;
		})
	}
	/**
	 * This uses the database to populate a dropdown menu with the makes of the vehicles in the DB.
	 * @returns the list of Vehicle makes
	 * TODO: Only show each make once
	 * TODO: Use the selected option to filter results from the DB
	 */
	vehicleMakesList(){
		return this.state.vehicles.map(vehicle => (
			{label: vehicle.vehicle_make, value: vehicle.vehicle_make	}));
	}
	//Set up onChange bindings
	onChangeVehicleMakeFilter(e){
		console.log(e.target.value);
		this.setState({
			selected_make: e.target.value
		});
	}
	//TODO: Implement a way for the user to pick an attribute to sort by
	//TODO: Implement a filter for results
	render(){
		return(
			<div>
				<form  onSubmit={this.onSubmit}>
					<Select 
						options={ this.vehicleMakesList() }
						onChange={ 
							selected_make => 
							console.log("Make selected: " + selected_make.value)
							//TODO: Apply filter to results
						}
					/>
					<input type="submit" value="Apply filter"/>
				</form>
				<h3>Vehicles List</h3>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Make</th>
							<th>Model</th>
							<th>Year</th>
							<th>Price</th>
							<th>Description</th>
							<th>Fuel</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{ this.vehicleList() }
					</tbody>
				</table>
			</div>
		)
	}
}