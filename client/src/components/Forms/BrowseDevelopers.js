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
import Auxiliary from "../HigherOrder/Auxiliary";
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
  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.users.users && nextProps.users.users) {
      this.setState({
        users: nextProps.users.users,
        filteredUsers: nextProps.users.users,
        pages: Math.ceil(nextProps.users.users.length / 10),
      });
    }
  }

  // Filtering users based on state
  componentDidUpdate(prevProps, prevState) {
    let filterHandle, filterUser, filteredUsers;
    const { handleFilterSelect, users, userFilter, handleFilter } = this.state;

    // Changing filter method resets the filters
    if (prevState.handleFilterSelect !== handleFilterSelect) {
      this.setState({
        filteredUsers: users,
        userFilter: "",
        handleFilter: "",
        pages: Math.ceil(users.length / 10),
        currentPage: 1,
      });
    }

    // Filter by handle
    if (handleFilterSelect) {
      filterHandle = handleFilter.toLowerCase();

      // Handle filter changed
      if (handleFilter !== prevState.handleFilter) {
        // Filter if user handle starts with the filter handle
        // eslint-disable-next-line
        filteredUsers = users.filter((user) => {
          const userHandle = user.handle.toLowerCase();
          if (userHandle.includes(filterHandle)) return user;
        });

        // Set the state
        this.setState({
          filteredUsers,
          pages: Math.ceil(filteredUsers.length / 10),
          currentPage: 1,
        });
      }
      // Filter by user name
    } else if (!handleFilterSelect) {
      filterUser = userFilter.toLowerCase();

      // User name changed
      if (userFilter !== prevState.userFilter) {
        // Filter if user name starts with user handle
        // eslint-disable-next-line
        filteredUsers = users.filter((user) => {
          const userName = user.name.toLowerCase();
          if (userName.includes(filterUser)) return user;
        });

        // Set the state
        this.setState({
          filteredUsers,
          pages: Math.ceil(filteredUsers.length / 10),
          currentPage: 1,
        });
      }
    }
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { filteredUsers, currentPage } = this.state;
    let content, filteredPageUsers;
    let pageNumbers = [];

    if (!filteredUsers) content = <Spinner />;
    else {
      // eslint-disable-next-line
      filteredPageUsers = filteredUsers.filter((user, index) => {
        if (index < currentPage * 10 && index >= currentPage * 10 - 10) {
          return user;
        }
      });

      const users = filteredPageUsers.map((user) => (
        <li className="browse-devs__dev" key={user._id}>
          <Link className="link-style" to={`/user/${user.handle}`}>
            {/* eslint-disable-next-line */}
            <img
              src={require(`../../assets/img/users/${user.photo}`)}
              alt="Dev photo"
              className="browse-devs__dev-pfp"
            />
            <div className="browse-devs__dev-identity">
              <span>{`@${user.handle}`}</span>
              <span>{user.name}</span>
            </div>
          </Link>
        </li>
      ));

      for (let i = 1; i <= this.state.pages; i++) {
        pageNumbers.push(
          <p
            key={i}
            className="browse-devs__page-number"
            onClick={() => this.setState({ currentPage: i })}
          >
            {i}
          </p>
        );
      }

      content = (
        <Auxiliary>
          <ul className="browse-devs__dev-list">{users}</ul>
          {this.state.pages ? (
            <div className="browse-devs__page-numbers">{pageNumbers}</div>
          ) : null}
        </Auxiliary>
      );
    }

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
          {this.state.handleFilterSelect ? (
            <InputGroup
              type="text"
              name="handleFilter"
              id="handleFilter"
              placeholder="Handle filter"
              value={this.state.handleFilter}
              onChange={(e) => this.onChange(e)}
              htmlFor="handleFilter"
              label="Handle filter"
            />
          ) : (
            <InputGroup
              type="text"
              name="userFilter"
              id="userFilter"
              placeholder="Name filter"
              value={this.state.userFilter}
              onChange={(e) => this.onChange(e)}
              htmlFor="userFilter"
              label="Name filter"
            />
          )}
        </div>
        {content}
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
