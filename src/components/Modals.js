// Este arquivo manipula os endereços para pessoa física, para melhorar os updates foram tratados em arquivos separados

import React, { Component } from 'react';
import DataApi from '../logic/DataApi'
import { Modal, Button  } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

export default class Modals extends Component {
	constructor(props) {
        super(props);
        this.state = {
            msg: ''
        };
        this.openEdit = this.openEdit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateRegister = this.updateRegister.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    openEdit(e) {
    	e.preventDefault();
    	e.currentTarget.classList.toggle('close-edit');
        e.currentTarget.nextSibling.classList.toggle('close-edit');
    	const editId = e.currentTarget.getAttribute('data-id');
        document.querySelectorAll('.modal-address.'+ editId).forEach((input) => {
    		input.disabled = false;
    		input.classList.remove('blocked');
    	})
        
    }

    handleChange(event) {
        const inputId = event.target.id;
        this.setState({[inputId]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        event.target.querySelector('.locate').className = 'locate progress';     
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
                newValueEdited = input.nextSibling.textContent;
            }
            else {
                newValueEdited = input.value;  
            }
            newValues.push(newValueEdited);

        })
        this.updateRegister(editId, newValues, e.currentTarget.previousSibling);
    }

    handleClose() {
        this.props.store.dispatch(DataApi.openModal(false));
    }

    updateRegister(editId, newValues, loading) {
        loading.classList.add('progress');
        if (confirm("Você tem certeza que deseja atualizar o endereço desse usuário?")) {
            this.props.store.dispatch(DataApi.updateAddress(this.props.selectionType, editId, newValues, loading));
        }
        else {
            loading.classList.remove('progress');
        }
    }

    componentDidMount() {
        this.props.store.subscribe(() => {
            if (this.refs.refcategory) {
                this.setState({msg: this.props.store.getState().notify})
            }
         })
    }
                                  
    render() {
        let modalUser = this.props.store.getState().modalIndex
        return (
        	<Modal ref="refcategory" show={this.props.modal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>{decodeURIComponent(this.props.users[modalUser].userInfo.name)}</strong> - {decodeURIComponent(this.props.users[modalUser].userInfo.email)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span className="alert">{this.state.msg}</span>
                    <h4>Endereço:</h4>
                    <form id="form-contato" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-xs-6 extras">
                                <p><strong>Street:</strong> <input name="street" type="text" className={'modal-address input useritem blocked ' + this.props.users[modalUser].id} ref={(input) => this.name = input } disabled defaultValue={decodeURIComponent(this.props.users[modalUser].address.streetName)} onChange={this.handleChange} /> </p>
                            </div>
 
                            <div className="col-xs-6 extras">
                                <p><strong>Number:</strong> <input type="number" className={'modal-address input useritem blocked ' + this.props.users[modalUser].id} disabled defaultValue={decodeURIComponent(this.props.users[modalUser].address.streetNumber)} /> </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 extras">
                                <p><strong>Neighborhood:</strong> <input type="text" className={'modal-address input useritem blocked ' + this.props.users[modalUser].id} disabled defaultValue={decodeURIComponent(this.props.users[modalUser].address.neighborhood)} /></p>
                            </div>
                            <div className="col-xs-6 extras">
                                <p><strong>Complement:</strong> <input type="text" className={'modal-address input useritem blocked ' + this.props.users[modalUser].id} disabled defaultValue={decodeURIComponent(this.props.users[modalUser].address.complement)} /> </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-6 extras">
                                <p><strong>City:</strong> <input type="text" className={'modal-address input useritem blocked ' + this.props.users[modalUser].id} disabled defaultValue={decodeURIComponent(this.props.users[modalUser].address.city)} /> </p>
                            </div>
                            <div className="col-xs-6 extras">
                                <p><strong>State:</strong> <input type="text" className={'modal-address input useritem blocked ' + this.props.users[modalUser].id} disabled defaultValue={decodeURIComponent(this.props.users[modalUser].address.state)} /> </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-6 extras">
                                <p><strong>Zipcode:</strong> <NumberFormat format="#####-###" type="text" className={'modal-address input useritem blocked ' + this.props.users[modalUser].id} disabled value={decodeURIComponent(this.props.users[modalUser].address.zip)} /> </p>
                            </div>
                            <div className="col-xs-6 extras">
                                <p><strong>Country:</strong> <input type="text" className={'modal-address input useritem blocked ' + this.props.users[modalUser].id} disabled defaultValue={decodeURIComponent(this.props.users[modalUser].address.country)} /></p>
                            </div>
                        </div>

                        <div className="row top-buffer">
                            <div className="col-xs-4 extras" />
                            <div className="col-xs-4 extras">
                                <button className="form" data-id={this.props.users[modalUser].id} onClickCapture={(e) => this.openEdit(e)}>Edit Address</button>
                                <button className="form close-edit ok" type="submit" data-id={this.props.users[modalUser].id} onClickCapture={(e) => this.closeEdit(e)}>Save</button>
                            </div>
                            <div className="col-xs-4 extras" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close window</Button>
                </Modal.Footer>
            </Modal>
		)
    }
}

