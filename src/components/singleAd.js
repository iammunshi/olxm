import React, { Component } from 'react';
import {connect} from 'react-redux';
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
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    CardHeader
} from 'reactstrap';
import { loginFB, getAds, getAdsWithSearch, getCategories, getAdsByCategory, getAdById, getLocByName, checkAndCreateRoom } from '../config/firebase';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


class SingleAd extends Component {
    constructor(props) {
        super(props)
        console.log(props.location.state)
        this.state = {
            ad: {
                images: []

            },
            activeIndex: 0,
            location:{
                lat: 24,
                lng: 67
            },
            thisuser: ""
        }
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.chat = this.chat.bind(this);
        // this.search = this.search.bind(this)
        // this.searchByCategory = this.searchByCategory.bind(this);
        // this.getAds = this.getAds.bind(this);
        // this.getAdById = this.getAdById.bind(this);
    }
    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        const { ad } = this.state;
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === ad.images.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        const { ad } = this.state;
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? ad.images.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }
    async chat(){
        console.log("click")
        const {ad} = this.state;
        var chatId = ad.user.id
        const room = await checkAndCreateRoom(chatId)
        this.props.history.push({
            pathname: "/chat/" + room.id

        })
    }
    async componentDidMount() {
        const ad = await getAdById(this.props.location.state.id)
        const loc = await getLocByName(ad.location)
        console.log(this.props.users)
        console.log('################', this.props.users.find(user=> user.id === ad.user.id).fullname)
        const thisuser = this.props.users.find(user=> user.id === ad.user.id).fullname;
        this.setState({
            ad,
            location: {
                lat: loc.lng,
                lng: loc.lat,
                
            },
            thisuser
        })


    }
    render() {
        const { activeIndex, location, thisuser } = this.state;
        const { ad } = this.state;
        console.log(location)
        const slides = ad.images.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item}
                >
                    <img height="250" src={item} />
                </CarouselItem>
            );
        });
        return (
            <div>
                <Container>
                    <hr />
                    <Row>
                        <Col md="9">
                            <Card>
                                <CardBody style={{ textAlign: "center" }}>
                                    <Carousel
                                        activeIndex={activeIndex}
                                        next={this.next}
                                        previous={this.previous}
                                    >
                                        <CarouselIndicators items={ad.images} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                                        {slides}
                                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                                    </Carousel>

                                </CardBody>
                            </Card>
                            <br></br>
                            <Card>
                                <CardBody>
                                    <CardTitle style={{ fontSize: 20 }}><b>Description</b></CardTitle>
                                    
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <CardSubtitle>{ad.description}</CardSubtitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card>
                                <CardBody>
                                    <CardTitle style={{ fontSize: 30 }}><b>Rs. {ad.price}</b></CardTitle>
                                    <CardSubtitle>{ad.title}</CardSubtitle>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <CardText>{ad.location}</CardText>
                                </CardBody>
                            </Card>
                            <br></br>
                            <Card>
                                <CardBody>
                                    <CardTitle style={{ fontSize: 20 }}><b>Seller Description</b></CardTitle>
                                    <CardSubtitle><b>{thisuser}</b></CardSubtitle>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    {this.props.user && <Button onClick={this.chat} style={{ width: "100%" }} color="primary">Chat with the Owner</Button>}
                                    
                                </CardBody>
                            </Card>
                            <br></br>
                            <Card>
                                <CardBody>
                                    <CardTitle style={{ fontSize: 20 }}><b>Posted In</b></CardTitle>
                                    <MyMapComponent
                                        isMarkerShown
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `200px` }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                                        location={location}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        {/* <Col md="6">
                            <h3>{ad.title}</h3>
                        </Col>
                        <Col md="6">
                            <Carousel
                                activeIndex={activeIndex}
                                next={this.next}
                                previous={this.previous}
                            >
                                <CarouselIndicators items={ad.images} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                                {slides}
                                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                            </Carousel>
                        </Col> */}
                    </Row>
                </Container>
            </div>
        );
    }
}
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={props.location}
        center={props.location}
    >
        {props.isMarkerShown && <Marker position={props.location} />}
    </GoogleMap>
))
const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        users: state.userReducer.users
    }
}
export default connect(mapStateToProps)(SingleAd);