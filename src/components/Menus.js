// Componente de Menu que engloba no Router como todos os outros componentes. Usa o Bootstrap para ajudar no UI da criação do menu

import React, { Component }  from 'react'
import { Navbar, MenuItem, Dropdown } from 'react-bootstrap';

export default class Menus extends Component {	
	componentDidMount() {
		if (localStorage.getItem('auth-token') !== null) {
			document.querySelector('.sign').style.display = "none";
       		document.querySelectorAll('.logged').forEach( (element) => {
        		element.style.display = "block";
      		})   
		}
	}
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
						        		<MenuItem className="subtotalone noborder sign" href="/">SignIn</MenuItem>
										<MenuItem className="subtotalone noborder logged" href="/register">Register</MenuItem>
										<MenuItem className="subtotalonetwo noborder logged" href="/users">List/Edit Users</MenuItem>
										<MenuItem className="subtotalonetwo noborder logged" href="/logout">→ Logout</MenuItem>
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
