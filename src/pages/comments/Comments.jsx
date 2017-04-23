import React from 'react';

const Comments = ({comments}) => {
	const renderedComments = comments.map(comment => (
		<div key={comment.id} className="list-group-item">
			<div>Comment title: {comment.title}</div>
			<div>Comment body: {comment.body}</div>
			<div><code>Comment ID: {comment.id}</code></div>
		</div>
	));

	return (		
		(comments.length > 0) 
			? <div className="container-shrink">
					<h4>Comments:</h4>
					<div>{renderedComments}</div>
				</div>
			: <em>This article is not commented yet.</em>
	)
}

export default Comments;		
