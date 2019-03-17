import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
import { signoutFB, changePasswordFB, confirmOldPasswordFB } from '../config/firebase';


class ChangePassword extends Component {

  constructor(props) {
    super(props)
    this.logoutt = this.logoutt.bind(this);
    this.profile = this.profile.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  logoutt() {
    signoutFB();
    this.props.logout();
  }
  profile() {
    this.props.profile();
  }
  async changePassword() {
    const { password, oldpassword } = this.state;
    const change = await confirmOldPasswordFB(oldpassword);
    if (change) {
      changePasswordFB(password);
      signoutFB();
      this.props.logout();
    }
  }
  render() {
    //   const {email, name, age} = this.state
    return (
      <div>
        {/* <Row>
            <Col>
                <Button onClick={this.profile} className="pullRight">Profile</Button>
            </Col>
            <Col>
                <Button onClick={this.logoutt} className="pullRight">Logout</Button>
            </Col>
        </Row> */}
        <Container>
          <Row>
            <Col md="3">
            </Col>
            <Col md="6">
              <Form>
                <h3>Change Password</h3>
                <FormGroup>
                  <Label for="exampleEmail">Old Password</Label>
                  <Input type="password" name="oldpassword" placeholder="with a placeholder" onChange={(e) => this.setState({ oldpassword: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">New Password</Label>
                  <Input type="password" name="password" placeholder="with a placeholder" onChange={(e) => this.setState({ password: e.target.value })} />
                </FormGroup>
                <Button onClick={this.changePassword}>Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ChangePassword;