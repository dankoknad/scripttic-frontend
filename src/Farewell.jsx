import React from 'react';
import { Link } from 'react-router-dom';
import giphy from './img/giphy-sad.gif';

const Farewell = () => {
	return (
		<div>
			<h3>It is sad to see you leave. The office won't be the same without you.</h3>
			<p>
				<img style={{maxWidth: "100%"}} src={giphy} alt=".."/>
			</p>		
			<div>if you ever change your mind.. <Link to="/login">log in</Link></div>
		</div>
	);
};

export default Farewell;
