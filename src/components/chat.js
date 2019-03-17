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
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    CardHeader
} from 'reactstrap';
import { loginFB, getAds, getAdsWithSearch, getCategories, getAdsByCategory, getAdById, getLocByName, getRoomInfo, sendMessageToDb,getUserById } from '../config/firebase';
import { connect } from 'react-redux';
import { getMessages } from '../redux/chat/action'
import moment from 'moment';
import { publicDecrypt } from 'crypto';
class Chat extends Component {
    constructor(props) {
        super(props)
        console.log(props.location.state)
        this.state = {
            room: {}
        }
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        this.getRoomInfo()
        this.props.getMessages(this.props.match.params.id)
    }
    async getRoomInfo() {
        const room = await getRoomInfo(this.props.match.params.id)
        this.setState({
            room
        })
    }

    sendMessage() {
        const { text, room } = this.state;
        sendMessageToDb(text, room.id);
    }
    render() {
        console.log(this.props.messages)
        const { messages } = this.props
        return (
            <div>
                <Container fluid>
                    <hr />
                    <Row>
                    <Col md="3">
                    </Col>
                        <Col md="6">
                            <Card>
                                <Container>
                                    <Row>
                                        <Col md="12">
                                       
                                            {messages.map((message) => {
                                                console.log(message.userId)
                                                console.log(this.props.user.id)
                                                const isCurrentUser = message.userId === this.props.user.id;
                                                console.log('isCurrentUser========??', isCurrentUser)
                                                return  <Card style={{margin:10}}><div style={{padding:10, textAlign: isCurrentUser ? 'right': 'left'}}>
                                                    <div><b>{isCurrentUser ? this.props.user.fullname : this.props.users.find(user=> user.id === message.userId).fullname}</b></div>
                                                    <div>{message.text}</div>
                                                    <div>{moment(message.createdAt).format("HH:MM:SS")}</div>
                                                </div>
                                                </Card>
                                            })}
                                            
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                            <FormGroup>
                                <Input style={{borderColor: 'green'}} placeholder="Type message here" onChange={(e) => this.setState({ text: e.target.value })} />
                            </FormGroup>
                            
                            <Button className="float-right" color="success" onClick={this.sendMessage}>Send</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log('messages>>>>>>>>>>', state.chatReducer.messages)
    return {
        messages: state.chatReducer.messages,
        user: state.userReducer.user,
        users: state.userReducer.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMessages: roomId => dispatch(getMessages(roomId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);