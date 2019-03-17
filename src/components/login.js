import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
import { loginFB, loginWithFacebook, loginWithGoogle } from '../config/firebase';
import { authInfo } from '../config/router';
import { connect } from 'react-redux';
import { updateUser } from '../redux/user/action'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";


class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.loginWithFacebook = this.loginWithFacebook.bind(this);
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
    }

    async login() {
        //console.log("Running Login")
        const { email, password } = this.state;
        const user = await loginFB(email, password);
        //console.log("hbhbakb,jmn a.nx amkxna.kxnas.", user);
        authInfo.login(user);
        this.props.updateUserFunc(user);
        
        this.props.history.push({
            pathname: "/profile",
            // state: {
            //     user
            // }
        })
        //this.props.getUser(user);
    }

    async loginWithFacebook(){
        const user = await loginWithFacebook()
        authInfo.login(user);
        this.props.updateUserFunc(user);
        
        this.props.history.push({
            pathname: "/profile",
            // state: {
            //     user
            // }
        })
    }

    async loginWithGoogle(){
        const user = await loginWithGoogle()
        authInfo.login(user);
        this.props.updateUserFunc(user);
        
        this.props.history.push({
            pathname: "/profile",
            // state: {
            //     user
            // }
        })
    }
    register() {
        this.props.history.push('register')
        //console.log(this.props)
    }
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col md="3">
                        </Col>
                        <Col md="6">

                            <Form>
                                <h3 style={{textAlign: "center"}}>Login</h3>
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" onChange={(e) => this.setState({ email: e.target.value })} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onChange={(e) => this.setState({ password: e.target.value })} />
                                </FormGroup>
                                <FormGroup>
                                    <Button style={{width:"100%"}} color="primary" onClick={this.login}>Login</Button>
                                </FormGroup>

                            </Form>
                            
                            <Row>
                                <Col>
                                    <FacebookLoginButton onClick={this.loginWithFacebook} />
                                </Col>
                                <Col>
                                    <GoogleLoginButton onClick={this.loginWithGoogle} />
                                </Col>
                            </Row>
                            <Button style={{width:"100%", marginTop:10}} onClick={this.register} to="/register">Don't have account? Register</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserFunc: (user) => dispatch(updateUser(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);