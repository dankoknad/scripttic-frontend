import React from 'react';


const Login = ({handleSubmitLogin, loginEmailVal, loginPassVal, handleLoginEmailVal, handleLoginPassVal}) => {
	return (
		<div>	
			<h3>Login Page</h3>		
			<div>
				<form onSubmit={handleSubmitLogin} className="login-form">
					<div className="form-group clearfix">
						<div className="col-sm-4">
							<label htmlFor="exampleInputEmail1">Email address</label>
						</div>
						<div className="col-sm-6 col-md-4">
							<input type="email" className="form-control" defaultValue={loginEmailVal} onChange={handleLoginEmailVal} placeholder="Email" required />
						</div>
					</div>
					<div className="form-group clearfix">
 						<div className="col-sm-4">
							<label htmlFor="exampleInputPassword1">Password</label>
						</div>
						<div className="col-sm-6 col-md-4">
							<input type="password" className="form-control" defaultValue={loginPassVal} onChange={handleLoginPassVal} placeholder="Password" required />
						</div>
					</div>
					<div className="col-sm-6 col-md-4 col-sm-offset-4">
						<button type="submit" className="btn btn-default">Sign in</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;