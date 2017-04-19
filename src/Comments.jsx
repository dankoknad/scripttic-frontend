import React from 'react';

const Comments = ({comments}) => (
	comments.length 
	? (
		<div>
			<div>Comment title: {comments[0].title}</div>
			<div>Comment body: {comments[0].body}</div>
			<div>Corresponding article id: <code>{comments[0].article}</code></div>
			<div></div>
			<div></div>
		</div>
	)
	: <em>This article is not commented yet.</em>
)

export default Comments;