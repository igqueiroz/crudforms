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

    static register(selectionType, NewUserData) {
      return dispatch => {
        console.log(selectionType)
        console.log(NewUserData)
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + localStorage.getItem('auth-token'));
        const requestDataPessoaFisica =  {
          method: 'POST',
          body: JSON.stringify({
              "userInfo": {
                "website": NewUserData[9],
                "cnpj": "00000000000000",
                "name": NewUserData[14],
                "gender": NewUserData[11],
                "telephone": NewUserData[10],
                "cpf": NewUserData[12],
                "email": NewUserData[13]
              }, 
              "address": {
                "city": NewUserData[3],
                "neighborhood": NewUserData[5],
                "zip": NewUserData[1],
                "country": NewUserData[0],
                "complement": NewUserData[4],
                "state": NewUserData[2],
                "streetNumber": parseInt(NewUserData[6]),
                "streetName": NewUserData[7]
              }
          }),
          headers: headers
        }
        const requestDataPessoaJuridica =  {
          method: 'POST',
          body: JSON.stringify({
              "userInfo": {
                "website": NewUserData[9],
                "cnpj": NewUserData[11],
                "name": NewUserData[13],
                "gender": "m",
                "telephone": NewUserData[10],
                "cpf": "00000000000",
                "email": NewUserData[12]
              }, 
              "address": {
                "city": NewUserData[3],
                "neighborhood": NewUserData[5],
                "zip": NewUserData[1],
                "country": NewUserData[0],
                "complement": NewUserData[4],
                "state": NewUserData[2],
                "streetNumber": parseInt(NewUserData[6]),
                "streetName": NewUserData[7]
              }
          }),
          headers: headers
        }
        const requestData = selectionType === "pessoa_fisica" ? requestDataPessoaFisica : requestDataPessoaJuridica;
        fetch(`https://paguemob-interview-environment.firebaseapp.com/contacts`, requestData)
            .then(response => {
                if(response.ok) {
                  document.querySelector('.progress').className = 'locate';
                  const clear = 'Seu novo usuário foi criado.';
                  dispatch({type:'SUCCESS', clear});
                  setTimeout(() => {
                    const clear = '';
                    dispatch({type:'SUCCESS', clear});
                     // Limpa o formulário após a inserção do usuário
                    if (selectionType ==="pessoa_fisica") {
                      document.querySelector('.pessoa_fisica').reset();
                      document.querySelector('#route').value = "";
                      document.querySelector('#street_number').value = "";
                      document.querySelector('#sublocality_level_1').value = "";
                      document.querySelector('#administrative_area_level_2').value = "";
                      document.querySelector('#administrative_area_level_1').value = "";
                      document.querySelector('#postal_code').value = "";
                    } else {
                      document.querySelector('.pessoa_juridica').reset();
                      document.querySelector('#route2').value = "";
                      document.querySelector('#street_number2').value = "";
                      document.querySelector('#sublocality_level_12').value = "";
                      document.querySelector('#administrative_area_level_22').value = "";
                      document.querySelector('#administrative_area_level_12').value = "";
                      document.querySelector('#postal_code2').value = "";
                      document.querySelector('#country2').value = "";
                    }
                  },  3000);
                }
                else {
                    throw new Error("Falha na comunicação com o Firebase, tente novamente mais tarde.");
                    document.querySelector('.progress').className = 'locate';
                }
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

    // Lista os dados recebidos do Firebase
    static list(typeOfRegister){
      return dispatch => {
        const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Basic ' + localStorage.getItem('auth-token'));
            const requestData = {          
              method: 'GET',
              headers: headers
            }
            fetch(`https://paguemob-interview-environment.firebaseapp.com/contacts`, requestData)
                .then(response => {
                    if(response.ok) {
                      return response.json()
                    }
                    else {
                        throw new Error("Erro de comunicação com o Firebase, tente novamente mais tarde.");
                    }
                })
                .then(usersNewData => {
                    if(typeOfRegister === 'pessoa_fisica') {
                        let users = []
                        let remove = []
                        users = usersNewData;
                        users.forEach( (element,index) => {
                          if(element.userInfo.cpf === "00000000000") {
                            remove.push(index)
                          }
                        })
                        users = users.filter(function(value, index) {
                          return remove.indexOf(index) === -1;
                        })
                        dispatch({type:'LISTDATA', users});
                    } else {
                        let users = []
                        let remove = []
                        users = usersNewData;
                        users.forEach( (element,index) => {
                          if(element.userInfo.cnpj === "00000000000000") {
                            remove.push(index)
                          }
                        })
                        users = users.filter(function(value, index) {
                          return remove.indexOf(index) === -1;
                        })
                        dispatch({type:'LISTDATA', users});
                      }
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
    static delete(userId, typeOfRegister){
      return dispatch => {
        const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Basic ' + localStorage.getItem('auth-token'));
            const requestData = {          
              method: 'DELETE',
              body: '',
              headers: headers
            }
            fetch(`https://paguemob-interview-environment.firebaseapp.com/contacts/` + userId, requestData)
                .then(response => {
                    if(response.ok) {
                      this.list(typeOfRegister);
                      const clear = 'Usuário removido com sucesso.';
                      dispatch({type:'SUCCESS', clear});
                      setTimeout(() => {
                          const clear = '';
                          dispatch({type:'SUCCESS', clear});

                      }, 3000);
                    }
                    else {
                        throw new Error("Erro de comunicação com o Firebase, tente novamente mais tarde.");
                    }
                })
                .catch(error => {
                dispatch({type:'NOTIFY', error});
                setTimeout(() => {
                    const clear = '';
                    dispatch({type:'NOTIFY', clear});
                },  3000);
            }) 

      }

    }
    static update(selectionType, editId, newValues, oldValues) {
      return dispatch => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + localStorage.getItem('auth-token'));
        // console.log(selectionType)
        // console.log(editId)
        // console.log(newValues)
        // console.log(oldValues)
        newValues[3] = (newValues[3] === 'Male') ? "m" : "f";
        const requestDataPessoaFisica = {
          method: 'PUT',
          body: JSON.stringify({
            "userInfo": {
                "website": encodeURIComponent(newValues[4]), 
                "cnpj": "00000000000000", 
                "name": encodeURIComponent(newValues[0]), 
                "gender": newValues[3],
                "telephone": encodeURIComponent(newValues[9]), 
                "cpf": newValues[2], 
                "email":  encodeURIComponent(newValues[1])
              }, 
              "address": {
                "city":  encodeURIComponent(oldValues[0]), 
                "neighborhood": encodeURIComponent(oldValues[3]), 
                "zip": encodeURIComponent(oldValues[7]), 
                "country": encodeURIComponent(oldValues[2]), 
                "complement": encodeURIComponent(oldValues[1]), 
                "state": encodeURIComponent(oldValues[4]), 
                "streetNumber": parseInt(oldValues[6]), 
                "streetName": encodeURIComponent(oldValues[5])
              }
          }),
          headers: headers
        }
        const requestDataPessoaJuridica = {
          method: 'PUT',
          body: JSON.stringify({
            "userInfo": {
                "website": newValues[5], 
                "cnpj": newValues[2], 
                "name": newValues[0], 
                "gender": newValues[3],
                "telephone": newValues[4], 
                "cpf": "00000000000", 
                "email": newValues[1]
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
        const requestData = selectionType === "pessoa_fisica" ? requestDataPessoaFisica : requestDataPessoaJuridica;
        fetch(`https://paguemob-interview-environment.firebaseapp.com/contacts/` + editId, requestData)
            .then(response => {
                if(response.ok) {
                  const clear = 'O usuário foi atualizado.';
                  dispatch({type:'SUCCESS', clear});
                  setTimeout(() => {
                    const clear = '';
                    dispatch({type:'NOTIFY', clear});
                  },  5000);
                }
                else {
                    throw new Error("Erro de comunicação com o Firebase, tente novamente mais tarde.");
                }
            })
            .then(list => {
                this.setState({users: list})
                
            })
      }
    }
}

