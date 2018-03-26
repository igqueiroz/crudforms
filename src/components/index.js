// Arquivo de exemplo com micro componentes

import Menus from './Menus'
import React  from 'react'
import { Link } from 'react-router';

// O children carrega todos os componentes a partir do Menu
export const Top = ( { children } ) =>
	<div className="page">
		<Menus />
		{ children }
	</div>

// Arquivo de erro 404, quando a URL não existir
export const Oooppsss404 = ( { location } ) =>
	<div>
	<Menus />
	<div className="container">
		<h1>Oooppsss, não deu ;( </h1>
		<h3>(404 Error)</h3>
		<p>Não achamos a página { location.pathname }</p>
	</div>
	</div>


// Arquivo de erro de autorização, o usuário precisa logar para acessar a página
export const Modules = ( { location } ) =>
	<div className="container">
		<section>
				<div className="logo"><Link to="/" title="CRUD Forms" alt="CRUD Forms App"><img src="images/mysitelogo@400x-100.png" alt="CRUD Forms" title="CRUD Forms" /></Link></div>
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