import React from 'react';

const AddCommentForm = ({newCommentTitle, newCommentContent, handleNewCommentInputs, postNewComment, articleId}) => {
	const length = newCommentTitle.length + newCommentContent.length;
	const isGoodLength = (length > 0 && length < 256);
	const isForSubmit = (isGoodLength && newCommentTitle.length && newCommentContent.length);
	
	return (
		<div className="container-shrink">
			<h4>Have somethingto say? Please go ahead!</h4>
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
					<span className={isGoodLength ? "text-success" : "text-danger" }>{length}</span>{' '}
					<button type="submit" className="btn btn-default" disabled={!isForSubmit}>Submit</button>
				</div>
			</form>
		</div>
	);
};

export default AddCommentForm;
