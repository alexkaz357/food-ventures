import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadUsers } from '../store/actions/userActions'
import { clearFilter } from '../store/actions/userActions'
import { UserList } from '../cmps/UserList'
import { Filter } from '../cmps/Filter'
import { Link } from 'react-router-dom'

class _Chefs extends Component {

  state = {
    filterBy: {},
    filter: ''
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.loadUsers()
  }

  componentWillUnmount() {
    this.props.clearFilter()
  }

  onSetFilter = (filterBy) => {
    this.setState(prevState => ({ filterBy: { ...prevState.filterBy, ...filterBy } }), () => this.props.loadUsers(this.state.filterBy))
  }

  addRElevantWords() {
    if (this.props.filter.location) {
      let location = this.props.filter.location.charAt(0).toUpperCase() + this.props.filter.location.slice(1);
      if (location === 'Tel-aviv') location = 'Tel-Aviv'
      return `in ${location}`
    }
    else if (this.props.filter.cuisine) {
      let cuisine = this.props.filter.cuisine.charAt(0).toUpperCase() + this.props.filter.cuisine.slice(1) + ' food';
      if (cuisine === 'BBQ food') cuisine = 'BBQ'
      return `that specilaze in ${cuisine}`
    }
    else return 'WORLDWIDE'
  }

  render() {

    const { users } = this.props
    let onlyChefs = users.filter(user => user.chef)

    if (this.props.filter.location) {
      onlyChefs = onlyChefs.filter(user => user.chef.location.name === this.props.filter.location)
    }
    else if (this.props.filter.cuisine) {
      onlyChefs = onlyChefs.filter(user => user.chef.tags.includes(this.props.filter.cuisine))
    }

    if (!onlyChefs) return <div className="main-container"><img src={require('../img/loading.gif')} className="loading" alt="" /></div>

    return (
      <div className="chefs main-container">
        <h2>Welcome {this.props.loggedInUser.fullName}, below is a list of our chefs {this.addRElevantWords()}</h2>
        <div className="flex-between">
          <div>
            <Filter onSetFilter={this.onSetFilter} />
          </div>
          <Link to='/' className="back-to-homepage">Home &nbsp;&nbsp;&nbsp;<i className="arrow fas fa-arrow-right"></i></Link>
        </div>
        <UserList users={onlyChefs} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userReducer.users,
    filter: state.userReducer.filter,
    loggedInUser: state.userReducer.loggedInUser
  }
}

const mapDispatchToProps = {
  loadUsers,
  clearFilter
}

export const Chefs = connect(mapStateToProps, mapDispatchToProps)(_Chefs)