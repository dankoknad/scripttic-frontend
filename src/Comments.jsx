import React from 'react';

const Comments = ({comments}) => {
	const renderedComments = comments.map(comment => (
		<div key={comment.id}>
			<div>Comment title: {comment.title}</div>
			<div>Comment body: {comment.body}</div>
			<div>Corresponding article ID: <code>{comment.article}</code></div>
			<hr/>
		</div>
	));

	return (		
		(comments.length > 0) 
			? <div>
					<h4>Comments:</h4>
					<div>{renderedComments}</div>
				</div>
			: <em>This article is not commented yet.</em>
	)
}

export default Comments;		
