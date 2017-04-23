import React from 'react';
import {Link} from 'react-router-dom';

const ArticlesLinks = ({articles}) => {
	return (
		<div>
			<h3>Articles:</h3>
			{articles.length 
				? articles.map(article => <Link className="list-group-item" key={article.id} to={`/article/${article.id}`}>{article.title} <code>id: {article.id}</code></Link>)
				: null
			}
		</div>
	);
};

export default ArticlesLinks;