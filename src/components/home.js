import React, { Component } from 'react';
import {
    Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CustomInput,
    Dropdown
} from 'reactstrap';
import { loginFB, getAds, getAdsWithSearch, getCategories, getAdsByCategory, getAdsByLocation, getLocation, getAdsByPrice } from '../config/firebase';
import {getAds1} from '../redux/ads/action'
import { connect } from 'react-redux';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            ads: [],
            categories: [],
            locations: [],
            limit: 4
        }
        this.search = this.search.bind(this)
        this.searchByCategory = this.searchByCategory.bind(this);
        this.searchByLocation = this.searchByLocation.bind(this);
        this.getAds = this.getAds.bind(this);
        this.getAdById = this.getAdById.bind(this);
        this.getAdsByPrice = this.getAdsByPrice.bind(this);
    }

    async componentDidMount() {
        const {limit} = this.state;
        //this.props.updateAdsFunc(limit)
         const data = await getAdsByCategory(this.props.location.state.category)
        //const data = await getAds();
        const categories = await getCategories();
        const locations = await getLocation();
        this.setState({
            ads: data,
            categories,
            locations,
            limit: limit+1
        })
    }
    async getAds() {
        const data = await getAds();
        const categories = await getCategories();
        this.setState({
            ads: data,
            categories
        })
    }
    async search(e) {
        const data = await getAdsWithSearch(e.target.value);
        this.setState({
            ads: data
        })
    }
    async searchByCategory(e) {
        const data = await getAdsByCategory(e.target.value)
        this.setState({
            ads: data
        })
    }
    async searchByLocation(e) {
        const data = await getAdsByLocation(e.target.value)
        this.setState({
            ads: data
        })
    }
    getAdById(id) {
        console.log("CLICKED ID????????????", id)
        this.props.history.push({
            pathname: "/singleAd/" + id,
            state: {
                id
            }

        })
    }
    async getAdsByPrice() {
        const { from, to } = this.state;
        if (from > to) {
            alert("Invalid input")
            return
        }
        const data = await getAdsByPrice(from, to)
        this.setState({
            ads: data
        })
    }
    render() {
        const {ads,categories, locations } = this.state;
        //const {ads} = this.props;
        console.log("ADS>>>>>>>>>>>>>>", ads)
        return (
            <div>
                <Container fluid="true">
                    <hr />
                    <Row>
                        <Col md="2">
                            <Card style={{ marginBottom: 20 }}>
                                <CardBody>
                                    <Form>
                                        <h4>Search</h4>
                                        <FormGroup>
                                            <Input type="text" name="search" placeholder="Enter keyword" onChange={this.search} />
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>

                            <Card style={{ marginBottom: 20 }}>
                                <CardBody>
                                    <Form>
                                        <h4>Categories</h4>
                                        <FormGroup>
                                            <div>
                                                <CustomInput id="0009" name="customRadio" type="radio" value="All" onClick={this.getAds}>All</CustomInput>
                                                {categories.map((element, key) => {
                                                    return <CustomInput id={key} name="customRadio" type="radio" value={element} label={element} onClick={this.searchByCategory} />
                                                })}
                                                {/* <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Select this custom radio" />
                                                <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Or this one" />
                                                <CustomInput type="radio" id="exampleCustomRadio3" label="But not this disabled one" disabled /> */}
                                            </div>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                            <Card style={{ marginBottom: 20 }}>
                                <CardBody>
                                    <Form>
                                        <h4>Location</h4>
                                        <FormGroup>
                                            <div>
                                                <CustomInput id="5252" name="customRadio1" type="radio" value="All" onClick={this.getAds}>All</CustomInput>
                                                {locations.map((element, key) => {
                                                    return <CustomInput id={element.id} name="customRadio1" type="radio" value={element.name} label={element.name} onClick={this.searchByLocation} />
                                                })}
                                                {/* <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Select this custom radio" />
                                                <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Or this one" />
                                                <CustomInput type="radio" id="exampleCustomRadio3" label="But not this disabled one" disabled /> */}
                                            </div>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                            <Card style={{ marginBottom: 20 }}>
                                <CardBody>
                                    <Form>
                                        <h4>Price</h4>
                                        <Form>
                                            <Row form>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Input type="text" name="from" id="exampleEmail" placeholder="From" onChange={(e) => this.setState({ from: e.target.value })} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Input type="text" name="to" id="examplePassword" placeholder="To" onChange={(e) => this.setState({ to: e.target.value })} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Button onClick={this.getAdsByPrice} color="primary">Search</Button>
                                        </Form>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="10">
                            <Row style={{ marginBottom: 10 }}>
                                <Col>
                                       
                                </Col>
                            </Row>
                            <Row>
                                {
                                    ads.map(element => {
                                        console.log(element)
                                        return <Col md="3" style={{ marginBottom: 10 }}>

                                            <Card>
                                                <CardImg top height="170" width="100%" src={element.data.images[0]} alt="Card image cap" />
                                                <CardBody>
                                                    <CardTitle><b>{element.data.title}</b></CardTitle>
                                                    <CardText>{element.data.description || element.data.desc}</CardText>
                                                    <CardSubtitle>Price: {element.data.price}</CardSubtitle>
                                                    <Button style={{ marginTop: 10 }} color="primary" onClick={() => this.getAdById(element.id)}>View</Button>
                                                    {/* <Button style={{marginTop:10, marginLeft:5}} color="success" onClick={() => this.getAdById(element.id)}>Chat with the Owner</Button> */}
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
// const mapStateToProps = (state) => {
//     return {
//         ads: state.adsReducer.ads
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateAdsFunc: (limit) => dispatch(getAds(limit))
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;