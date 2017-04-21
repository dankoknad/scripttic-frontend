import React from 'react';

const SignIn = () => {
	return (
		<div>
			<form className="login-form">
				<div className="form-group clearfix">
					<div className="col-sm-4">First Name</div>
					<div className="col-sm-6 col-md-4">
						<input type="text" className="form-control" placeholder="First Name" required />
					</div>
				</div>
				<div className="form-group clearfix">
					<div className="col-sm-4">Last Name</div>
					<div className="col-sm-6 col-md-4">
						<input type="text" className="form-control" placeholder="Last Name" required />
					</div>
				</div>
				<div className="form-group clearfix">
					<div className="col-sm-4">Email address</div>
					<div className="col-sm-6 col-md-4">
						<input type="email" className="form-control" placeholder="Email" required />
					</div>
				</div>
				<div className="form-group clearfix">
					<div className="col-sm-4">Password</div>
					<div className="col-sm-6 col-md-4">
						<input type="password" className="form-control" placeholder="Password" required />
					</div>
				</div>
				<div className="form-group clearfix">
					<div className="col-sm-6 col-md-4 col-sm-offset-4">
						<button type="submit" className="btn btn-default">Sign in</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SignIn;