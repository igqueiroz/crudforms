import React, { Component } from 'react';

export default class UsersItem extends Component {
    render(){
        return (
        	<tr>            			
				
				<td>{this.props.name}</td>
				<td>{this.props.email}</td>
				<td>{this.props.userLocationLat}, {this.props.userLocationLng}</td>
				<td>{this.props.userDevice}</td>
				<td>{this.props.userRange}</td>
				<td>{this.props.universityLat}, {this.props.universityLng}</td>
		    </tr>	
        );
    }
}



