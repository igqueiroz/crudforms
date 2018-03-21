// arquivo da programação funcional que retorna toda as ações da aplicação

export function notify(state='', action){
  // reducer que recebe o fetch na API criada e devolve os dados recebidos
  if(action.type === 'NOTIFY'){
  	if(action.error) {
  		return action.error.message;	
  	} else{
  		return null
  	}
    
  }
  if(action.type === 'SUCCESS'){
  	if(action) {
  		return action.clear;
  	} else{
  		return null
  	}
    
  }
   return state;
} 