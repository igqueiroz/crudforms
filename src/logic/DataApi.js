// Lógicas do App, envia as requisições aos reducers e mantém as views focadas na exibição de conteúdo
import base64 from 'base-64'
import { browserHistory } from 'react-router'

//Envia via POST todos os dados coletados durante as interações do usuário
export default class DataApi {
    static login(username, password){
      return dispatch => {  
        const headers = new Headers();
        const credentials = base64.encode(username  + ':' + password);
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + credentials);
        const requestData = {
          method: 'GET',
          headers: headers
        }
        fetch(`https://paguemob-interview-environment.firebaseapp.com/contacts`, requestData)
            .then(response => {
                if(response.ok) {
                  document.querySelector('.locate').className = 'locate';
                  return response.json()
                }
                else {
                    document.querySelector('.locate').className = 'locate';
                    throw new Error('Não foi possível fazer o login, verifique seu usuário e senha, e tente novamente.');
                }
            })
            .then(list => {
                localStorage.setItem('auth-token', credentials);
                browserHistory.push('/modules');
                document.querySelector('.sign').style.display = "none";
                document.querySelectorAll('.logged').forEach( (element) => {
                  element.style.display = "block";
                })
            })
            .catch(error => {
                dispatch({type:'NOTIFY', error});
                setTimeout(() => {
                    const clear = '';
                    dispatch({type:'NOTIFY', clear});
                },  5000);
            })
      }
    }

    static register(typeOfUser, NewUserData) {
      return dispatch => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + localStorage.getItem('auth-token'));
         NewUserData[3] = (NewUserData[3] = 'Male') ? "m" : "f";
        const requestData = {
          method: 'GET',
          body: JSON.stringify({
              "userInfo": {
                "website": NewUserData[0], 
                "cnpj": "43565786790368", 
                "name": "William Oliveira", 
                "gender": "f", 
                "telephone": "129873499574", 
                "cpf": "22504323840", 
                "email": "anapaula@gmail.com"
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
        fetch(`https://paguemob-interview-environment.firebaseapp.com/contacts`, requestData)
            .then(response => {
                if(response.ok) {
                    document.querySelector('.locate').className = 'locate';
                   return response.json()
                }
                else {
                    throw new Error("Falha na comunicação com o Firebase, tente novamente mais tarde.");
                }
            })
            .then(list => {
                let msg = 'Novo ID criado: ' + list;
                dispatch({type:'NOTIFY', msg});
            })
            .catch(error => {
                dispatch({type:'NOTIFY', error});
                setTimeout(() => {
                    const clear = '';
                    dispatch({type:'NOTIFY', clear});
                },  5000);
            }) 
      }
    }

    // Lista os dados recebidos e guardados na API do banco MongoDB
    static list(listUrl){
      return dispatch => {  
        const requestInfo = {
          method: 'GET',
          mode: 'cors'
        };
        //recebe os dados consumíveis da API criada, o servidor já está no modo Cross-Origin
        fetch(listUrl, requestInfo)
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
                else {
                    throw new Error("Não rolou comunicação com a API");
                }
            })
            .then(list => {
              //envia a requisição para o reducer do Redux e realiza a ação desejada
              // list.users => primeira chave do JSON en http://localhost:3001/userlist
              const listing = list.users
              // O "listing" do reducer deve retornar a função manipulada para devolver um Array ao nosso componente
              dispatch({type:'LISTDATA', listing});
              return listing;
          }); 

      }

    }
}

