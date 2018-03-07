// Arquivo de exemplo de texto comum sendo acessado pelo router

import React, {Component}  from 'react';
import { Link } from 'react-router';

export default class Laureate extends Component {
	render() {
		
		return(
				<section>
				<div className="logo"><Link to="/" title="GeoLocation App" alt="GeoLocation App"><img src="images/mysitelogo@400x-100.png" alt="Laureate International Universities" title="Laureate International Universities" /></Link></div>
				<div className="row">
					<div className="col-sm-3" />
						<div className="col-sm-6">
						<h1>Laureate International Universities</h1>
						<p>Laureate International Universities are the for-profit universities and colleges owned and operated by Laureate Education (NASDAQ: LAUR), of Baltimore, Maryland, in the United States. By 2015, the company owned and operated more than 200 programs, both campus-based and online, in 29 countries. Total student enrollment was more than 1 million students.
						</p>
					</div>
					<div className="col-sm-3" />
				</div>
				</section>
		)
	}
}

