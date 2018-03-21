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
            modal: false
        };
        this.handleType = this.handleType.bind(this);
        this.genderType = this.genderType.bind(this);
    }

	
    handleType(event) {
 		const inputId = event.target.value;
        this.setState({selectionType: event.target.value}, () => this.props.routes[0].store.dispatch(DataApi.list(this.state.selectionType)));
        
	}
	genderType(gender) {
		if (gender == 'm') {
			return 'Male';
		} else {
			return 'Female'
		}
	}
	
	
	componentDidMount() {
        this.props.routes[0].store.subscribe(() => {
            // notify é o espaço armazenado na store criado da função de seu reducer
            this.setState({msg: this.props.routes[0].store.getState().notify})
            this.setState({users: this.props.routes[0].store.getState().data})
         })
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
						<span className="alert">{this.state.msg}</span>
                        <div className="row">
                            <input type="radio" id="pessoa_fisica" name="type" value="pessoa_fisica" onChange={this.handleType} />
                            <label htmlFor="pessoa_fisica" className="type-register locate">Pessoa Física</label>
                            <input type="radio" id="empresa" name="type" value="empresa" onChange={this.handleType} />
                            <label htmlFor="empresa" className="type-register locate">Empresa</label>
                        </div>
					</div>
					<form id="form-contato" className="pessoa_juridica">
						<div className="row">
							<h1>Users</h1>
						
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
						</div>
					</form>
					<form id="form-contato" className="pessoa_fisica">
						<div className="row">
							<h1>Users</h1>
						
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
						</div>
					</form>
				</div>
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
			</section>
		)
	}
}