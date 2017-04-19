import React from 'react';
import {Link} from 'react-router-dom';

const ArticlesLinks = ({articles}) => {
	return (
		<div>
			<h3>Articles:</h3>
			{articles.length 
				? articles.map(article => <Link className="list-group-item" key={article.id} to={`/${article.id}`}>{article.title}</Link>)
				: null
			}
		</div>
	);
};

export default ArticlesLinks;