import React from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Col, Button} from 'react-bootstrap';


const Login = ({handleSubmit, value="", emailValue="", passwordValue="", handleChange}) => {
	return (
		<div>	
			<h3>Login Page</h3>		
			<div>
				<Form horizontal>
					<FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={4}>
							Email
						</Col>
						<Col sm={6} md={4}>
							<FormControl type="email" placeholder="Email" />
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalPassword">
						<Col componentClass={ControlLabel} sm={4}>
							Password
						</Col>
						<Col sm={6} md={4}>
							<FormControl type="password" placeholder="Password" />
						</Col>
					</FormGroup>

					<FormGroup className="text-right">
						<Col smOffset={4} sm={6} md={4} >
							<Button type="submit">
								Sign in
							</Button>
						</Col>
					</FormGroup>
				</Form>
			</div>
		</div>
	);
};

export default Login;