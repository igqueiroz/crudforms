// Componente que lê os dados dos usuários do App

import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import DataApi  from '../logic/DataApi';
import UsersItem from './UsersItem';
import base64 from 'base-64'
import { Modal, OverlayTrigger, Button  } from 'react-bootstrap';

export default class Users extends Component {
	constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectionType: '',
            username: 'igor@igorqueiroz.com.br',
            password: 'paguemob879',
            modal: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.loadTypeofRegister = this.loadTypeofRegister.bind(this);
        this.genderType = this.genderType.bind(this);
    }

	
    handleChange(event) {
 		const inputId = event.target.value;
        this.setState({selectionType: event.target.value});
        this.loadTypeofRegister(event.target.value);
	}
	genderType(gender) {
		if (gender == 'm') {
			return 'Male';
		} else {
			return 'Female'
		}
	}
	

	loadTypeofRegister(typeOfRegister) {
			//document.querySelector('.locate').className = 'locate progress';
			if(typeOfRegister === 'pessoa_fisica') {
				const headers = new Headers();
		        headers.append('Content-Type', 'application/json');
		        headers.append('Authorization', 'Basic ' + base64.encode(this.state.username  + ':' + this.state.password));
		        const requestData = {          
		          method: 'GET',
		          headers: headers
		        }
		        fetch(`https://paguemob-interview-environment.firebaseapp.com/contacts`, requestData)
		            .then(response => {
		                if(response.ok) {
		                    //document.querySelector('.locate').className = 'locate';
		                   return response.json()
		                }
		                else {
		                    throw new Error("Não rolou comunicação com a API");
		                }
		            })
		            .then(list => {
		                this.setState({users: list})
		                
		            }) 
			}
			else {

			}

	        
	          
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
						<label htmlFor="usuario">Pessoa Física</label>
						<input type="radio" id="usuario" name="type" value="pessoa_fisica" onChange={this.handleChange} />
						<label htmlFor="empresa">Empresa</label>
						<input type="radio" id="empresa" name="type" value="empresa" onChange={this.handleChange}  />
					</div>
					<div className="row">
						<h1>Users</h1>
						<form id="form-contato">
							<Table responsive striped condensed hover>
							<thead>
							    <tr>
							      <th>Name</th>
							      <th>Email</th>
							      <th>CPF</th>
							      <th>Gender</th>
							      <th>Telephone</th>
							      <th>Website</th>
							      <th>Address</th>
							      <th>Edit</th>
							    </tr>
							</thead>
							<tbody>

							{
								this.state.users.map(users =>  
								<UsersItem
									key={users.id}
									id={users.id}
									name={users.userInfo.name}
									email={users.userInfo.email}
									cpf={users.userInfo.cpf}
									gender={this.genderType(users.userInfo.gender)}
									telephone={users.userInfo.telephone}
									website={users.userInfo.website}
								/>)
		                	}
							</tbody>
							</Table>
						</form>
						<Modal show={this.state.modal} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Modal heading</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<h4>Text in a modal</h4>
							</Modal.Body>
							<Modal.Footer>
								<Button onClick={this.handleClose}>Close</Button>
							</Modal.Footer>
						</Modal>
					</div>
				</div>
			</section>
		)
	}
}