// Considerando o endereço uma informação secundária do cadastro, ele está disponível através de um 'model' na lista

import React, { Component } from 'react';
import base64 from 'base-64';
import Users from './Users';

export default class UsersItem extends Component {
	constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectionType: '',
            username: 'igor@igorqueiroz.com.br',
            password: 'paguemob879'
        };
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
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

    updateRegister(editId, newValues) {
        //document.querySelector('.locate').className = 'locate progress';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + base64.encode(this.state.username  + ':' + this.state.password));
        newValues[3] = (newValues[3] = 'Male') ? "m" : "f";
        console.log(newValues)
        const requestData = {
          method: 'PUT',
          body: JSON.stringify({
            "userInfo": {
                "website": newValues[5], 
                "cnpj": "43565786790368", 
                "name": newValues[0], 
                "gender": newValues[3],
                "telephone": newValues[4], 
                "cpf": newValues[2], 
                "email": newValues[1]
              }, 
              "address": {
                "city": "S\u00e3o Paulo", 
                "neighborhood": "Vila S\u00f4nia", 
                "zip": "056340150", 
                "country": "Brazi", 
                "complement": "teste", 
                "state": "SP", 
                "streetNumber": 79, 
                "streetName": "Rua Karlina Reiman Wandabeg"
              }
          }),
          headers: headers
        }
        fetch(`https://paguemob-interview-environment.firebaseapp.com/contacts/` + editId, requestData)
            .then(response => {
                if(response.ok) {
                    //document.querySelector('.locate').className = 'locate';
                    Users.loadTypeofRegister('pessoa_fisica')
                }
                else {
                    throw new Error("Não rolou comunicação com a API");
                }
            })
            .then(list => {
                this.setState({users: list})
                
            })
    }

    render(){
        return (
        	<tr>
    			<td>
    				<input className={this.props.id + ' input useritem blocked'} type="text" disabled ref={(input) => this.name = input } placeholder="New name" />
    				<label className="type" htmlFor={this.props.id}>{this.props.name}</label>
    			</td>
				<td>
					<input className={this.props.id + ' input useritem blocked'} type="email"  disabled ref={(input) => this.email = input } placeholder="New e-mail" />
					<label className="type" htmlFor={this.props.id}>{this.props.email}</label>
				</td>
				<td>
                    <input className={this.props.id + ' input useritem blocked'} type="number" pattern="\d*" maxLength="11"  disabled ref={(input) => this.cpf = input } placeholder="New CPF" />
                    <label className="type" htmlFor={this.props.id}>{this.props.cpf}</label>
                </td>
				<td>
                    <input className={this.props.id + ' input useritem blocked'} type="text" disabled ref={(input) => this.gender = input }  placeholder="New gender" />
                    <label className="type" htmlFor={this.props.id}>{this.props.gender}</label>
                </td>
				<td>
                    <input className={this.props.id + ' input useritem blocked'} type="tel" disabled ref={(input) => this.telephone = input } placeholder="Novo telephone" />
                    <label className="type" htmlFor={this.props.id}>{this.props.telephone}</label>
                </td>
				<td>
                    <input className={this.props.id + ' input useritem blocked'} type="url" disabled pattern="https?://.+" title="Include http://" ref={(input) => this.website = input }  placeholder="Novo website" />
                    <label className="type" htmlFor={this.props.id}>{this.props.website}</label>
                </td>
				<td>
                    <button className="form address" data-id={this.props.id} onClick={this.props.openModalAdress}>See Address</button>
                </td>
				<td>
                    <button className="form" data-id={this.props.id} onClickCapture={(e) => this.openEdit(e)}>Edit</button>
                    <button className="form close-edit" data-id={this.props.id} type="submit" onClickCapture={(e) => this.closeEdit(e)}>OK</button>
                </td>
			</tr>
		)
    }
}

