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
                "streetNumber": parseFloat(NewUserData[6]),
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
                "streetNumber": parseFloat(NewUserData[6]),
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
                  },  3000);
                }
                else {
                    document.querySelector('.progress').className = 'locate';
                    throw new Error("Falha na comunicação com o Firebase, tente novamente mais tarde.");
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
    static delete(userId, typeOfRegister, loading){
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
                      const clear = 'Usuário removido com sucesso.';
                      dispatch({type:'SUCCESS', clear});
                      setTimeout(() => {
                          const clear = '';
                          dispatch({type:'SUCCESS', clear});
                          if(typeOfRegister === "pessoa_fisica") {
                            dispatch(DataApi.list('pessoa_fisica', loading));
                          }
                          else {
                            dispatch(DataApi.list('pessoa_juridica', loading));
                          }
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

        //quando fizer update evita o encoder duplicado dos valores
        newValues[0] = decodeURIComponent(newValues[0]);
        newValues[1] = decodeURIComponent(newValues[1]);
        newValues[4] = decodeURIComponent(newValues[4]);
        newValues[5] = decodeURIComponent(newValues[5]);
        oldValues.city = decodeURIComponent(oldValues.city);
        oldValues.neighborhood = decodeURIComponent(oldValues.neighborhood);
        oldValues.zip = decodeURIComponent(oldValues.zip);
        oldValues.country = decodeURIComponent(oldValues.country)
        oldValues.complement = decodeURIComponent(oldValues.complement)
        oldValues.state = decodeURIComponent(oldValues.state)
        oldValues.streetName = decodeURIComponent(oldValues.streetName)
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
                "streetNumber": parseFloat(oldValues.streetNumber),
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
                "streetNumber": parseFloat(oldValues.streetNumber),
                "streetName": encodeURIComponent(oldValues.streetName)
              }
          }),
          headers: headers
        }
        const requestData = selectionType === 'pessoa_fisica' ? requestDataPessoaFisica : requestDataPessoaJuridica;
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
                    throw new Error('Erro de comunicação com o Firebase, tente novamente mais tarde.');
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

    static updateAddress(selectionType, editId, newValues, loading) {
      return dispatch => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + localStorage.getItem('auth-token'));
        
        //quando fizer update evita encoder duplicadamente os valores
        newValues.forEach( (element,index) => {
          if (index === 3) {
            if (element === 'Male' || element === 'Female') {
              newValues[index] = (newValues[index] === 'Male') ? "m" : "f";
            }
          }
          else if (index === 9) {
            newValues[index] = newValues[index].match(/react-text/g) ? "" : newValues[index];
          }
          else {
            newValues[index] = decodeURIComponent(newValues[index]);
          }
        })
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
                "city":  encodeURIComponent(newValues[10]), 
                "neighborhood": encodeURIComponent(newValues[8]), 
                "zip": encodeURIComponent(newValues[12]), 
                "country": encodeURIComponent(newValues[13]),
                "complement": encodeURIComponent(newValues[9]),
                "state": encodeURIComponent(newValues[11]),
                "streetNumber": parseFloat(newValues[7]),
                "streetName": encodeURIComponent(newValues[6])
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
                "city": encodeURIComponent(newValues[9]),
                "neighborhood": encodeURIComponent(newValues[7]),
                "zip": encodeURIComponent(newValues[11]),
                "country": encodeURIComponent(newValues[12]),
                "complement": encodeURIComponent(newValues[8]),
                "state": encodeURIComponent(newValues[10]),
                "streetNumber": parseFloat(newValues[6]),
                "streetName": encodeURIComponent(newValues[5])
              }
          }),
          headers: headers
        }
        const requestData = selectionType === "pessoa_fisica" ? requestDataPessoaFisica : requestDataPessoaJuridica;
        fetch(`https://paguemob-interview-environment.firebaseapp.com/contacts/` + editId, requestData)
            .then(response => {
                if(response.ok) {
                  const clear = 'O endereço foi atualizado com sucesso.';
                  dispatch({type:'SUCCESS', clear});
                  
                  if(selectionType === "pessoa_fisica") {
                    dispatch(DataApi.list('pessoa_fisica',loading));
                    if (loading) {loading.classList.remove('progress')}
                  }
                  else if(selectionType === "pessoa_juridica") {
                    dispatch(DataApi.list('pessoa_juridica',loading));
                    if (loading) {loading.classList.remove('progress')}
                  }

                  else {
                    if (loading) {loading.classList.remove('progress')}
                  }                      
                  setTimeout(() => {
                    const clear = '';
                    dispatch({type:'NOTIFY', clear});
                  },  5000);
                }
                else {
                    if (loading) {loading.classList.remove('progress')}
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

    static openModalPJ(openPJ) {
      return dispatch => {
        dispatch({type:'OPENMODALPJ', openPJ});
      }
    }

    // retorna o índice do See/Edit clicado para abrir o Modal
    static populateModal(values) {
      return dispatch => {
        dispatch({type:'POPULATEMODAL', values});
      }
    }

    static populateModalPJ(valuesPJ) {
      return dispatch => {
        dispatch({type:'POPULATEMODALPJ', valuesPJ});
      }
    }
    
}

