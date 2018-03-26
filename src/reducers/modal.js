// arquivo da programação funcional que retorna toda as ações da aplicação

export function modal(modal=false, action){
  // reducer que recebe o fetch na API criada e devolve os dados recebidos
  if(action.type === 'OPENMODAL'){
    console.log(action)
    return action;
  }

  return modal
}

export function modalPJ(modalPJ=false, action){
  // reducer que recebe o fetch na API criada e devolve os dados recebidos
  if(action.type === 'OPENMODALPJ'){
    return action;
  }
  return modalPJ
}

export function modalIndexPJ(modal=Number, action){
  // reducer que grava o index do botão See/Edit na listagem
  if(action.type === 'POPULATEMODALPJ'){
    return action.valuesPJ;
  }
 
  return modal
} 

export function modalIndex(modal=Number, action){
  // reducer que grava o index do botão See/Edit na listagem
  if(action.type === 'POPULATEMODAL'){
    return action.values;
  }
 
  return modal
} 
 