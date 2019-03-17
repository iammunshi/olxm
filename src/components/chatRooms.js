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
import { getRoomsByUserId, checkAndCreateRoom } from '../config/firebase';
import { connect } from 'react-redux';
import moment from 'moment'

class ChatRooms extends Component {
    constructor() {
        super()
        this.state = {
            rooms: []
        }
    }

    async componentDidMount() {
        console.log(this.props.user.id)
        const rooms = await getRoomsByUserId(this.props.user.id)
        console.log('roooooooooms?>>>>>>>', rooms)
        this.setState({
            rooms
        })
    }
    async chat(chatId){
        console.log("click")
        const room = await checkAndCreateRoom(chatId)
        this.props.history.push({
            pathname: "/chat/" + room.id
        })
    }
    render() {
        const { rooms } = this.state
        return (
            <div>
                <Container fluid="true">
                    <hr />
                    <Row>
                        <Col md="12">
                            <Row style={{ marginBottom: 10 }}>
                                {
                                    rooms.map(element => {
                                        console.log(element)
                                        return <Col md="3" style={{ marginBottom: 10 }}>

                                            <Card>
                                                <CardBody>
                                                    <CardTitle><b>{this.props.user.id === Object.keys(element.data.users)[0] ? this.props.users.find(user1 => user1.id === Object.keys(element.data.users)[1]).fullname : this.props.users.find(user1 => user1.id === Object.keys(element.data.users)[0]).fullname}</b></CardTitle>
                                                    <CardTitle>Chat Started on: <b>{moment(element.data.createdAt).format("DD:MM:YYYY - HH:MM:SS")}</b></CardTitle>
                                                    {/* <CardText>{element.data.description || element.data.desc}</CardText>
                                                    <CardSubtitle>Price: {element.data.price}</CardSubtitle>
                                                    <Button style={{ marginTop: 10 }} color="primary" onClick={() => this.getAdById(element.id)}>View</Button> */}
                                                    <Button onClick={this.chat.bind(this, this.props.user.id === Object.keys(element.data.users)[0] ? Object.keys(element.data.users)[1] : Object.keys(element.data.users)[0])} style={{ width: "100%" }} color="primary">Start Chat</Button>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    })
                                }
                            </Row>
                            <Row>

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
// export default connect(mapStateToProps, mapDispatchToProps)(ChatRooms);
const mapStateToProps = (state) => {
    console.log("state wala user>>>>>", state)
    return {
        user: state.userReducer.user,
        users: state.userReducer.users
    }
}

export default connect(mapStateToProps)(ChatRooms);