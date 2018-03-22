// Considerando o endereço uma informação secundária do cadastro, ele está disponível através de um 'model' na lista

import React, { Component } from 'react';
import DataApi from '../logic/DataApi'

export default class UsersItemPessoaJuridica extends Component {
	constructor(props) {
        super(props);
        this.state = {
            msg: ''
        };
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateRegister = this.updateRegister.bind(this);
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

    deleteUser(e) {
        if (confirm("Você tem certeza que deseja remover esse usuário?")) {
            let editId = (e.currentTarget.classList[0]);
            this.props.store.dispatch(DataApi.delete(editId,this.props.selectionType))
            this.props.store.dispatch(DataApi.list('pessoa_juridica'))
        }
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
            if(input.value === '' || input.value === undefined || input.value === null) {
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
        this.props.store.dispatch(DataApi.update(this.props.selectionType, editId, newValues, this.props.address));     
    }

    render(){
        return (
        	<tr className={this.props.id}>
    			<td>
    				<input className={this.props.id + ' input useritem blocked'} type="text" disabled ref={(input) => this.name = input } placeholder="New name" />
    				<label className="type" htmlFor={this.props.id}>{decodeURIComponent(this.props.name)}</label>
                    
    			</td>
				<td>
					<input className={this.props.id + ' input useritem blocked'} type="email"  disabled ref={(input) => this.email = input } placeholder="New e-mail" />
					<label className="type" htmlFor={this.props.id}>{decodeURIComponent(this.props.email)}</label>
				</td>
				<td>
                    <input className={this.props.id + ' input useritem blocked'} type="number" pattern="\d*" maxLength="14"  disabled ref={(input) => this.cpnpj = input } placeholder="New CNPJ" />
                    <label className="type cnpj"  htmlFor={this.props.id}>{decodeURIComponent(this.props.cnpj)}</label>
                </td>
				
				<td>
                    <input className={this.props.id + ' input useritem blocked'} type="tel" disabled ref={(input) => this.telephone = input } placeholder="Novo telephone" />
                    <label className="type" htmlFor={this.props.id}>{decodeURIComponent(this.props.telephone)}</label>
                </td>
				<td>
                    <input className={this.props.id + ' input useritem blocked'} type="url" disabled pattern="https?://.+" title="Include http://" ref={(input) => this.website = input }  placeholder="Novo website" />
                    <label className="type" htmlFor={this.props.id}>{decodeURIComponent(this.props.website)}</label>
                </td>
				<td>
                    <button className="form address" data-id={this.props.id} onClick={this.props.openModalAdress}>See/Edit</button>
                </td>
				<td>
                    <button className="form" data-id={this.props.id} onClickCapture={(e) => this.openEdit(e)}>Edit</button>
                    <button className="form close-edit ok" data-id={this.props.id} type="submit" onClickCapture={(e) => this.closeEdit(e)}>OK</button>
                    <img src="./images/delete.png" alt="remove user" onClick={this.deleteUser} className={this.props.id + ' delete'} />
                </td>
			</tr>
		)
    }
}

