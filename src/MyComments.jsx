import React from 'react';

const MyComments = ({comments}) => {
	return (
		<div>
			{(comments.length) ? <h3>My comments:</h3> : null}
			{
				(comments.length)
					? comments.map(comment => (
						<div key={comment.id}>
							<div>{comment.title}</div>
							<div>{comment.body}</div>
							<div><code>{comment.id}</code></div>
							<hr/>
						</div>
					))
					: <h3>you don't have any comments yet</h3>
			}
		</div>
	);
};

export default MyComments;