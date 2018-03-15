// Como o Menu é o top component de toda a aplicação foi usado a store para facilitar a manipulação do seu estado

export function menu(menu=true, action){
  // reducer que recebe o true or false para os items do menu
  if(action.type === 'MENULOGIN'){
    return true;
  }  
  return menu
} 