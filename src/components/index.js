import React, { Component } from 'react';
import {connect} from 'react-redux'
import { updateUsers } from '../redux/user/action'
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
    Jumbotron
} from 'reactstrap';
import { loginFB, getAds, getAdsWithSearch, getCategories, getAdsByCategory, getUsers } from '../config/firebase';


class Index extends Component {
    constructor() {
        super()
        this.state = {
            ads: [],
            categories: []
        }
        this.search = this.search.bind(this)
        this.searchByCategory = this.searchByCategory.bind(this);
        this.getAds = this.getAds.bind(this);
        this.getAdById = this.getAdById.bind(this);
    }

    async componentDidMount() {
        const data = await getAds();
        const categories = await getCategories();
        const users = await getUsers();
        this.props.updateUsersFunc(users);
        this.setState({
            ads: data,
            categories
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
    getAdById(id) {
        console.log("CLICKED ID????????????", id)
        this.props.history.push({
            pathname: "/singleAd/" + id,
            state: {
                id
            }

        })
    }
    getAdsByCategory(category){
        console.log(category)
        this.props.history.push({
            pathname: "ads/"+category,
            state:{
                category
            }
        })
    }
    render() {
        const { ads, categories } = this.state;
        console.log("ADS>>>>>>>>>>>>>>", ads)
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <h1 className="display-3">OLX-M</h1>
                        <p className="lead">OLX-M is inspired by OLX.com.pk, build on react JS using firebase</p>
                    </Container>
                </Jumbotron>
                <Container>
                    <hr />
                    <Row>
                        <Col md="12">
                            <Row>
                                {
                                    categories.map((element, key) => {
                                        console.log(element)
                                        return <Col md="3" style={{ margin: 0, padding: 0, cursor:'pointer' }} onClick={() => this.getAdsByCategory(element)}>

                                            <Card style={{ borderRadius: 0 }}>
                                                <CardBody>
                                                    <CardTitle><b>{element}</b></CardTitle>
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
const mapStateToProps = (state) => {
    return {
        users: state.userReducer.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUsersFunc: (users) => dispatch(updateUsers(users))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);