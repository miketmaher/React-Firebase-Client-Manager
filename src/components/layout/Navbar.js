import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

class Navbar extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogout = e => {
    e.preventDefault();
    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            ClientPanel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <i className="fas fa-tachometer-alt" /> Dashboard
                  </Link>
                </li>
              ) : null}
            </ul>
            {isAuthenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    <i className="fas fa-envelope" /> {auth.email}
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/settings" className="nav-link">
                    <i className="fas fa-cog" /> Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="#!" className="nav-link" onClick={this.onLogout}>
                    <i className="fas fa-sign-out-alt" /> Logout
                  </a>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
  // settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
    // settings: state.settings
  }))
)(Navbar);
