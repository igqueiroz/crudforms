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
				<div className="logo"><Link to="/" title="CRUD Form" alt="CRUD Forms">
					<img src="" alt="CRUD Forms" title="CRUD Forms" /></Link>
				</div>
				<div className="container">
				<div className="row">
					<h1>Selecione o tipo de cadastro:</h1>
					<label for="usuario">Usuário</label>
					<input type="radio" id="usuario" name="type" value="Usuários" />
					<label for="empresa">Empresa</label>
					<input type="radio" id="empresa" name="type" value="Empresa" />
				</div>
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