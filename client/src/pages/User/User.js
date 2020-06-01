// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { getUserByHandle } from "../../store/actions/userActions";

// Components
import Spinner from "../../components/Spinner/Spinner";
import Auxiliary from "../../components/HigherOrder/Auxiliary";
// import Navbar from './Layout/Navbar'
import Profile from "./Layout/Profile";
// import ContentCard from '../../components/Cards/Content';

class User extends Component {
  state = {
    currentUser: true,
  };

  componentDidMount() {
    // If user not authenticated, push to home page
    if (!this.props.auth.isAuth) this.props.history.push("/");
    else if (this.props.auth.isAuth) {
      // If authenticated, get user by handle in url params
      this.props.getUserByHandle(this.props.match.params.handle);
      // Set state if current user doesn't match url param
      if (this.props.match.params.handle !== this.props.auth.user.user.handle) {
        this.setState({ currentUser: false });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuth) this.props.history.push("/");
    if (this.props.match.params.handle !== nextProps.match.params.handle) {
      // If next url param for handle is different, get the user
      this.props.getUserByHandle(nextProps.match.params.handle);
      // Set state if current user doesn't match url param
      if (nextProps.match.params.handle !== this.props.auth.user.user.handle) {
        this.setState({ currentUser: false });
      } else if (
        nextProps.match.params.handle === this.props.auth.user.user.handle
      ) {
        this.setState({ currentUser: true });
      }
    }
  }

  render() {
    let content;
    const { user, loading } = this.props.users;

    if (!user && loading) content = <Spinner />;
    else if (user && !loading)
      content = (
        <Auxiliary>
          <Profile currentUser={this.state.currentUser} />
          <div className="user-card__content"></div>
        </Auxiliary>
      );

    return <div className="user-card">{content}</div>;
  }
}

User.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  getUserByHandle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, { getUserByHandle })(User);
