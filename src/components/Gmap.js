// Arquivo container para as funções do Mapa Google Maps, recebe as primeiras interações do usuário e salva no state

import React, {Component}  from 'react'
import IncludeMap from './IncludeMap'

export default class Gmap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myLocation: [],
            zoom: 5,
            nearByDistance: 0,
            name: '',
            email: '',
            submit: false,
            rangeButton: false,
            userDevice: navigator.userAgent,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myLocation = this.myLocation.bind(this);
        this.updateNearByDistance = this.updateNearByDistance.bind(this);
        this.alertBox = this.alertBox.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // realiza as interações com os 2 inputs de nome e email e envio ao estado do componente
    handleChange (event) {
        const inputId = event.target.id;
        this.setState({[inputId]: event.target.value});
    }

    // usa a Geo Location do navegador e envia os dados paraa o estado do componente 
    handleSubmit(event) {
        event.preventDefault();
        document.querySelector('.locate').className = 'locate progress';
        if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(function(position) {
                 this.setState({ 
                     myLocation: [position.coords.latitude,position.coords.longitude],
                     submit: true
                 });
                 document.querySelector('.locate').className = 'locate';
                 
             }.bind(this))
         }
        else { 
             this.alertBox("Desculpe, você deve ativar o serviço de Geolocation para continuar.");
        }
    }

    // faz alertas de erro para o usuário
    alertBox(message) {
        alert(message)
    }

    //recebe a interações do botão de raio em km e muda o tipo de zoom para o mnapa a ser renderizado
    updateNearByDistance(event,meters,zoom) {
        event.preventDefault();
        document.querySelectorAll('.nearbymeters').forEach(i => { i.className = 'nearbymeters' });
        const buttonClicked = event.currentTarget;
        buttonClicked.className = 'nearbymeters progress active';
        this.setState({
            nearByDistance: meters, 
            zoom: zoom,
            submit: false,
            rangeButton: true
        })

        // reseta o carregando dos botões da escolha do raio de alcance da busca
        setTimeout(() => {
            buttonClicked.className = 'nearbymeters active';  
        }, 250);
        
    }

    // anima o botão de localização
     myLocation() {
        document.querySelector('.mylocate').className = 'mylocate progress';
    }
    
    render() {
        return (
            <section className="destaques">
                <div className="container">
                    <div className="row">
                        <div className="logo"><img src="images/mysitelogo@400x-100.png" alt="Where in the World is My Site?" title="Where in the World is My Site?" /></div>
                        <h4>Digite seus dados:</h4>
                        <form id="form-contato" onSubmit={this.handleSubmit}>
                            <div className="col-xs-6 extras">
                                <input required name="name" id="name" type="text" className="input" placeholder="Completo" ref="name" autoComplete="off" value={this.state.name} onChange={this.handleChange}   />
                                    <label htmlFor="txtFullname">Nome</label>
                            </div>
                            <div className="col-xs-6 extras">
                                <input required name="email" id="email" type="text" className="input" placeholder="nome@seuprovedor" ref="email" autoComplete="off" value={this.state.email}  onChange={this.handleChange} />
                                    <label htmlFor="txtEmail">E-mail</label>
                             </div>
                            <h4 className="title">Ache universidades próximas num raio de:</h4>
                            <div className="col-xs-4 extras">
                                <button className="nearbymeters" onClickCapture={(e) => this.updateNearByDistance(e,1000,13)}> 1km </button>
                            </div>
                            <div className="col-xs-4 extras">
                                <button className="nearbymeters" onClickCapture={(e) => this.updateNearByDistance(e,2000,11)}> 2km </button>
                            </div>
                            <div className="col-xs-4 extras">
                                <button className="nearbymeters" onClickCapture={(e) => this.updateNearByDistance(e,3000,10)}> 3km </button>
                            </div>
                            {this.state.rangeButton && <button className="locate" type="Submit">Eu quero achar universidades!</button>}
                        </form>
                        <div id="map">
                            {
                            //se o estado do submit retorna true carrega o componente do Mapa
                            }
                            {this.state.submit && <IncludeMap
                                store={this.props.routes[0].store}
                                myLocation={this.state.myLocation}
                                zoom={this.state.zoom}
                                nearByDistance={this.state.nearByDistance}
                                name={this.state.name}
                                email={this.state.email}
                                userDevice={this.state.userDevice}
                             />}
                            
                        </div> 
                    </div>
                </div>
            </section>  
        )
    }
}
