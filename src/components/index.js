// Arquivo de exemplo com micro componentes

import Menus from './Menus'
import React  from 'react'
import { Link } from 'react-router';
import { browserHistory } from 'react-router'

// O children carrega todos os componentes a partir do Menu
export const Top = ( { children } ) =>
	<div className="page">
		<Menus />
		{ children }
	</div>

// Arquivo de erro 404, quando a URL não existir
export const Oooppsss404 = ( { location } ) =>
	<div className="container">
		<Menus />
		<h1>Oooppsss, não deu ;( (404 Error)</h1>
		<p>Não achamos { location.pathname }</p>
	</div>


// Arquivo de erro de autorização, o usuário precisa logar para acessar a página
export const Erro = ( { location } ) =>
	<div className="container">
		<Menus />
		<h1>Você precisa estar logado para acessar esta página!</h1>
		<p> Ir para página de <Link to="/" title="CRUD Forms" alt="CRUD Forms"> Login </Link> </p>
	</div>

// Arquivo de erro de autorização, o usuário precisa logar para acessar a página
export const LogOut = ( { location } ) =>
	<div className="container">
		<Menus />
		<h1>Você se deslogou da sua conta.</h1>
		<p> Você deseja <Link to="/" title="CRUD Forms" alt="CRUD Forms"> LOGAR  </Link> novamente?</p>
	</div>

// Arquivo de erro de autorização, o usuário precisa logar para acessar a página
export const Modules = ( { location } ) =>
	<div className="container">
		<Menus />
		<section>
				<div className="logo"><Link to="/" title="GeoLocation App" alt="GeoLocation App"><img src="images/mysitelogo@400x-100.png" alt="Laureate International Universities" title="Laureate International Universities" /></Link></div>
				<div className="row">
					<div className="col-sm-3" />
						<div className="col-sm-6">
						<h1>Módulos disponíveis</h1>
						<Link to="/register" title="CRUD Forms" alt="CRUD Forms"><button className="locate"> Cadastrar usuários </button></Link>
						<Link to="/users" title="CRUD Forms" alt="CRUD Forms"><button className="locate"> Listar/ Editar usuários </button></Link>
					</div>
					<div className="col-sm-3" />
				</div>
		</section>
	</div>