import React from 'react';

const Article = ({article, children}) => {
	return (
		<div>	
			<h3>{article.title}</h3>		
			<p>{article.body}</p>
			<code>article ID: {article.id}</code>

			{children}
		</div>
	);
};

export default Article;