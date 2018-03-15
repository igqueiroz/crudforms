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
    static menu(changeMenuItems) {
      return dispatch => {
        dispatch({type:'MENULOGIN', changeMenuItems});
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

