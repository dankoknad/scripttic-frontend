import React from 'react';

const MyArticles = ({articles}) => {
	return (
		<div className="col-sm-6">
			{(articles.length) ? <h3>My articles:</h3> : null}
			{(articles.length)
				? <div className="list-group">
						{articles.map(article => (
							<div key={article.id} className="list-group-item">
								<div>{article.title}</div>
								<div>{article.body}</div>
								<div><code>{article.id}</code></div>
								<div className="text-right hide">
									<a href="#" className="text-danger glyphicon glyphicon-remove"></a>
								</div>
							</div>
						))}
					</div>
				: <h3>you don't have any articles yet</h3>
			}
		</div>
	);
};

export default MyArticles;
