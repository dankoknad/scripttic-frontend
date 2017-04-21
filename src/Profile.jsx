import React from 'react';

const Profile = ({loggedUser}) => {
	return (
		<div>
			<h3>Profile Page</h3>
			<div className="well">
				<h4>{loggedUser.firstName} {loggedUser.lastName}</h4>
				<h4>email: <a href={`mailto:${loggedUser.email}`}>{loggedUser.email}</a></h4>
				<h4><code>ID: {loggedUser.id}</code></h4>
			</div>
		</div>
	);
};

export default Profile;