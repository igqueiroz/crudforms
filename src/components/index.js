// Arquivo de exemplo com micro componentes

import Menus from './Menus'
import React  from 'react'

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

