// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { getUserByHandle } from "../../store/actions/userActions";

// Components
import Alert from "../../components/Alert/Alert";
import Spinner from "../../components/Spinner/Spinner";
import Auxiliary from "../../components/HigherOrder/Auxiliary";
import Navbar from "../../components/Layout/Navbar";
import Profile from "./Layout/Profile/Profile";
import Content from "./Layout/Content/Content";

// User page with the main content
class User extends Component {
  state = {
    currentUser: true,
    showProfile: true,
  };

  componentDidMount() {
    // If user not authenticated, push to home page
    if (!this.props.auth.isAuth) this.props.history.push("/");
    else if (this.props.auth.isAuth) {
      // If authenticated, get user by handle in url params
      this.props.getUserByHandle(this.props.match.params.handle);
      // Set state if current user doesn't match url param
      if (this.props.match.params.handle !== this.props.auth.user.handle) {
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
      if (nextProps.match.params.handle !== this.props.auth.user.handle) {
        this.setState({ currentUser: false, showProfile: false });
      } else if (
        nextProps.match.params.handle === this.props.auth.user.handle
      ) {
        this.setState({ currentUser: true, showProfile: false });
      }
    }
  }

  render() {
    let content = (
      <Auxiliary>
        <Profile currentUser={this.state.currentUser} loading={true} />
        <div className="user__main">
          <Navbar loading={true} />
          <div className="user__content flex flex--abs-center">
            <Spinner />
          </div>
        </div>
      </Auxiliary>
    );

    const { user, loading } = this.props.users;

    if (user && !loading) {
      content = (
        <Auxiliary>
          <Profile
            currentUser={this.state.currentUser}
            showing={this.state.showProfile}
            hideProfile={() => this.setState({ showProfile: false })}
          />
          <div className="user__main">
            <Navbar loading={false} showProfile={() => this.setState({ showProfile: true })} />
            <Content />
          </div>
        </Auxiliary>
      );
    }

    return (
      <main className="user">
        <Auxiliary>
          {" "}
          {this.props.errors.noUserHandle ? (
            <Alert type="error" message={this.props.errors.noUserHandle} />
          ) : null}
          {this.props.errors.server500 ? (
            <Alert type="error" message={this.props.errors.server500} />
          ) : null}
          {this.props.errors.noPhoto ? (
            <Alert type="error" message={this.props.errors.noPhoto} />
          ) : null}
          {content}
        </Auxiliary>
      </main>
    );
  }
}

User.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getUserByHandle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  errors: state.errors,
});

export default connect(mapStateToProps, { getUserByHandle })(User);
