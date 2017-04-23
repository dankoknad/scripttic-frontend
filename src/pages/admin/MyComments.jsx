import React from 'react';

const MyComments = ({comments}) => {
	return (
		<div className="col-sm-6">
			{(comments.length) ? <h3>My comments:</h3> : null}
			{(comments.length)
				? <div className="list-group">
						{comments.map(comment => (
							<div key={comment.id} className="list-group-item">
								<div>{comment.title}</div>
								<div>{comment.body}</div>
								<div><code>{comment.id}</code></div>
								<div className="text-right hide">
									<a href="#" className="text-danger glyphicon glyphicon-remove"></a>
								</div>
							</div>
						))}
					</div>
				: <h3>you don't have any comments yet</h3>
			}
		</div>
	);
};

export default MyComments;
