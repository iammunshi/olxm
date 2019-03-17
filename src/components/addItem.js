import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
import { signoutFB, addAd, getCategories, getLocation } from '../config/firebase';


class AddItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            locations: []
        }
        this.logoutt = this.logoutt.bind(this);
        this.profile = this.profile.bind(this);
        this.addAd = this.addAd.bind(this);
    }

    logoutt() {
        signoutFB();
        this.props.logout();
    }
    profile() {
        this.props.profile();
    }

    addAd() {
        const { title, description, price, images, category, location } = this.state;
        console.log('cateee',category)
        console.log('loceee',location)
        addAd(title, description, price, images, category, location);
    }

    async componentDidMount() {
        const data = await getCategories();
        const data1 = await getLocation();
        console.log(data);
        console.log("LOCATION>>>>>>",data1)
        this.setState({
            categories: data,
            locations: data1
        })
    }
    render() {
        const { categories, locations } = this.state
        console.log("inside render:", locations)
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
                    <h3>Add Ad</h3>
                    <FormGroup>
                        <Label for="exampleEmail"> Title</Label>
                        <Input type="text" name="oldpassword" placeholder="with a placeholder" onChange={(e) => this.setState({ title: e.target.value })} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Description</Label>
                        <Input type="text" name="text" placeholder="with a placeholder" onChange={(e) => this.setState({ description: e.target.value })} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Price</Label>
                        <Input type="text" name="number" placeholder="with a placeholder" onChange={(e) => this.setState({ price: e.target.value })} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Select Category</Label>
                        <Input type="select" name="select" id="exampleSelect" onChange={(e) => this.setState({category: e.target.value})}>
                            <option selected disabled>-- Select --</option>
                            {categories.map(function (name, index) {
                                return <option key={index} value={name}>{name}</option>
                            })}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Select Location</Label>
                        <Input type="select" name="select" id="exampleSelect" onChange={(e) => this.setState({location: e.target.value})}>
                            <option selected disabled>-- Select --</option>
                            {locations.map(function (name, index) {
                                return <option key={index} value={name.name}>{name.name}</option>
                            })}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Image</Label>
                        <Input type="file" multiple placeholder="with a placeholder" onChange={(e) => this.setState({ images: e.target.files })} />
                    </FormGroup>
                    <Button color="primary" style={{width:"100%"}} onClick={this.addAd}>Submit</Button>
                </Form>
                </Col>
                </Row>
                </Container>
            </div>
        );
    }
}

export default AddItem;