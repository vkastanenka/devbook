// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { getAllUsers } from "../../store/actions/userActions";

// Components
import Icon from "../Icon/Icon";
import Spinner from "../Spinner/Spinner";
import InputGroup from "../Inputs/InputGroup";

class BrowseDevelopers extends Component {
  state = {
    handleFilterSelect: true,
    users: null,
    filteredUsers: null,
    userFilter: "",
    handleFilter: "",
    pages: "",
    currentPage: 1,
  };

  // Set users in state when component mounts
  async componentDidMount() {
    await this.props.getAllUsers();
    this.setState({
      users: this.props.users.users,
      filteredUsers: this.props.users.users,
      pages: Math.ceil(this.props.users.users.length / 10),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { handleFilterSelect, users, userFilter, handleFilter } = this.state;

    if (prevState.handleFilterSelect !== handleFilterSelect) {
      this.setState({ filteredUsers: users, userFilter: "", handleFilter: "" });
    }

    if (handleFilterSelect) {
      const filterHandle = handleFilter.toLowerCase();

      if (handleFilter !== prevState.handleFilter) {
        const filteredUsers = users.filter((user) => {
          const userHandle = user.profile.handle.toLowerCase();
          
        })
      }
    }
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="browse-devs">
        <div className="browse-devs__filter-toggle">
          <span>Browse Developers By:</span>
          <span
            onClick={() =>
              this.setState((prevState) => ({
                handleFilterSelect: !prevState.handleFilterSelect,
              }))
            }
          >
            {this.state.handleFilterSelect ? "Handle" : "Name"}
          </span>
          <Icon
            type="arrow-with-circle-right"
            className="icon icon--large icon--primary"
          />
        </div>
        {/* <InputGroup
          type="email"
          name="loginEmail"
          id="email"
          placeholder="Email address"
          value={this.state.loginEmail}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="email"
          label="Email address"
        /> */}
      </div>
    );
  }
}

BrowseDevelopers.propTypes = {
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getAllUsers })(BrowseDevelopers);
