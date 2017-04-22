import React from 'react';

const AddCommentForm = ({newCommentTitle, newCommentContent, handleNewCommentInputs, postNewComment, articleId}) => {
	return (
		<div className="new-comment-form-container">
			<h4>It's a nice day to writte a new article!</h4>
			<form onSubmit={(e) => postNewComment(e, articleId)}>
				<p>Title</p>
				<div className="form-group">
					<input
						className="form-control" 
						name="newCommentTitle" 
						type="text" 
						placeholder="Title" 
						value={newCommentTitle}
						onChange={handleNewCommentInputs}
					/>
				</div>
				<p>Content</p>
				<div className="form-group">
					<textarea
						className="form-control" 
						name="newCommentContent" 
						placeholder="Content" 
						value={newCommentContent}
						onChange={handleNewCommentInputs}>
					</textarea>
				</div>
				<div className="form-group text-right">
					<button type="submit" className="btn btn-default">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default AddCommentForm;