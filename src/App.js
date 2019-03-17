import React, { Component } from 'react';
import Home from './components/home'
import Register from './components/register'
import Login from './components/login'
import Profile from './components/profile';
import ChangePassword from './components/changePassword'
import AddItem from './components/addItem'
import { Container, Row, Button, Col } from 'reactstrap';
import Header from './components/header'
import { BasicExample as Routes } from './config/router';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRegister: false,
      isLogin: false,
      changePassword: false,
      addItem: false,
      profile: false
    }
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);

    this.getUser = this.getUser.bind(this);

    this.logout = this.logout.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.profile = this.profile.bind(this);

    this.home = this.home.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  register() {
    this.setState({
      isRegister: true,
      isLogin: false
    })
  }
  login() {
    this.setState({
      isRegister: false,
      isLogin: true
    })
  }
  home() {
    this.setState({
      isRegister: false,
      isLogin: false
    })
  }

  getUser(user) {
    this.setState({
      user: user
    })
  }

  logout() {
    this.setState({ user: undefined })
  }

  changePassword() {
    this.setState({
      changePassword: true,
      addItem: false,
      profile: false
    })
  }
  profile() {
    this.setState({
      profile: true,
      changePassword: false,
      addItem: false
    })
  }

  addItem() {
    this.setState({
      addItem: true,
      changePassword: false,
      profile: false
    })
  }
  render() {
    const { isRegister, isLogin, user, changePassword, addItem, profile } = this.state;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            {/* <Header flags={{isRegister,user, isLogin, changePassword, addItem, profile}} user={user} register={this.register} login={this.login} home={this.home} logout={this.logout} profile={this.profile} addAd={this.addItem} changePassword={this.changePassword}/>
        <Container fluid="true">
          <Row>
            <Col> */}
            <Routes />
            {/* {!user && !isLogin && !isRegister && <Home/>}
            
            
            {!user && isLogin && <Login getUser={this.getUser} />}
            {!user && isLogin && <Button onClick={this.register}>Don't have account? Register</Button>}
            
            
            {!user && isRegister && <Register />}
            {!user && isRegister && <Button onClick={this.login}>Click here to Login</Button>}
            
            
            {user && !changePassword && !addItem && profile && <Profile {...user} logout={this.logout} changePassword={this.changePassword} addItem={this.addItem} />}
            
            
            {user && changePassword && !addItem && !profile && <ChangePassword logout={this.logout} profile={this.profile}/>}

            {user && !changePassword && addItem && !profile &&  <AddItem logout={this.logout} profile={this.profile}/>} */}
            {/* </Col>
          </Row>
        </Container> */}
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
