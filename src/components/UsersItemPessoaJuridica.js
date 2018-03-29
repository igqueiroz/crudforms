// Considerando o endereço uma informação secundária do cadastro, ele está disponível através de um 'model' na lista

import React, { Component } from 'react';
import DataApi from '../logic/DataApi'
import NumberFormat from 'react-number-format';

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
        this.websiteMask = this.websiteMask.bind(this);
    }

    openEdit(e) {
    	e.preventDefault();
    	e.currentTarget.classList.toggle('close-edit');
        e.currentTarget.nextSibling.classList.toggle('close-edit');
    	const editId = e.currentTarget.getAttribute('data-id');
        document.querySelectorAll('input.'+ editId).forEach((input) => {
    		input.disabled = false;
    		input.classList.remove('blocked');
    	})
    }

    deleteUser(e) {
        if (confirm("Você tem certeza que deseja remover esse usuário?")) {
            e.currentTarget.classList.add('progress');
            e.currentTarget.setAttribute("src", "./images/1x1.png");
            let editId = (e.currentTarget.classList[0]);
            this.props.store.dispatch(DataApi.delete(editId,this.props.selectionType,e.currentTarget))
        }
    }

    closeEdit(e) {
        e.preventDefault();
        e.currentTarget.classList.toggle('close-edit');
        e.currentTarget.previousSibling.classList.toggle('close-edit');
        const editId = e.currentTarget.getAttribute('data-id');
        document.querySelectorAll('input.'+ editId).forEach((input) => {
            input.disabled = true;
            input.classList.add('blocked');
        })
        var newValueEdited = '';
        const newValues = [];
        document.querySelectorAll('input.'+ editId).forEach((input) => {
            if(input.value === '' || input.value === undefined || input.value === null) {
                newValueEdited = input.textContent;
            }
            else {
                newValueEdited = input.value;
            }
            newValues.push(newValueEdited);
        })
        this.updateRegister(editId,newValues,e.currentTarget.previousSibling);
    }

    openModal(e) {
        e.preventDefault();
        const editIndex = e.currentTarget.getAttribute('data-index');
        this.props.store.dispatch(DataApi.populateModalPJ(editIndex));
        this.props.store.dispatch(DataApi.openModalPJ(true));
    }

    websiteMask(event) {
        var inputValue = event.target.value;
        if (inputValue.length === 6 || inputValue.length === 7) {
            inputValue = 'http://'
        } else if (inputValue.length < 7) {
           inputValue = 'http://' + inputValue;
        }
        event.target.value = inputValue;
    }

     updateRegister(editId, newValues, loading) {
        loading.classList.add('progress');
        if (confirm("Você tem certeza que deseja atualizar esse usuário?")) {
            this.props.store.dispatch(DataApi.update(this.props.selectionType, editId, newValues, this.props.address, loading));
            document.querySelector('.pessoa_juridica').reset();
        }
        else {
            document.querySelector('.pessoa_juridica').reset();
            loading.classList.remove('progress');
        }
    }

    render(){
        function telephoneMask(val) {
            if (val.length <= 10) {
                let ddd = val.substring(0, 2);
                let dig1 = val.substring(2, 6);
                let dig2 = val.substring(6, 10);
                return '(' + ddd + ') ' + dig1 + '-' + dig2;
            } else {
                let ddd = val.substring(0, 2);
                let dig1 = val.substring(2, 7);
                let dig2 = val.substring(7, 11);
                 return '(' + ddd + ') ' + dig1 + '-' + dig2;
            }
        }
        return (
        	<tr className={this.props.id}>
    			<td>
    				<input className={this.props.id + ' input useritem blocked'} defaultValue={decodeURIComponent(this.props.name)} type="text" disabled ref={(input) => this.name = input } placeholder="New name" />
    			</td>
				<td>
					<input defaultValue={decodeURIComponent(this.props.email)} className={this.props.id + ' input useritem blocked'} type="email"  disabled ref={(input) => this.email = input } placeholder="New e-mail" />
				</td>
				<td>
                    <NumberFormat value={decodeURIComponent(this.props.cnpj)} format="##.###.###/####-##" className={this.props.id + ' input useritem blocked'} type="text" disabled ref={(input) => this.cpnpj = input } placeholder="New CNPJ" />
                </td>
				
				<td>
                    <NumberFormat format={telephoneMask} value={decodeURIComponent(this.props.telephone)} className={this.props.id + ' input useritem blocked'} type="tel" disabled ref={(input) => this.telephone = input } placeholder="Novo telephone" />
                </td>
				<td style={{paddingRight: 70}}>
                    <input defaultValue={decodeURIComponent(this.props.website)} className={this.props.id + ' input useritem blocked'} type="url" disabled pattern="https?://.+" title="Include http://" ref={(input) => this.website = input }   onChange={this.websiteMask}  placeholder="Novo website" />
                </td>
				<td>
                    <button className="form address" data-id={this.props.id} data-index={this.props.index} onClickCapture={(e) => this.openModal(e)}>See/Edit
                    </button>

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

