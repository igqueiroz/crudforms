import React, { Component } from 'react';

export default class UsersItem extends Component {
    render(){
        return (
        	<tr>            			
				<td>{this.props.type}</td> { /* empresa ou pessoa física? */ }
				<td>{this.props.name}</td>
				<td>{this.props.paper}</td> { /* cpf ou cnpj */ }
				<td>{this.props.email}</td> 
				<td>{this.props.gender}</td> { /* se pessoa física > gênero */ }
				<td>{this.props.userDevice}</td>
				<td>{this.props.userRange}</td>
				<td>{this.props.universityLat}, {this.props.universityLng}</td>
		    </tr>	
        );
    }
}



