// Componente que lê os dados dos usuários do App

import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import DataApi  from '../logic/DataApi';
import UsersItemPessoaJuridica from './UsersItemPessoaJuridica';
import UsersItemPessoaFisica from './UsersItemPessoaFisica';
import Modals from './Modals';
import ModalsPJ from './ModalsPJ';

export default class Users extends Component {
	constructor(props) {
        super(props);
        this.state = {
            users: [],
            empresa: [],
            selectionType: '',
            modal: false,
            modalPJ: false
        };
        this.handleType = this.handleType.bind(this);
        this.genderType = this.genderType.bind(this);
    }

	
    handleType(event) {
 		const inputId = event.target.value;
 		if( inputId === 'pessoa_fisica') {
 			event.target.nextSibling.classList.add('progress');
 			document.querySelector('.pessoa_fisica').classList.add("show-type");
            document.querySelector('.pessoa_juridica').classList.remove("show-type");
            this.props.routes[0].store.dispatch(DataApi.list('pessoa_fisica', event.target.nextSibling));
            this.setState({selectionType: 'pessoa_fisica'});
            this.setState({usersCopy: this.state.users});
        } else {
        	event.target.nextSibling.classList.add('progress');
        	document.querySelector('.pessoa_fisica').classList.remove("show-type");
        	document.querySelector('.pessoa_fisica').classList.remove("hide-type");
			document.querySelector('.pessoa_juridica').classList.add("show-type");
			this.props.routes[0].store.dispatch(DataApi.list('pessoa_juridica',event.target.nextSibling));
			this.setState({selectionType: 'pessoa_juridica'})
			//debugger;
		} 
	}


	genderType(gender) {
		if (gender === 'm') {
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
            this.setState({empresa: this.props.routes[0].store.getState().empresa})
            this.setState({modal: this.props.routes[0].store.getState().modal.open})
            this.setState({modalPJ: this.props.routes[0].store.getState().modalPJ.openPJ})
         })
    }

	render() {
		return(
			<section>
				<div className="logo"><Link to="/" title="CRUD Form" alt="CRUD Forms">
					<img src="images/mysitelogo@400x-100.png" alt="CRUD Forms" title="CRUD Forms" /></Link>
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
							<h1>Empresa</h1>
						
							<Table responsive striped condensed hover>
							<thead>
							    <tr>
							      <th>Name</th>
							      <th>Email</th>
							      <th>CNPJ</th>
							      <th>Telephone</th>
							      <th>Website</th>
							      <th>Address</th>
							      <th>Edit</th>
							    </tr>
							</thead>
							<tbody>
							{

								this.state.empresa.map((empresa, index) => 
								<UsersItemPessoaJuridica
									key={empresa.id}
									index={index}
									id={empresa.id}
									name={empresa.userInfo.name}
									email={empresa.userInfo.email}
									cnpj={empresa.userInfo.cnpj}
									telephone={empresa.userInfo.telephone}
									website={empresa.userInfo.website}
									msg={this.state.msg}
									address={empresa.address}
									selectionType={this.state.selectionType}
									store={this.props.routes[0].store}
								/>)
		                	}
							</tbody>
							</Table>
						</div>
					</form>
					<form id="form-contato" className="pessoa_fisica">
						<div className="row">
							<h1>Pessoa Física</h1>
						
							<Table responsive striped condensed hover>
							<thead>
							    <tr>
							      <th>Name</th>
							      <th>Email</th>
							      <th>CPF</th>
							      <th width="23px">Gender</th>
							      <th>Telephone</th>
							      <th>Website</th>
							      <th>Address</th>
							      <th>Edit</th>
							    </tr>
							</thead>
							<tbody>
							{	
								this.state.users.map((users, index) => 
					
								<UsersItemPessoaFisica
									key={users.id}
									index={index}
									id={users.id}
									name={users.userInfo.name}
									email={users.userInfo.email}
									gender={this.genderType(users.userInfo.gender)}
									cpf={users.userInfo.cpf}
									telephone={users.userInfo.telephone}
									website={users.userInfo.website}
									store={this.props.routes[0].store}
									selectionType={this.state.selectionType}
									msg={this.state.msg}
									address={users.address}
									users={this.state.users}
								/>
								)
		                	}
							</tbody>
							</Table>
						</div>
					</form>
				</div>
				{this.state.modal &&  
					<Modals
						users={this.state.users}
						modal={this.state.modal}
						store={this.props.routes[0].store}
						selectionType={this.state.selectionType}
					/>
				}
				{this.state.modalPJ &&  
					<ModalsPJ
						empresa={this.state.empresa}
						modalPJ={this.state.modalPJ}
						store={this.props.routes[0].store}
						selectionType={this.state.selectionType}
					/>
				}
			</section>
		)
	}
}