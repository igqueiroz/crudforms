// Componente de Menu que engloba no Router como todos os outros componentes. Usa o Bootstrap para ajudar no UI da criação do menu

import React, { Component }  from 'react'
import { Navbar, MenuItem, Dropdown } from 'react-bootstrap';

export default class Menus extends Component {
	render() {	
		return(
			<section className="bg-primary">
				<div className="container">	     
				    <Navbar>
						<div className="container-fluid">
						    <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
						      <div className="nav navbar-nav navbar-right">
						        <Dropdown id="principal">
						        	<Dropdown.Toggle className="navbar-toggle">
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>	
									</Dropdown.Toggle>
									<Dropdown.Menu>
						        		<MenuItem className="subtotalone noborder" href="/">Home</MenuItem>
										<MenuItem className="subtotalone noborder" href="/register">Member Register</MenuItem>
										<MenuItem className="subtotalonetwo noborder" href="/list">Member List</MenuItem>
									</Dropdown.Menu>
						        </Dropdown>
						      </div>
						    </div>
						</div>
					</Navbar>
				</div>
			</section>
		)
	}
}
//<Link to="/" href="/" className="dropdown-toggle js-offcanvas-trigger navbar-toggle collapsed" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
//</Link>
