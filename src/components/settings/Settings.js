import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from '../../actions/settingsActions';

class Settings extends Component {
  onSetDisableBalanceOnAdd = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };

  onSetDisableBalanceOnEdit = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  onSetAllowRegistration = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  render() {
    const {
      disableBalanceOnEdit,
      disableBalanceOnAdd,
      allowRegistration
    } = this.props.settings;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow registration</label>{' '}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={!!allowRegistration}
                  onChange={this.onSetAllowRegistration}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance on Add</label>{' '}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={!!disableBalanceOnAdd}
                  onChange={this.onSetDisableBalanceOnAdd}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance on Edit</label>{' '}
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={!!disableBalanceOnEdit}
                  onChange={this.onSetDisableBalanceOnEdit}
                />
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired
};

const actions = {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  actions
)(Settings);
