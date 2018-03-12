// Considerando o endereço uma informação secundária do cadastro, ele está disponível através de um 'model' na lista

import React, { Component } from 'react';
export default class UsersItem extends Component {
	constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectionType: '',
            username: 'igor@igorqueiroz.com.br',
            password: 'paguemob879'
        };
        this.openModalAdress = this.openModalAdress.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }
    openEdit(e) {
    	e.preventDefault();
    	const editId = e.currentTarget.getAttribute('data-id');
    	document.querySelectorAll('input.'+ editId).forEach((input) => {
    		input.disabled = false;
    	})
    }
    openModalAdress(event) {
 		const inputId = event.target.value;
        this.setState({selectionType: event.target.value});
        //this.loadTypeofRegister(event.target.value);
        this.setState({ modal: true });
        console.log('teste')
	}

	handleClose() {
	    this.setState({ modal: false });
	}

	handleShow() {
	    this.setState({ modal: true });
	}

    render(){
        return (
        	<tr>
    			<td>
    				<input className={this.props.id + ' input useritem blocked'} type="text" name="type" disabled ref={(input) => this.name = input } placeholder="Novo nome" />
    				<label className="type" htmlFor={this.props.id}>{this.props.name}</label>
    			</td>
				<td>
					<input className={this.props.id + ' input useritem blocked'} type="text" name="type" disabled ref={(input) => this.email = input } placeholder="Novo e-mail" />
					<label className="type" htmlFor={this.props.id}>{this.props.email}</label>
				</td>
				<td><input className={this.props.id + ' input useritem blocked'} type="text" name="type" disabled  value={this.props.cpf} ref={(input) => this.cpf = input } placeholder="Novo CPF" /></td>
				<td><input className={this.props.id + ' input useritem blocked'} type="text" name="type" disabled  value={this.props.gender} ref={(input) => this.gender = input }  placeholder="Novo Sexo" /></td>
				<td><input className={this.props.id + ' input useritem blocked'} type="text" name="type" disabled  value={this.props.telephone} ref={(input) => this.telephone = input } placeholder="Novo telefone" /></td>
				<td><input className={this.props.id + ' input useritem blocked'} type="text" name="type" disabled  value={this.props.website} ref={(input) => this.website = input }  placeholder="Novo website" /></td>
				<td><button className="form" data-id={this.props.id} onClick={this.props.openModalAdress}>See Address</button></td>
				<td><button className="form" data-id={this.props.id} onClickCapture={(e) => this.openEdit(e)}>Edit</button></td>
			</tr>
		)
    }
}

