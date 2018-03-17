import React from 'react';
import ReactDOM from 'react-dom';
import { Top, Oooppsss404, Modules } from './components/'; // recebe os dois componentes dentro da pasta components/index.js
import SignIn from './components/SignIn';
import Menus from './components/Menus';
import Logout from './components/Logout';
import Register from './components/Register';
import Users from './components/Users';
import { Router, Route, browserHistory } from 'react-router'; // Cria as rotas
import { createStore, applyMiddleware, combineReducers } from 'redux'; // Flux MVC para React
import thunkMiddleware from 'redux-thunk'; // na execução do redux, permite retornar funções no dispatch
import { data } from './reducers/data'; // reducers que ajudam a tornar o componente menor
import { notify } from './reducers/notify'; // reducers que ajudam a tornar o componente menor
import { Provider } from 'react-redux'; // passa a store para árvore de componentes
import './css/ui.css'; // SASS compilado com todo o CSS minificado da App

// combina os 2 reducers, um executa mensagem de erro e o outro manipula a lista de usuários
const reducers = combineReducers({data,notify});

// cria uma store com o Redux que pode ser acessado facilmente de qualquer componente da aplicação
const datastore = createStore(reducers,applyMiddleware(thunkMiddleware));

// protege as rotas quando o usuário não faz a autenticação e direciona o usuário para o ambiente de login com uma mensagem.
function verifyAuthentication(nextState, replace) {
  if (localStorage.getItem('auth-token') === null) {
    replace('/?msg=Você precisa estar logado para acessar ter acesso ao sistema. Faça seu login abaixo.');
  }
}

ReactDOM.render( 
  (
    <Provider store={datastore}>
      <Router history={browserHistory}>
        <Route component={Top} store={datastore}>
          <Route path="/" component={SignIn} />
          <Route component={Menus}  store={datastore}/>
          <Route path="/logout" component={Logout} />
          <Route path="/modules" component={Modules} onEnter={verifyAuthentication} />
          <Route path="/users" component={Users}  onEnter={verifyAuthentication} />
          <Route path="/register" component={Register}  onEnter={verifyAuthentication} />
        </Route>
        <Route path="*" component={Oooppsss404} />
      </Router>
    </Provider>
  ),
  document.querySelector('#root')
);