import React from 'react';
import {Link} from 'react-router-dom';

const Article = ({article}) => {
	return (
		<div>	
			<h3><Link to="/">All Articles</Link></h3>
			<h3>{article.title}</h3>		
			<p>{article.body}</p>
			<code>article ID: {article.id}</code>
		</div>
	);
};

export default Article;