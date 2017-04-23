import React from 'react';
import giphy from '../../img/giphy.gif';

const Logout = ({handleLogout}) => {
	return (
		<div>
			<h3>Log out page</h3>
			<p>
				<img style={{maxWidth: "100%"}} src={giphy} alt=".."/>
			</p>		
			<a href="#" onClick={handleLogout} className="btn btn-danger">Log out</a>
		</div>
	);
};

export default Logout;