// Componente que lê os dados dos usuários do App

import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import DataApi  from '../logic/DataApi';
import UsersItem from './UsersItem';

export default class Users extends Component {
	constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

	componentWillMount() {		
		 this.props.routes[0].store.subscribe(() => {
             this.setState({users: this.props.routes[0].store.getState()})

         })
         this.props.routes[0].store.dispatch(DataApi.list(`http://localhost:3001/userlist`))
	}

	render() {
		return(
			<section>
				<div className="logo"><Link to="/" title="GeoLocation App" alt="GeoLocation App">
					<img src="images/mysitelogo@400x-100.png" alt="Laureate International Universities" title="Laureate International Universities" /></Link>
				</div>
				<div className="container">
				<div className="row">
					<h1>Users</h1>
					<Table responsive striped condensed hover>
					<thead>
					    <tr>
					      <th>Nome</th>
					      <th>Email</th>
					      <th>User Location</th>
					      <th>Device</th>
					      <th>Range</th>
					      <th>University</th>
					    </tr>
					</thead>
					<tbody>
					{
						this.state.users.map(users =>  
						<UsersItem 
							key={users._id} 
							name={users.name}
							email={users.email}
							userLocationLat={users.userLocationLat}
							userLocationLng={users.userLocationLng}
							userDevice={users.userDevice}
							userRange={users.userRange}
							universityLat={users.universityLat}
							universityLng={users.universityLng}
						/>)
                	}
					</tbody>
					</Table>
				</div>
				</div>
			</section>
		)
	}
}