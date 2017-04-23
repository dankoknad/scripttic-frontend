import React from 'react';

const Article = ({article, children}) => {
	return (
		<div>	
			<div className="article">
				<h3>{article.title}</h3>		
				<p className="article-body">{article.body}</p>
				<code>article ID: {article.id}</code>
			</div>

			{children}
		</div>
	);
};

export default Article;