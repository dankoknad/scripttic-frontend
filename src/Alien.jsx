import React from 'react';
import { Link } from 'react-router-dom';
import giphy from './img/giphy-blink.gif';

const Alien = () => {
	return (
		<div>
				<h3>and who you are?</h3>
				<img src={giphy} alt=".."/><br/><br/>	
				<h4>Please stop confusing this young lady. Go to <Link to="/login">log in</Link></h4>
		</div>
	);
};

export default Alien;