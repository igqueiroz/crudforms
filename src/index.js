import React from 'react';
import ReactDOM from 'react-dom';
import GeoLocation from './components/GeoLocation';
import Laureate from './components/Laureate';
import Users from './components/Users';
import { Top, Oooppsss404, LogOut } from './components/'; // recebe os dois componentes dentro da pasta components/index.js
import SignIn from './components/SignIn';
import { Router, Route, browserHistory } from 'react-router'; // Cria as rotas
import { createStore, applyMiddleware } from 'redux'; // Redux MVC para React
import thunkMiddleware from 'redux-thunk'; // na execução do redux, permite retornar funções no dispatch
import { data } from './reducers/data'; // passa a store para árvore de componentes
import { Provider } from 'react-redux'; // reducers que ajudam a tornar o componente menor
import './css/ui.css'; //SASS compilado com todo o CSS da App

//cria uma store com o Redux que pode ser acessado facilmente de qualquer componente da aplicação
const datastore = createStore(data,applyMiddleware(thunkMiddleware));

ReactDOM.render( 
  (
    <Provider store={datastore}>
      <Router history={browserHistory}>
        <Route  component={Top} store={datastore}>
          <Route path="/" component={SignIn} />
          <Route path="/logout" component={LogOut} />
          <Route path="/laureate" component={Laureate} />
          <Route path="/users" component={Users} />
          <Route path="/users" component={Users} />
        </Route>
        <Route path="*" component={Oooppsss404} />
      </Router>
    </Provider>
  ),
  document.querySelector('#root')
);