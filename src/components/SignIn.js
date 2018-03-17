// Para uma atenticação completa pelo Firebase é necessário ter as chaves da API apiKey, no caso foi usado a autenticação básica e as credentials armazenados na Store.
// Uma vez as credentials armazenadas diminuimos a quantidade de requisições. 
// Doc: https://firebase.google.com/docs/auth/users

import React, { Component }  from 'react'
import DataApi  from '../logic/DataApi'
import { browserHistory } from 'react-router'

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            msg: this.props.location.query.msg
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // realiza as interações com os 2 inputs de nome e password e envio ao estado do componente
    handleChange (event) {
        const inputId = event.target.id;
        this.setState({[inputId]: event.target.value});
    }

    // usa a Geo Location do navegador e envia os dados para o estado do componente 
    handleSubmit(event) {
        document.querySelector('.locate').className = 'locate progress';
        event.preventDefault();
        this.props.routes[0].store.dispatch(DataApi.login(this.state.username,this.state.password));
    }

    componentDidMount() {
        this.props.routes[0].store.subscribe(() => {
            // notify é o espaço armazenado na store criado da função de seu reducer
            this.setState({msg: this.props.routes[0].store.getState().notify})
         })
    }

    render() {
        return (
            <section className="destaques">
                <div className="container">
                    <div className="row">
                        <div className="logo"><img src="images/mysitelogo@400x-100.png" alt="CRUD Forms" title="CRUD Forms" /></div>
                        <h4>Digite seu login e senha:</h4>
                        <span className="alert">{this.state.msg}</span>
                        <form id="form-contato" onSubmit={this.handleSubmit}>
                            <div className="col-xs-6 extras">
                                <input required name="username" id="username" type="text" className="input" placeholder="Name" ref="Login" autoComplete="off" onChange={this.handleChange}   />
                                <label htmlFor="txtFullname">Username</label>
                            </div>
                            <div className="col-xs-6 extras">
                                <input required name="email" id="password" type="password" className="input" placeholder="Key" ref="email" autoComplete="off" onChange={this.handleChange} />
                                <label htmlFor="txtEmail">Password</label>
                             </div>
                            <div className="col-xs-4 extras" />
                            <div className="col-xs-4 extras">
                                <button className="locate" type="Submit"> Login </button>
                            </div>
                            <div className="col-xs-4 extras" />
                                
                        </form>
                    </div>
                </div>
            </section>  
        )
    }
}
