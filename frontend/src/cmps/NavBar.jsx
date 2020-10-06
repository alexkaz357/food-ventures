import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import socketService from '../services/socketService'
import { connect } from 'react-redux'

import { NotificationModal } from '../cmps/NotificationModal'

class _NavBar extends Component {

  state = {
    isTop: true,
    isShow: false,
    menu: false
  };

  componentDidMount() {
    socketService.setup();
    socketService.on('show notification', data => {
      if (this.props.loggedInUser.chef && this.props.loggedInUser._id === data.chefId) {
        this.setState({ isShow: true })
      }
    })
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 100;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop })
      }
    });
  }

  componentWillUnmount() {
    socketService.terminate();
  }

  goHome = () => {
    this.props.history.push('/')
    window.scrollTo(0, 0)
  }

  toggleMenu = () => {
    document.body.classList.toggle('menu-open')
    this.setState({menu: !this.state.menu})
  }

  closeModal = () => {
    this.setState({ isShow: false })
  }

  render() {
    return (
      <nav className={"nav-bar flex" + (this.state.isTop ? ' top' : '')}>

        {this.state.isShow && <NotificationModal closeModal={this.closeModal} />}

        <div className='screen' onClick={this.toggleMenu}></div>

        <img src={require('../img/logo.png')} alt="logo" onClick={this.goHome} />

        <div className={`hamburger hamburger--spin ${this.state.menu ? 'is-active' : ''}`} onClick={this.toggleMenu}>
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </div>

        <ul className="flex">
          <NavLink to='/chef' onClick={this.toggleMenu}><li>CHEFS</li></NavLink>
          <a href="#locations" onClick={this.toggleMenu}>LOCATIONS</a>
          <a href="#cuisines" onClick={this.toggleMenu}>CUISINES</a>
          <NavLink to='/reservations' onClick={this.toggleMenu}><li>MY RESERVATIONS</li></NavLink>
          <NavLink to='/login' onClick={this.toggleMenu}><li>CONNECT</li></NavLink>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userReducer.loggedInUser
  }
}

export const NavBar = withRouter(connect(mapStateToProps)(_NavBar))