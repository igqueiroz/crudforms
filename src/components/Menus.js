// Componente de Menu que engloba no Router como todos os outros componentes. Usa o Bootstrap para ajudar no UI da criação do menu

import React, { Component }  from 'react'
import { Navbar, MenuItem, Dropdown } from 'react-bootstrap';
import DataApi  from '../logic/DataApi'

export default class Menus extends Component {

	constructor(props) {
	super(props);
        this.state = {
            loggedIn: true,
        };
        this.menuLogged = this.menuLogged.bind(this);
    }

	componentDidMount() {
		this.props.routes[0].store.subscribe(() => {
            // menu é o nome gravado na store vindo da função de seu reducer
            this.setState({loggedIn: this.props.routes[0].store.getState().menu})
		})
	}

	menuLogged() {
		this.props.routes[0].store.dispatch(DataApi.menu(true));
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
						        		{<MenuItem className="subtotalone noborder" href="/">SignIn</MenuItem>}
										{this.state.menuLogged && <MenuItem className="subtotalone noborder" href="/register">Register</MenuItem>}
										{this.state.menuLogged && <MenuItem className="subtotalonetwo noborder" href="/users">List/Edit Users</MenuItem>}
										{this.state.menuLogged && <MenuItem className="subtotalonetwo noborder" href="/logout">→ Logout</MenuItem>}
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
