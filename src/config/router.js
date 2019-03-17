import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Header from '../components/header'
import Home from '../components/home'
import Index from '../components/index'
import SingleAd from '../components/singleAd'
import Register from '../components/register'
import Login from '../components/login'
import Profile from '../components/profile';
import Chat from '../components/chat'
import ChangePassword from '../components/changePassword'
import AddItem from '../components/addItem';
import { Container, Row, Button, Col } from 'reactstrap';

const BasicExample = () => (
  <Router>
    <div>
    <Header/>
      <Container fluid="true">
        <Row>
          <Col>
            <Route exact path="/" component={Index} />
            <Route path="/ads/:category" component={Home}/>
            <Route path="/singleAd/:id" component={SingleAd} />
            <Route path="/chat/:id" component={Chat} />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/register" component={Register} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/addAd" component={AddItem} />
            <PrivateRoute path="/changePassword" component={ChangePassword} />
          </Col>
        </Row>
      </Container>
      
    </div>
  </Router>
);

const authInfo = {
  isAuthenticated: !!localStorage.getItem('user'),
  login: function(user){
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticated = true
  },
  logout: function(user){
    this.isAuthenticated = false
    localStorage.removeItem('user')
  }
}

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route 
  {...rest}
  render={props => 
  authInfo.isAuthenticated ? (
    <Component {...props} />
  ): (
    <Redirect
      to={{
        pathname: "/login",
        state: {from: props.location}
      }}
      />
  )
}
/>
);

const AuthRoute = ({ component: Component, ...rest}) => (
  <Route 
  {...rest}
  render={props => 
  !authInfo.isAuthenticated ? (
    <Component {...props} />
  ): (
    <Redirect
      to={{
        pathname: "/profile",
        state: {from: props.location}
      }}
      />
  )
}
/>
);

export {
  BasicExample,
  authInfo
};