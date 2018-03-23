// arquivo da programação funcional que retorna toda as ações da aplicação

export function modal(modal=false, action){
  // reducer que recebe o fetch na API criada e devolve os dados recebidos
  if(action.type === 'OPENMODAL'){
    return action.open;
  }
  if(action.type === 'CLOSEMODAL'){
    return action.open;
  }  
  return modal
} 