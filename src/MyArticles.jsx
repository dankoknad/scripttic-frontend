import React from 'react';

const MyArticles = ({articles}) => {
	return (
		<div>
			{(articles.length) ? <h3>My articles:</h3> : null}
			{
				(articles.length)
					? articles.map(article => (
						<div key={article.id}>
							<div>{article.title}</div>
							<div>{article.body}</div>
							<div><code>{article.id}</code></div>
							<hr/>
						</div>
					))
					: <h3>you don't have any articles yet</h3>
			}
		</div>
	);
};

export default MyArticles;