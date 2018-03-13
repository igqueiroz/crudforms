// Considerando o endereço uma informação secundária do cadastro, ele está disponível através de um 'model' na lista

import React, { Component } from 'react';
import base64 from 'base-64'

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
    	e.currentTarget.classList.toggle('close-edit');
        e.currentTarget.nextSibling.classList.toggle('close-edit');
        document.querySelector('.address').disabled = true;
    	const editId = e.currentTarget.getAttribute('data-id');
        document.querySelectorAll('input.'+ editId).forEach((input) => {
    		input.disabled = false;
    		input.classList.remove('blocked');
    	})
    }

    closeEdit(e) {
        e.preventDefault();
        e.currentTarget.classList.toggle('close-edit');
        e.currentTarget.previousSibling.classList.toggle('close-edit');
        document.querySelector('.address').disabled = true;
        const editId = e.currentTarget.getAttribute('data-id');
        document.querySelectorAll('input.'+ editId).forEach((input) => {
            input.disabled = true;
            input.classList.add('blocked');
        })
        var newValueEdited = '';
        const newValues = [];
        document.querySelectorAll('input.'+ editId).forEach((input) => {
            if(input.value == '' || input.value == undefined || input.value == null) {
                newValueEdited = input.nextSibling.textContent;
            }
            else {
                newValueEdited = input.value;
            }
            newValues.push(newValueEdited);
        })
        this.updateRegister(editId,newValues);
    }

    updateRegister(editId, newVales) {
        //document.querySelector('.locate').className = 'locate progress';
        console.log(editId + ' ' + newVales)
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + base64.encode(this.state.username  + ':' + this.state.password));
        const requestData = {          
          method: 'POST',
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
				<td>
                    <input className={this.props.id + ' input useritem blocked'} type="text" name="type" disabled ref={(input) => this.cpf = input } placeholder="Novo CPF" />
                    <label className="type" htmlFor={this.props.id}>{this.props.cpf}</label>
                </td>
				<td>
                    <input className={this.props.id + ' input useritem blocked'} type="text" name="type" disabled ref={(input) => this.gender = input }  placeholder="Novo Sexo" />
                    <label className="type" htmlFor={this.props.id}>{this.props.gender}</label>
                </td>
				<td>
                    <input className={this.props.id + ' input useritem blocked'} type="text" name="type" disabled ref={(input) => this.telephone = input } placeholder="Novo telefone" />
                    <label className="type" htmlFor={this.props.id}>{this.props.telephone}</label>
                </td>
				<td>
                    <input className={this.props.id + ' input useritem blocked'} type="text" name="type" disabled ref={(input) => this.website = input }  placeholder="Novo website" />
                    <label className="type" htmlFor={this.props.id}>{this.props.website}</label>
                </td>
				<td>
                    <button className="form address" data-id={this.props.id} onClick={this.props.openModalAdress}>See Address</button>
                </td>
				<td>
                    <button className="form" data-id={this.props.id} onClickCapture={(e) => this.openEdit(e)}>Edit</button>
                    <button className="form close-edit" data-id={this.props.id} onClickCapture={(e) => this.closeEdit(e)}>OK</button>
                </td>
			</tr>
		)
    }
}

