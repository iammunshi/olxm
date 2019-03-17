import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
import { registerFB } from '../config/firebase';


class Register extends Component {

  constructor() {
    super()
    this.state = {
      name: '',
      age: '',
      email: '',
      password: ''
    }
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  signup() {
    console.log("Running Signup")
    const { name, age, email, password } = this.state;
    registerFB(name, age, email, password);
  }
  login() {
    this.props.history.push('login');
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
                <h3 style={{textAlign: "center"}}>Register</h3>
                <FormGroup>
                  <Label for="exampleEmail">Name</Label>
                  <Input id="exampleEmail" placeholder="with a placeholder" onChange={(e) => this.setState({ name: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Age</Label>
                  <Input type="number" id="exampleEmail" placeholder="with a placeholder" onChange={(e) => this.setState({ age: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" onChange={(e) => this.setState({ email: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onChange={(e) => this.setState({ password: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Button style={{width:"100%"}} color="primary" onClick={this.signup}>Submit</Button>
                </FormGroup>
              </Form>
              <Button style={{width:"100%"}} onClick={this.login} to="/login">Already have account? Login!</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;