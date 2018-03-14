import React from 'react';
import ReactDOM from 'react-dom';
import { Top, Oooppsss404, LogOut, Modules } from './components/'; // recebe os dois componentes dentro da pasta components/index.js
import SignIn from './components/SignIn';
import Register from './components/Register';
import Users from './components/Users';
import { Router, Route, browserHistory } from 'react-router'; // Cria as rotas
import { createStore, applyMiddleware } from 'redux'; // Flux MVC para React
import thunkMiddleware from 'redux-thunk'; // na execução do redux, permite retornar funções no dispatch
import { data } from './reducers/data'; // reducers que ajudam a tornar o componente menor
import { Provider } from 'react-redux'; // passa a store para árvore de componentes
import './css/ui.css'; // SASS compilado com todo o CSS minificado da App

//cria uma store com o Redux que pode ser acessado facilmente de qualquer componente da aplicação
const datastore = createStore(data,applyMiddleware(thunkMiddleware));

ReactDOM.render( 
  (
    <Provider store={datastore}>
      <Router history={browserHistory}>
        <Route  component={Top} store={datastore}>
          <Route path="/" component={SignIn} />
          <Route path="/logout" component={LogOut} />
          <Route path="/modules" component={Modules} />
          <Route path="/users" component={Users} />
          <Route path="/register" component={Register} />
        </Route>
        <Route path="*" component={Oooppsss404} />
      </Router>
    </Provider>
  ),
  document.querySelector('#root')
);