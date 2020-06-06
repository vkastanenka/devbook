// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import {
  deletePost,
  addLike,
  removeLike,
  addDislike,
  removeDislike,
} from "../../../../../../store/actions/postActions";
import {
  willReceiveAsyncErrors,
  clearErrorsOnUnmount,
} from "../../../../../../utils/formUtils";
import { clearErrors } from "../../../../../../store/actions/errorActions";

// Utilities
import postTime from "../../../../../../utils/postTime";

// Components
import Comments from "../Comments/Comments";
import Icon from "../../../../../../components/Icon/Icon";

// Individual timeline post
class TimelinePost extends Component {
  state = {
    showComments: false,
    postToDelete: "",
    postToLike: "",
    postToDislike: "",
    errors: {},
  };

  timer = null;

  componentWillReceiveProps(nextProps) {
    willReceiveAsyncErrors(this, nextProps);
  }

  componentWillUnmount() {
    clearErrorsOnUnmount(this);
  }

  // Deletes post if belongs to the user
  onDeleteClick = async (id) => {
    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }

    // DELETE request
    await this.props.deletePost(id);

    // Reverts icon if errors
    if (Object.keys(this.state.errors).length > 0) {
      this.setState({ postToDelete: "" });
    }
  };

  // Toggles like for the post
  toggleLike = async (likes, id) => {
    const { user } = this.props.auth.user;

    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }

    if (likes.indexOf(user._id) > -1) {
      // DELETE request
      await this.props.removeLike(id);
    } else {
      // POST request
      await this.props.addLike(id);
    }

    // Reverts icon
    this.setState({ postToLike: "" });
  };

  // Toggles dislike for the post
  toggleDislike = async (dislikes, id) => {
    const { user } = this.props.auth.user;

    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }

    if (dislikes.indexOf(user._id) > -1) {
      // DELETE request
      await this.props.removeDislike(id);
    } else {
      // POST request
      await this.props.addDislike(id);
    }

    // Reverts icon
    this.setState({ postToDislike: "" });
  };

  // Toggles comment display
  toggleComments = () => {
    this.setState((prevState) => ({ showComments: !prevState.showComments }));
  };

  render() {
    const { post } = this.props;
    const { user } = this.props.auth.user;
    let closeIcon, likeIcon, dislikeIcon, commentIcon, commentsDropdown;
    const {
      showComments,
      postToDelete,
      postToLike,
      postToDislike,
    } = this.state;
    const loadingIcon = (
      <Icon type="cw" className="icon icon--large icon--primary rotate" />
    );

    if (post.user._id === user._id && post._id === postToDelete) {
      closeIcon = (
        <Icon
          type="cw"
          className="icon icon--primary icon--medium post__close-icon rotate"
        />
      );
    } else if (post.user._id === user._id) {
      closeIcon = (
        <Icon
          type="cross"
          className="icon icon--white-primary icon--medium icon--active icon--translate post__close-icon"
          onClick={() => {
            this.onDeleteClick(post._id);
            this.setState({ postToDelete: post._id });
          }}
        />
      );
    }

    if (post._id === postToLike) {
      likeIcon = loadingIcon;
    } else {
      likeIcon = (
        <Icon
          type="thumbs-up"
          className="icon icon--large icon--primary-white icon--active icon--translate"
          onClick={() => {
            this.toggleLike(post.likes, post._id);
            this.setState({ postToLike: post._id });
          }}
        />
      );
    }

    if (post._id === postToDislike) {
      dislikeIcon = loadingIcon;
    } else {
      dislikeIcon = (
        <Icon
          type="thumbs-down"
          className="icon icon--large icon--primary-white icon--active icon--translate"
          onClick={() => {
            this.toggleDislike(post.dislikes, post._id);
            this.setState({ postToDislike: post._id });
          }}
        />
      );
    }

    if (showComments) {
      commentsDropdown = (
        <Comments comments={post.comments} postId={post._id} />
      );
    }

    return (
      <div className="post">
        {closeIcon}
        <div className="post__content">
          <Link to={`/user/${post.user.handle}`}>
            <img
              src={require(`../../../../../../assets/img/users/${post.user.photo}`)}
              alt="Post pfp"
              className="post__pfp"
            />
          </Link>
          <div className="post__body">
            <div className="post__info">
              <Link
                to={`/user/${post.user.handle}`}
                className="link-style text-secondary"
              >
                {post.user.name}
              </Link>
              <Link
                to={`/user/${post.user.handle}`}
                className="link-style text-secondary"
              >
                @{post.user.handle}
              </Link>
              <p className="text-secondary">{postTime(post.date)}</p>
            </div>
            <p className="text-primary post__text">{post.text}</p>
            <div className="post__options">
              <div className="post__option">
                {likeIcon}
                <span className="text-secondary">{post.likes.length}</span>
              </div>
              <div className="post__option">
                {dislikeIcon}
                <span className="text-secondary">{post.dislikes.length}</span>
              </div>
              <div className="post__option">
                <Icon
                  type="chat"
                  className={!showComments ? "icon icon--large icon--primary-white icon--active icon--translate" : "icon icon--large icon--white icon--active icon--translate-active"}
                  onClick={() =>
                    this.setState((prevState) => ({
                      showComments: !prevState.showComments,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {commentsDropdown}
      </div>
    );
  }
}

TimelinePost.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addDislike: PropTypes.func.isRequired,
  removeDislike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  clearErrors,
  deletePost,
  addLike,
  removeLike,
  addDislike,
  removeDislike,
})(TimelinePost);
