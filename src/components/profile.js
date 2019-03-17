import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
import { updateFB, signoutFB } from '../config/firebase';
import { connect } from 'react-redux';

class Profile extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        //const {user} = props.location.state;
        const { user } = props;
        console.log("PROPS KA USER>>>>", props.user)
        this.state = {
            name: user.fullname,
            age: user.age,
            email: user.email
        }
        this.update = this.update.bind(this);
        this.logoutt = this.logoutt.bind(this);
        this.changePasswordd = this.changePasswordd.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    update() {
        console.log("Running Update")
        const { name, age, email } = this.state;
        updateFB(name, age, email);
    }
    logoutt() {
        signoutFB();
        this.props.logout();
    }
    changePasswordd() {
        this.props.changePassword();
    }
    addItem() {
        this.props.addItem();
    }
    render() {
        console.log("PROPS PROFILE>>>>>>", this.props)
        const { email, name, age } = this.state
        return (
            <div>
                {/* <Row>
            <Col>
                <Button onClick={this.changePasswordd} className="pullRight">Change Password</Button>
            </Col>
            <Col>
                <Button onClick={this.addItem} className="pullRight">Add Item</Button>
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
                                <h3>Profile</h3>
                                <FormGroup>
                                    <Label for="exampleEmail">Name</Label>
                                    <Input id="exampleEmail" placeholder="with a placeholder" value={name} onChange={(e) => this.setState({ name: e.target.value })} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Age</Label>
                                    <Input type="number" id="exampleEmail" placeholder="with a placeholder" value={age} onChange={(e) => this.setState({ age: e.target.value })} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input type="email" disabled name="email" id="exampleEmail" placeholder="with a placeholder" value={email} onChange={(e) => this.setState({ email: e.target.value })} />
                                </FormGroup>

                                <Button style={{ width: "100%" }} color="primary" onClick={this.update}>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("state wala user>>>>>", state)
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(Profile);