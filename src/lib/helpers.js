export const baseUrl = 'http://www.scripttic.com:8000/api/v1/article';


// load data
export const getData = (url) => {
  return fetch(url)
    .then(res => res.json())
}

// save data getToken 
export const getToken = (url, formData) => {
  return fetch(url,{
			method: 'POST',
			headers: {
        'Accept': 'application/x-www-form-urlencoded',
      	'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: formData
		}).then(res => res.text())
}

// get currently logged user
export const getLoggedUser = (token) => {
  return fetch(`http://www.scripttic.com:8000/api/v1/user?api_key=Bearer ${token}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
	.then(res => res.json())
}

// logout
export const logOut = (token) => {
  return fetch(`http://www.scripttic.com:8000/api/v1/user/logout?api_key=Bearer ${token}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
	.then((response) => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	})
}

// register new user
export const registration = (newUser) => {
  return fetch('http://www.scripttic.com:8000/api/v1/user', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
}

// post new article
export const submitNewArticle = (token, payload) => {
	return fetch(`http://www.scripttic.com:8000/api/v1/article?api_key=Bearer ${token}`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	}).then(res => res.json())
}

// post new comment
export const submitNewComment = (token, payload, articleId) => {
	return fetch(`http://www.scripttic.com:8000/api/v1/article/${articleId}/comment?api_key=Bearer ${token}`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	}).then(res => res.json())
}

// delete comment
export const removeComment = (articleId, commentId, token) => {
  return fetch(`http://www.scripttic.com:8000/api/v1/article/${articleId}/comment/${commentId}?api_key=Bearer ${token}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
















// code from some other project of mine:
// save data addPost
export const publishPost = (post, url) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
	.then(d => console.log(d))
}

// save data updatePost
export const updatePost = (url, id, post) => {
  return fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
}

// update data updateEmployee 
export const updateEmployee = (employee) => {
  return fetch(`${baseUrl}/${employee.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  }).then(res => res.json())
}

// update data removePost
export const removePost = (url, id) => {
  return fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

// render markdown
// export const renderMarkdown = (txt) => {
// 	const md = new Remarkable({breaks: true});
// 	return { __html: md.render(txt) };
// }

// generate timestamp
export const getTimeStamp = () => {
	return  new Date();
}

// timestamp to readable
export const getDateFromTimestamp = (timeStamp) => new Date(+ timeStamp).toUTCString();