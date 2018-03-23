// arquivo da programação funcional que retorna toda as ações da aplicação

export function empresa(empresa=[], action){
  // reducer que recebe o fetch na API criada e devolve os dados recebidos
  if(action.type === 'LISTEMPRESA'){
    return action.empresa;
  }  
  return empresa
} 