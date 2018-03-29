// Para uma atenticação completa pelo Firebase é necessário ter as chaves da API apiKey
// Doc: https://firebase.google.com/docs/auth/users

import React, { Component }  from 'react'
import ReactDOM from 'react-dom'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import DataApi from '../logic/DataApi'      

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            place: '',
            selectionType: '',
            street_number: '', //number
            route: '', // street
            sublocality_level_1: '', // neighborhood
            administrative_area_level_2: '', // city
            administrative_area_level_1: '', // uf
            country: '', // country
            postal_code: '', // zip
            street_number2: '', //number2
            route2: '', // street2
            sublocality_level_12: '', // neighborhood2
            administrative_area_level_22: '', // city2
            administrative_area_level_12: '', // uf2
            country2: '', // country2
            postal_code2: '', // zip2
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleType = this.handleType.bind(this);
        this.avoidSubmit = this.avoidSubmit.bind(this);
        this.renderAutoComplete = this.renderAutoComplete.bind(this);
        this.serialize = this.serialize.bind(this);
    }

    //puxa o form inteiro e coloca em uma string com encodeURI
    serialize(form) {
        if(!form||form.nodeName!=="FORM"){return }
            let i,j,q=[];for(i=form.elements.length-1;i>=0;i-=1){
                if(form.elements[i].name===""){continue}
                    switch(form.elements[i].nodeName){
                        case"INPUT":switch(form.elements[i].type){  
                            case"text":case"tel":case"number":case"url":case"email":case"hidden":case"password":case"button":case"reset":case"submit":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));
                            break;
                            case"checkbox":case"radio":if(form.elements[i].checked){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value))}
                            break;
                            case"file":break;
                            default:break}
                            break;
                            case"TEXTAREA":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));
                            break;
                            case"SELECT":switch(form.elements[i].type){
                                case"select-one":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));
                                break;
                            case"select-multiple":for(j=form.elements[i].options.length-1;j>=0;j-=1){
                                if(form.elements[i].options[j].selected){
                                    q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].options[j].value))}}
                                    break; default:break}
                                    break;
                            case"BUTTON":switch(form.elements[i].type){
                                case"reset":case"submit":case"button":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));
                                break;
                                default:break;}
                                break;
                            default:break;}
                            }
                            return q.join("&")
    }
    // realiza as interações com os 2 inputs de nome e password e envio ao estado do componente
    handleChange (event) {
        const inputId = event.target.id;
        this.setState({[inputId]: event.target.value});
    }

    avoidSubmit(event) {
        event.target.addEventListener('keydown', (e) => {
            if(e.keyCode === 13) {
            e.preventDefault(); return false; }
        });
    }

    // usa a Geo Location do navegador e envia os dados para o estado do componente 
    handleSubmit(event) {
        event.preventDefault();
        event.target.querySelector('.locate').className = 'locate progress';
        let newUserData = this.serialize(event.target).split('&');
        let dataArray = [];
        let dataSplit = [];
        newUserData.forEach((e) => {
            dataSplit = e.split('=');
            dataArray.push(dataSplit[1])
        })
        this.props.routes[0].store.dispatch(DataApi.register(this.state.selectionType, dataArray));
    }

    handleType(event) {
        const inputId = event.target.value;
        this.setState({selectionType: event.target.value});
        if(inputId === 'pessoa_fisica') {
                document.querySelector('.pessoa_fisica').classList.add("show-type");
                document.querySelector('.pessoa_juridica').classList.add("hide-type");
                document.querySelector('.pessoa_juridica').classList.remove("show-type");
            } else {
                document.querySelector('.pessoa_fisica').classList.add("hide-type");
                document.querySelector('.pessoa_fisica').classList.remove("show-type");
                document.querySelector('.pessoa_juridica').classList.add("show-type");
        }       
    }

     componentDidMount() {
        this.props.routes[0].store.subscribe(() => {
            // notify é o espaço armazenado na store criado da função de seu reducer
            this.setState({msg: this.props.routes[0].store.getState().notify})
         })
    }

    // maskIput() {
    //     //Masks
    //     var maskBehavior = function (val) {
    //      return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    //     },
    //     options = {onKeyPress: function(val, e, field, options) {
    //      field.mask(maskBehavior.apply({}, arguments), options);
    //      }
    //     };
         
    //     $('#telephone, #telephone2').mask(maskBehavior, options);
    // }
   
    renderAutoComplete() {
        const { google } = this.props;
        const aref = this.refs.autocomplete;
        const aref2 = this.refs.autocomplete2;
        const node = ReactDOM.findDOMNode(aref);
        const node2 = ReactDOM.findDOMNode(aref2);
        const autocomplete = new google.maps.places.Autocomplete((node),{types: ['geocode']});
        const autocomplete2 = new google.maps.places.Autocomplete((node2),{types: ['geocode']});
        let componentForm = {
                street_number: 'short_name', //number
                route: 'long_name', // street
                sublocality_level_1: 'long_name', // bairro
                administrative_area_level_2: 'long_name', // city
                administrative_area_level_1: 'short_name', // uf
                country: 'short_name', // country
                postal_code: 'long_name' // zip
        };
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            //console.log(place)
            for (let i = 0; i < place.address_components.length; i++) {
              let addressType = place.address_components[i].types[0];
              if (componentForm[addressType]) {
                let val = place.address_components[i][componentForm[addressType]];
                this.setState({
                    place: place,
                    [addressType]: val 
                })
              }
            }
        })
        autocomplete2.addListener('place_changed', () => {
            const place2 = autocomplete2.getPlace();
            //console.log(place2);
            for (let i = 0; i < place2.address_components.length; i++) {
              let addressType = place2.address_components[i].types[0];
              if (componentForm[addressType]) {
                let val = place2.address_components[i][componentForm[addressType]];
                this.setState({
                    place: place2,
                    [addressType + '2']: val // para cadastrar o segundo tipo de form >> empresa
                })
              }
            }
        })
    }

    render() {
        return (
            <section className="destaques">
                <div className="container">
                    <div className="row">
                        <div className="logo"><img src="images/mysitelogo@400x-100.png" alt="CRUD Forms" title="CRUD Forms" /></div>
                        <h4>Cadastro de novo usuário:</h4>
                        <span className="alert">{this.state.msg}</span>
                        <div className="row">
                            <h1>Selecione o tipo de cadastro:</h1>
                            <input type="radio" id="pessoa_fisica"  name="type" value="pessoa_fisica" onChange={this.handleType} />
                            <label htmlFor="pessoa_fisica" className="type-register">Pessoa Física</label>
                            <input type="radio" id="empresa" name="type" value="empresa" onChange={this.handleType} />
                            <label htmlFor="empresa" className="type-register">Empresa</label>
                        </div>
                        <form id="form-contato" className="pessoa_fisica" onSubmit={this.handleSubmit}>
                            <div className="col-md-6 extras" >
                                <h3>Informações</h3>
                                <div className="row top-buffer">
                                   
                                    <div className="col-xs-12 extras">
                                        
                                        <input required name="name" id="name" type="text" className="input" placeholder="Full name" ref="name"  autoComplete="new-password" onChange={this.handleChange}   />
                                        <label htmlFor="txtFullname">Name</label>
                                    </div>
                                 
                                </div>

                                <div className="row top-buffer">
                                    
                                    <div className="col-xs-12 extras">
                                        <input required name="email" id="email" type="email" className="input" placeholder="name@service.com" ref="email"  autoComplete="new-password"  onChange={this.handleChange}   />
                                        <label htmlFor="txtFullname">Email</label>
                                    </div>
                                 
                                </div>

                                <div className="row top-buffer">
                                    
                                    <div className="col-xs-12 extras">
                                        <input required name="cpf" id="cpf" type="number" className="input" placeholder="Only numbers" autoComplete="new-password" onChange={this.handleChange}  />
                                        <label htmlFor="txtFullname">CPF</label>
                                    </div>
                                    
                                </div>

                                <div className="row top-buffer">
                               
                                    <div className="form-group col-xs-12 extras">
                                        <select required name="gender" id="gender" className="select" ref="gender" onChange={this.handleChange}>
                                            <option defaultValue hidden> Select one</option>
                                            <option value="m">Male</option>
                                            <option value="f">Female</option>                                  
                                        </select>
                                        <label htmlFor="txtFullname">Gender</label>
                                    </div>
                                    
                                </div>

                                <div className="row top-buffer">
                                    
                                    <div className="col-xs-12 extras less-margin">
                                        <input  required name="telephone" id="telephone" type="tel"   className="input" placeholder="(XX) XXXXX-XXXX"  autoComplete="off" onChange={this.handleChange}   />
                                        <label htmlFor="txtFullname">Telephone</label>
                                    </div>
                                    
                                </div>

                                <div className="row top-buffer">
                                   
                                    <div className="col-xs-12 extras">
                                        <input required name="website" id="website" type="url" className="input" placeholder="http://yoursite.com" ref="website" autoComplete="off" onChange={this.handleChange}   />
                                        <label htmlFor="txtFullname">Website</label>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="col-md-6 extras">
                                <h3>Endereço</h3>
                                <div className="row top-buffer">
                                 
                                    <div className="col-xs-12 extras">
                                        <input required name="fullAddress" id="fullAdress" type="text" className="input" placeholder="Fill with full address. Press ESC to avoid Chrome AutoFill" ref="autocomplete" autoComplete="new-password" onChange={this.avoidSubmit}    />
                                        <label htmlFor="fullAddress">Full Address</label>
                                    </div>
                                    
                                </div>

                                <div className="row top-buffer">
                                 
                                    <div className="col-xs-9 extras">
                                        <input required name="route" id="route" type="text" className="input" ref="route" placeholder="Rua/ Av." autoComplete="new-password" value={this.state.route}  onChange={this.handleChange}    />
                                        <label htmlFor="street">Street</label>
                                    </div>
                                    <div className="col-xs-3 extras">
                                        <input required name="street_number" id="street_number" type="number" className="input" placeholder="XX" ref="street_number" autoComplete="new-password" value={this.state.street_number} onChange={this.handleChange}   />
                                        <label htmlFor="txtFullname">Number</label>
                                    </div>
                                </div>

                                <div className="row top-buffer">
                                    
                                    <div className="col-xs-12 extras">
                                        <input required name="sublocality_level_1" id="sublocality_level_1" type="text" className="input" placeholder="Vila Sônia" ref="sublocality_level_1" autoComplete="off" value={this.state.sublocality_level_1} onChange={this.handleChange}   />
                                        <label htmlFor="txtFullname">Neighborhood</label>
                                    </div>
                                    
                                </div>

                                <div className="row top-buffer">
                                  
                                    <div className="col-xs-4 extras">
                                        <input name="complement" id="complement" type="text" className="input" placeholder="Ap/ Block" ref="complement" autoComplete="off" onChange={this.handleChange}    />
                                        <label htmlFor="txtFullname">Complement</label>
                                    </div>
                                 
                                </div>

                                <div className="row top-buffer">
                                   
                                    <div className="col-xs-10 extras">
                                        <input required name="administrative_area_level_2" id="administrative_area_level_2" type="text" className="input" placeholder="São Paulo" ref="administrative_area_level_2" autoComplete="off"  onChange={this.handleChange}  value={this.state.administrative_area_level_2}  />
                                        <label htmlFor="txtFullname">City</label>
                                    </div>
                                    <div className="col-xs-2 extras">
                                        <input required name="administrative_area_level_1" id="administrative_area_level_1" type="text" className="input uf" placeholder="SP" ref="administrative_area_level_1" autoComplete="off" pattern="([A-Z]){2}" onChange={this.handleChange}  value={this.state.administrative_area_level_1}   />
                                        <label htmlFor="txtFullname">State</label>
                                    </div>
                                </div>

                                <div className="row top-buffer">
                                    
                                    <div className="col-xs-10 extras">
                                        <input required name="postal_code" id="postal_code" type="text" className="input" placeholder="XXXXX-XXX" ref="postal_code" autoComplete="off" onChange={this.handleChange}  value={this.state.postal_code}   />
                                        <label htmlFor="txtFullname">Zipcode</label>
                                    </div>
                                    <div className="col-xs-2 extras">
                                        <input required name="country" id="country" type="text" className="input" placeholder="BR" ref="country" autoComplete="off"  onChange={this.handleChange}   value={this.state.country}  />
                                        <label htmlFor="txtFullname">Country</label>
                                    </div>
                                </div>
                               
                            </div>
                            <div className="col-xs-12 top-buffer">
                                <div className="col-xs-4 extras" />
                                    <div className="col-xs-4 extras">
                                        <button className="locate" type="Submit"> OK </button>
                                    </div>
                                <div className="col-xs-4 extras" />
                            </div>
                        </form>
                        <form id="form-contato" className="pessoa_juridica" onSubmit={this.handleSubmit}>
                            <div className="col-md-6 extras" >
                                <h3>Informações</h3>
                                <div className="row top-buffer">
                                   
                                    <div className="col-xs-12 extras">
                                        <input required name="name2" id="name2" type="text" className="input" placeholder="Name" ref="name2"  autoComplete="new-password" onChange={this.handleChange}   />
                                        <label htmlFor="txtFullname">Company</label>
                                    </div>
                                 
                                </div>

                                <div className="row top-buffer">
                                    
                                    <div className="col-xs-12 extras">
                                        <input required name="email2" id="email2" type="email" className="input" placeholder="name@service.com" ref="email2"  autoComplete="new-password"  onChange={this.handleChange}   />
                                        <label htmlFor="txtFullname">Email</label>
                                    </div>
                                 
                                </div>

                                <div className="row top-buffer">
                                    
                                    <div className="col-xs-12 extras">
                                        <input required name="cnpj" id="cnpj" type="type" className="input" placeholder="Only numbers wihtout . or /" ref="cnpj" pattern="\d{14}"  autoComplete="new-password"  onChange={this.handleChange}   />
                                        <label htmlFor="txtFullname">CNPJ</label>
                                    </div>
                                    
                                </div>

                                <div className="row top-buffer">
                                    
                                    <div className="col-xs-12 extras">
                                        <input required name="telephone2" id="telephone2" type="tel" pattern="(\(\d{2}\))\s(\d{4,5})-\d{4}"  className="input" placeholder="(XX) XXXXX-XXXX" ref="telephone2" autoComplete="off" onChange={this.handleChange}   />
                                        <label htmlFor="txtFullname">Telephone</label>
                                    </div>
                                    
                                </div>

                                <div className="row top-buffer">
                                   
                                    <div className="col-xs-12 extras">
                                        <input required name="website2" id="website2" type="url" className="input" placeholder="http://yoursite.com" ref="website2" autoComplete="off" onChange={this.handleChange}   />
                                        <label htmlFor="txtFullname">Website</label>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="col-md-6 extras">
                                <h3>Endereço</h3>
                                <div className="row top-buffer">
                                 
                                    <div className="col-xs-12 extras">
                                        <input required name="fullAddress2" id="fullAdress2" type="text" className="input" placeholder="Fill with full address. Press ESC to avoid Chrome AutoFill" ref="autocomplete2" autoComplete="new-password" onChange={this.avoidSubmit}    />
                                        <label htmlFor="fullAddress">Full Address</label>
                                    </div>
                                    
                                </div>

                                <div className="row top-buffer">
                                 
                                    <div className="col-xs-9 extras">
                                        <input required name="route2" id="route2" type="text" className="input" placeholder="Rua/ Av." ref="route2" autoComplete="new-password" value={this.state.route2}  onChange={this.handleChange}   />
                                        <label htmlFor="street">Street</label>
                                    </div>
                                    <div className="col-xs-3 extras">
                                        <input required name="street_number2" id="street_number2" type="number" className="input" placeholder="XX" ref="street_number2" autoComplete="new-password" value={this.state.street_number2} onChange={this.handleChange}   />
                                        <label htmlFor="txtFullname">Number</label>
                                    </div>
                                </div>

                                <div className="row top-buffer">
                                    
                                    <div className="col-xs-12 extras">
                                        <input required name="sublocality_level_12" id="sublocality_level_12" type="text" className="input" placeholder="Vila Sônia" ref="sublocality_level_12" autoComplete="off" value={this.state.sublocality_level_12} onChange={this.handleChange}   />
                                        <label htmlFor="txtFullname">Neighborhood</label>
                                    </div>
                                    
                                </div>

                                <div className="row top-buffer">
                                  
                                    <div className="col-xs-4 extras">
                                        <input name="complement2" id="complement2" type="text" className="input" placeholder="Ap/ Block" ref="complement2" autoComplete="off" onChange={this.handleChange}    />
                                        <label htmlFor="txtFullname">Complement</label>
                                    </div>
                                 
                                </div>

                                <div className="row top-buffer">
                                   
                                    <div className="col-xs-10 extras">
                                        <input required name="administrative_area_level_22" id="administrative_area_level_22" type="text" className="input" placeholder="São Paulo" ref="administrative_area_level_22" autoComplete="off"  onChange={this.handleChange}  value={this.state.administrative_area_level_22}  />
                                        <label htmlFor="txtFullname">City</label>
                                    </div>
                                    <div className="col-xs-2 extras">
                                        <input required name="administrative_area_level_12" id="administrative_area_level_12" type="text" className="input uf" placeholder="SP" ref="administrative_area_level_12" autoComplete="off"  pattern="([A-Z]){2}"   onChange={this.handleChange}  value={this.state.administrative_area_level_12}   />
                                        <label htmlFor="txtFullname">State</label>
                                    </div>
                                </div>

                                <div className="row top-buffer">
                                    
                                    <div className="col-xs-10 extras">
                                        <input required name="postal_code2" id="postal_code2" type="text" className="input"  placeholder="XXXXX-XXX" minLength="8" ref="postal_code2" autoComplete="off" onChange={this.handleChange}  value={this.state.postal_code2}   />
                                        <label htmlFor="txtFullname">Zipcode</label>
                                    </div>
                                    <div className="col-xs-2 extras">
                                        <input required name="country2" id="country2" type="text" className="input" placeholder="BR" ref="country" autoComplete="off"  onChange={this.handleChange}   value={this.state.country2}  />
                                        <label htmlFor="txtFullname">Country</label>
                                    </div>
                                </div>
                               
                            </div>
                            <div className="col-xs-12 top-buffer">
                                <div className="col-xs-4 extras" />
                                    <div className="col-xs-4 extras">
                                        <button className="locate locate2" type="Submit"> OK </button>
                                    </div>
                                <div className="col-xs-4 extras" />
                            </div>
                        </form>
                    </div>
                </div>
                <Map google={this.props.google}
                     onReady={this.renderAutoComplete}
                     visible={false} 
                     className='map' />
            </section>  
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyC8AqZGEDQvRcNCofun-o3YSJXU6V9G9LE',
    version: '3',
    language: 'portuguese',
})(Register)