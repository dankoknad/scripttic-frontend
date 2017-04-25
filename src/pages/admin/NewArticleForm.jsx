import React from 'react';

const NewArticleForm = ({newArticleTitle, newArticleContent, handleNewArticleInputs, postNewArticle}) => {
	const length = newArticleTitle.length + newArticleContent.length;
	const isGoodLength = (length > 0 && length < 256);
	const isForSubmit = (isGoodLength && newArticleTitle.length && newArticleContent.length);
	return (
		<div className="container-shrink">
			<h4>It's a nice day to writte a new article!</h4>
			<form onSubmit={postNewArticle}>
				<p>Title</p>
				<div className="form-group">
					<input
						className="form-control" 
						name="newArticleTitle" 
						type="text" 
						placeholder="Title" 
						value={newArticleTitle}
						onChange={handleNewArticleInputs}
					/>
				</div>
				<p>Content</p>
				<div className="form-group">
					<textarea
						className="form-control" 
						name="newArticleContent" 
						placeholder="Content" 
						value={newArticleContent}
						onChange={handleNewArticleInputs}>
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

export default NewArticleForm;
