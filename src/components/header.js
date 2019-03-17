import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Routes from '../config/router';
import { authInfo } from '../config/router';
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { removeUser } from '../redux/user/action'


class Header extends Component {
    constructor(props) {
        super(props)
        console.log("header props>>>>>>>>>>>>>>>>>>", props)
        this.toggle = this.toggle.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.home = this.home.bind(this);

        this.profile = this.profile.bind(this);
        this.addAd = this.addAd.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.logout = this.logout.bind(this);
        // this.state = {
        //     isRegister: false,
        //     isLogin: false,
        //     changePassword: false,
        //     addItem: false
        // }
        this.state = {
            isOpen: false,
            // isRegister: this.props.flags.isRegister,
            // isLogin: this.props.flags.isLogin,
            // changePassword: this.props.flags.changePassword,
            // addItem: this.props.flags.addItem,
            user: this.props.user
        };
        // console.log("user", this.props.flags.user)
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    register() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        //this.props.register();
    }
    login() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        //this.props.login();
        //this.props.history.push('login');
    }
    home() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        //this.props.home();
    }
    profile() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        //this.props.profile();
    }
    addAd() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        //this.props.addAd();
    }
    changePassword() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        //this.props.changePassword();
    }
    logout() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        this.props.removeUserFunc();
        authInfo.logout();
        console.log("prop history", this.props)
        //this.props.history.push("login")
        //this.props.logout();
    }

    static getDerivedStateFromProps(props, state) {
        // Update state so the next render will show the fallback UI.
        return { user: props.user };
    }
    render() {
        const {
            // isRegister, 
            // isLogin, 
            user,
            // changePassword, addItem
        } = this.state;
        // console.log("userHeader", user)
        //console.log('log', isLogin)
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand onClick={this.home}>Expertizo-Bech dey</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {/* <Router> */}
                        <Nav className="ml-auto" navbar>
                            {
                                user &&
                                <NavItem>
                                    <NavLink onClick={this.home}><Link to="/">Home</Link></NavLink>
                                </NavItem>
                            }
                            {
                                user &&
                                <NavItem>
                                    <NavLink><Link to="/myChatRooms">My Chat Rooms</Link></NavLink>
                                </NavItem>
                            }
                            {user &&
                                <NavItem>
                                    <NavLink href="#" onClick={this.profile}><Link to="/profile">Profile</Link></NavLink>
                                </NavItem>
                            }
                            {user &&
                                <NavItem>
                                    <NavLink href="#" onClick={this.addAd}><Link to="/addAd">Add Ad</Link></NavLink>
                                </NavItem>
                            }
                            {user &&
                                <NavItem>
                                    <NavLink href="#" onClick={this.changePassword}><Link to="/changePassword">Change Password</Link></NavLink>
                                </NavItem>
                            }
                            {user &&
                                <NavItem>
                                    <NavLink href="#" onClick={this.logout}><Link to="/login">Logout</Link></NavLink>
                                </NavItem>
                            }
                            {
                                !user &&
                                <NavItem>
                                    <NavLink onClick={this.home}><Link to="/">Home</Link></NavLink>
                                </NavItem>
                            }
                            {
                                !user &&
                                <NavItem>
                                    <NavLink onClick={this.login}><Link to="/login">Login</Link></NavLink>
                                </NavItem>
                            }


                            {/* <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                  </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                  </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                  </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}

                        </Nav>
                        {/* </Router> */}
                    </Collapse>
                </Navbar>
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
const mapDispatchToProps = (dispatch) => {
    return {
        removeUserFunc: () => dispatch(removeUser())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);