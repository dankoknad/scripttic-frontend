import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const MyComments = ({comments, handleCommentRemove}) => {
	return (
		<div className="col-sm-6">
			{(comments.length) ? <h3>My comments:</h3> : null}
			{(comments.length)
				? <div className="list-group">
						<ReactCSSTransitionGroup
								component="div"
								transitionName="list-anim"
								transitionEnterTimeout={150}
								transitionLeaveTimeout={250}>
							{comments.map(comment => (
								<div  key={comment.id} className="list-group-item">
									<div>{comment.title}</div>
									<div>{comment.body}</div>
									<div>id <code>{comment.id}</code></div>
									<div>poster <code>{comment.poster}</code></div>
									<div>article <code>{comment.article}</code></div>
									<div className="text-right">
										<a onClick={(e) => handleCommentRemove(e, comment)} href="#" className="text-danger glyphicon glyphicon-remove"></a>
									</div>
								</div>
							))}
						</ReactCSSTransitionGroup>
					</div>
				: <h3>you don't have any comments yet</h3>
			}
		</div>
	);
};

export default MyComments;
