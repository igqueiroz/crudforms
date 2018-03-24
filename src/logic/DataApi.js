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
    static list(typeOfRegister,loading){
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
                        if (loading) {loading.classList.remove('progress')}
                    } else {
                        let empresa = []
                        let remove = []
                        empresa = usersNewData;
                        empresa.forEach( (element,index) => {
                          if(element.userInfo.cnpj === "00000000000000") {
                            remove.push(index)
                          }
                        })
                        empresa = empresa.filter(function(value, index) {
                          return remove.indexOf(index) === -1;
                        })
                        dispatch({type:'LISTEMPRESA', empresa});
                        if (loading) {loading.classList.remove('progress')}
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
    static update(selectionType, editId, newValues, oldValues, loading) {
      return dispatch => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + localStorage.getItem('auth-token'));
        newValues[3] = selectionType === 'pessoa_fisica' ? (newValues[3] === 'Male') ? "m" : "f" :  newValues[3];
        console.log(selectionType)
        console.log(editId)
        console.log(newValues)
        console.log(oldValues)
        const requestDataPessoaFisica = {
          method: 'PUT',
          body: JSON.stringify({
            "userInfo": {
                "website": encodeURIComponent(newValues[5]), 
                "cnpj": "00000000000000", 
                "name": encodeURIComponent(newValues[0]), 
                "gender": newValues[3],
                "telephone": encodeURIComponent(newValues[4]), 
                "cpf": newValues[2], 
                "email":  encodeURIComponent(newValues[1])
              }, 
              "address": {
                "city":  encodeURIComponent(oldValues.city), 
                "neighborhood": encodeURIComponent(oldValues.neighborhood), 
                "zip": encodeURIComponent(oldValues.zip), 
                "country": encodeURIComponent(oldValues.country),
                "complement": encodeURIComponent(oldValues.complement),
                "state": encodeURIComponent(oldValues.state),
                "streetNumber": parseInt(oldValues.streetNumber),
                "streetName": encodeURIComponent(oldValues.streetName)
              }
          }),
          headers: headers
        }
        const requestDataPessoaJuridica = {
          method: 'PUT',
          body: JSON.stringify({
            "userInfo": {
                "website": encodeURIComponent(newValues[4]), 
                "cnpj": encodeURIComponent(newValues[2]), 
                "name": encodeURIComponent(newValues[0]), 
                "gender": 'm',
                "telephone": encodeURIComponent(newValues[3]), 
                "cpf": "00000000000", 
                "email": encodeURIComponent(newValues[1])
              }, 
              "address": {
                "city": encodeURIComponent(oldValues.city),
                "neighborhood": encodeURIComponent(oldValues.neighborhood),
                "zip": encodeURIComponent(oldValues.zip),
                "country": encodeURIComponent(oldValues.country),
                "complement": encodeURIComponent(oldValues.complement),
                "state": encodeURIComponent(oldValues.state),
                "streetNumber": parseInt(oldValues.streetNumber),
                "streetName": encodeURIComponent(oldValues.streetName)
              }
          }),
          headers: headers
        }
        const requestData = selectionType === "pessoa_fisica" ? requestDataPessoaFisica : requestDataPessoaJuridica;
        fetch(`https://paguemob-interview-environment.firebaseapp.com/contacts/` + editId, requestData)
            .then(response => {
                if(response.ok) {
                  const clear = 'O usuário foi atualizado com sucesso.';
                  dispatch({type:'SUCCESS', clear});
                  
                  if(selectionType === "pessoa_fisica") {
                    dispatch(DataApi.list('pessoa_fisica',loading));
                    
                  }
                  else {
                    dispatch(DataApi.list('pessoa_juridica',loading));
                  }                      
                  setTimeout(() => {
                    const clear = '';
                    dispatch({type:'NOTIFY', clear});
                  },  5000);
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

    static openModal(open) {
      return dispatch => {
        dispatch({type:'OPENMODAL', open});
      }
    }

    static populateModal(values, loading) {
      return dispatch => {
        dispatch({type:'POPULATEMODAL', values});
      }
    }
    
}

