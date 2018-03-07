// Arquivo que gera o Google Maps, faz o dispatch dos dados para o nosso banco e interaje com o usuário
// O botão do Uber usado envia as coords de localização do usuário e do local escolhido para o App do Uber
// A função em alguns browsers não cosegue retornar se o Uber está instalado ou não, segunda a sua API: 
// https://developer.uber.com/docs/riders/ride-requests/tutorials/deep-links/introduction

import React, {Component}  from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import DataApi  from '../logic/DataApi'

export class IncludeMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            places: [],
            status: '',
            centerLat: this.props.myLocation[0],
            centerLng: this.props.myLocation[1],
            buttonUber: true,
            currentMarkerLat: '',
            currentMarkerLng: '',
            name: this.props.name,
            email: this.props.email,
            range: this.props.range,
            userDevice: this.props.userDevice
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.onMapReady = this.onMapReady.bind(this);
        this.searchNearby = this.searchNearby.bind(this);
        this.saveData = this.saveData.bind(this);
    }

   // Retorna as funções imediatamente com o mapa pronto
    onMapReady(mapProps, map) {
        this.searchNearby(map, map.center);
        map.setCenter({lat: this.state.centerLat, lng: this.state.centerLng})
    }

    // Guarda as interações e verifica se o pin clicado é da localização do usuário ou universidade
    onMarkerClick(props, marker, e) {
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        currentMarkerLat: e.latLng.lat(),
        currentMarkerLng: e.latLng.lng()
        });
        if (marker.title === "myPoint") {
            this.setState({buttonUber: false})
        }        
        else {
            this.setState({buttonUber: true})
            this.saveData()
        }
    }

    // Envia os dados coletados a cada clique nos pins das universidades
    saveData() {
        this.props.store.dispatch(DataApi.save(
            this.state.name,
            this.state.email,
            this.state.centerLat,
            this.state.centerLng,
            this.state.userDevice,
            this.props.nearByDistance,
            this.state.currentMarkerLat,
            this.state.currentMarkerLng
        ));
    }

    // Remove a janela de Info aberta no momento do clique
    onMapClicked(props) {
        if (this.state.showingInfoWindow) {  
          this.setState({
            showingInfoWindow: false,
            activeMarker: null,
          })
        }
    }

    // Faz a busca de proximidade, quando retorna muitos dados o ideal é usar o Radar Search da API do Google
    // https://developers.google.com/places/web-service/search?hl=pt-br#RadarSearchRequests
    searchNearby(map, center) {
        const {google} = this.props;
        const service = new google.maps.places.PlacesService(map);

        // Especifica a localização, raio e tipo de lugar para a API de Busca de Lugares (Places API)
        const request = {
           location: new google.maps.LatLng(this.props.myLocation[0],this.props.myLocation[1]),
           radius: this.props.nearByDistance,
           type: 'university'
         };

        // O serviço envia a array de dados para state para ser renderizado na view
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.setState({
                places: results,
                status: status 
            })
            
          }        
        })
    }

    render() {
        return (
            <Map
                google={this.props.google}
                className={'map'}
                onReady={this.onMapReady}
                visible={true}
                zoom={this.props.zoom}
                reset={this.state.reset}
                onClick={this.onMapClicked}
                clickableIcons={false}

            >
                <Marker
                    onClick={this.onMarkerClick}
                    title={"myPoint"}
                    name={"Estou aqui"}
                    position={{lat: this.props.myLocation[0], lng: this.props.myLocation[1]}}
                    icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
                />

                {this.state.places.map(places => 
                    <Marker
                        onClick={this.onMarkerClick}
                        key={places.id}
                        name={places.name}
                        title={places.name}
                        position={places.geometry.location}
                    />
                )}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose}>
                    <div>
                        <h6>{this.state.selectedPlace.name}</h6>
                        
                            {this.state.buttonUber && <div className="uberButton">
                                <p>
                                    <a href={"https://m.uber.com/ul/?client_id=1zs9u7FpfBvi6QWa0E77GV3LP6c8V1iQ&action=setPickup&pickup[latitude]=lat:" + 
                                    this.props.myLocation[0] +
                                    "&pickup[longitude]=" +
                                    this.props.myLocation[1] +
                                    "&dropoff[latitude]=" +
                                    this.state.currentMarkerLat +
                                    "&dropoff[longitude]=" +
                                    this.state.currentMarkerLng
                                    }>
                                    <img src="images/uber.png" alt="Vá de Uber até esse local" title="Vá de Uber até esse local"/></a>
                                </p>
                            </div>
                            }
                    </div>
                </InfoWindow>
            </Map>
        );
      }
    }
export default GoogleApiWrapper({
    apiKey: "AIzaSyC8AqZGEDQvRcNCofun-o3YSJXU6V9G9LE",
    version: '3',
    language: 'portuguese'
})(IncludeMap)