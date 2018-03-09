// Arquivo de Login para o Firebase

import React, {Component}  from 'react'
import IncludeMap from './IncludeMap'

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
        event.preventDefault();
        //alert("Desculpe, você deve ativar o serviço de Geolocation para continuar.");
        document.querySelector('.locate').className = 'locate progress';     
    }

    // faz alertas de erro para o usuário
   

    render() {
        return (
            <section className="destaques">
                <div className="container">
                    <div className="row">
                        <div className="logo"><img src="images/mysitelogo@400x-100.png" alt="CRUD Forms" title="CRUD Forms" /></div>
                        <h4>Digite seu login e senha:</h4>
                        <form id="form-contato" onSubmit={this.handleSubmit}>
                            <div className="col-xs-6 extras">
                                <input required name="username" id="username" type="text" className="input" placeholder="Name" ref="Login" autoComplete="off" value={this.state.username} onChange={this.handleChange}   />
                                    <label htmlFor="txtFullname">Username</label>
                            </div>
                            <div className="col-xs-6 extras">
                                <input required name="email" id="password" type="password" className="input" placeholder="Key" ref="email" autoComplete="off" value={this.state.password}  onChange={this.handleChange} />
                                    <label htmlFor="txtEmail">Password</label>
                             </div>
                            
                            <div className="col-xs-4 extras" />
                                
                         
                            <div className="col-xs-4 extras">
                                <button className="locate" type="Submit"> Login </button>
                            </div>
                            <div className="col-xs-4 extras" />
                                
                        
                            {/*this.state.rangeButton && <button className="locate" type="Submit">Eu quero achar universidades!</button>*/}
                        </form>
                    </div>
                </div>
            </section>  
        )
    }
}
