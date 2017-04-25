import React from 'react';

const SignIn = ({handleRegistrationInputs, handleSubmitRegistration, signInFirstName, signInLastName, signInEmailVal, signInPassVal, signInErrMsg}) => {
	return (
		<div>
			<form onSubmit={handleSubmitRegistration} className="signin-form">
				<div className="form-group clearfix">
					<div className="col-sm-4 text-right-sm">First Name</div>
					<div className="col-sm-6 col-md-4">
						<input type="text" value={signInFirstName} name="signInFirstName" onChange={handleRegistrationInputs} className="form-control" placeholder="First Name" required />
					</div>
				</div>
				<div className="form-group clearfix">
					<div className="col-sm-4 text-right-sm">Last Name</div>
					<div className="col-sm-6 col-md-4">
						<input type="text" value={signInLastName} name="signInLastName" onChange={handleRegistrationInputs} className="form-control" placeholder="Last Name" required />
					</div>
				</div>
				<div className="form-group clearfix">
					<div className="col-sm-4 text-right-sm">Email address</div>
					<div className="col-sm-6 col-md-4">
						<input style={{display:"none"}} />
						<input type="email" value={signInEmailVal} name="signInEmailVal" onChange={handleRegistrationInputs} className="form-control" placeholder="Email" required />
					</div>
				</div>
				<div className="form-group clearfix">
					<div className="col-sm-4 text-right-sm">Password</div>
					<div className="col-sm-6 col-md-4">
						<input type="password" value={signInPassVal} name="signInPassVal" onChange={handleRegistrationInputs} className="form-control" placeholder="Password" required />
					</div>
				</div>
				{signInErrMsg && <p className="text-danger">{signInErrMsg}</p>}
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