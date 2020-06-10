// TODO: FINISHED

// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import {
  deleteComment,
  addCommentLike,
  removeCommentLike,
  addCommentDislike,
  removeCommentDislike,
} from "../../../../../../../store/actions/postActions";
import { willReceiveAsyncErrors, clearErrorsOnUnmount } from "../../../../../../../utils/formUtils";
import { clearErrors } from "../../../../../../../store/actions/errorActions";

// Utilities
import { postTime } from "../../../../../../../utils/dates";

// Components
import Icon from "../../../../../../../components/Icon/Icon";

// Individual comment post
class CommentsPost extends Component {
  state = {
    commentToDelete: "",
    commentToLike: "",
    commentToDislike: "",
    errors: {},
  };

  timer = null;

  componentWillReceiveProps(nextProps) {
    willReceiveAsyncErrors(this, nextProps);
  }

  componentWillUnmount() {
    clearErrorsOnUnmount(this);
  }

  // Deletes comment if belongs to the user
  onDeleteClick = async (postId, commentId) => {
    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }

    // DELETE request
    await this.props.deleteComment(postId, commentId);

    // Reverts icon if errors
    if (Object.keys(this.state.errors).length > 0) {
      this.setState({ postToDelete: "" });
    }
  };

  // Toggles like for the comment
  toggleLike = async (likes, postId, commentId) => {
    const { user } = this.props.auth;

    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }

    if (likes.indexOf(user._id) > -1) {
      // DELETE request
      await this.props.removeCommentLike(postId, commentId);
    } else {
      // POST request
      await this.props.addCommentLike(postId, commentId);
    }

    // Reverts icon
    this.setState({ commentToLike: "" });
  };

  // Toggles dislike for the comment
  toggleDislike = async (dislikes, postId, commentId) => {
    const { user } = this.props.auth;

    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }

    if (dislikes.indexOf(user._id) > -1) {
      // DELETE request
      await this.props.removeCommentDislike(postId, commentId);
    } else {
      // POST request
      await this.props.addCommentDislike(postId, commentId);
    }

    // Reverts icon
    this.setState({ commentToDislike: "" });
  };

  render() {
    const { user } = this.props.auth;
    const { postId, comment } = this.props;
    console.log(comment);
    let closeIcon, likeIcon, dislikeIcon;
    const { commentToDelete, commentToLike, commentToDislike } = this.state;
    const loadingIcon = (
      <Icon type="cw" className="icon icon--large icon--primary rotate" />
    );

    if (comment.user._id === user._id && comment._id === commentToDelete) {
      closeIcon = (
        <Icon
          type="cw"
          className="icon icon--primary icon--medium post__close-icon rotate"
        />
      );
    } else if (comment.user._id === user._id) {
      closeIcon = (
        <Icon
          type="cross"
          className="icon icon--white-primary icon--medium icon--active icon--translate post__close-icon"
          onClick={() => {
            this.onDeleteClick(postId, comment._id);
            this.setState({ commentToDelete: comment._id });
          }}
        />
      );
    }

    if (comment._id === commentToLike) {
      likeIcon = loadingIcon;
    } else {
      likeIcon = (
        <Icon
          type="thumbs-up"
          className="icon icon--large icon--primary-white icon--active icon--translate"
          onClick={() => {
            this.toggleLike(comment.likes, postId, comment._id);
            this.setState({ commentToLike: comment._id });
          }}
        />
      );
    }

    if (comment._id === commentToDislike) {
      dislikeIcon = loadingIcon;
    } else {
      dislikeIcon = (
        <Icon
          type="thumbs-down"
          className="icon icon--large icon--primary-white icon--active icon--translate"
          onClick={() => {
            this.toggleDislike(comment.dislikes, postId, comment._id);
            this.setState({ commentToDislike: comment._id });
          }}
        />
      );
    }

    return (
      <div className="post">
        {closeIcon}
        <div className="post__content">
          <Link to={`/user/${comment.user.handle}`}>
            <img
              src={require(`../../../../../../../assets/img/users/${comment.user.photo}`)}
              alt="Post pfp"
              className="post__pfp"
            />
          </Link>
          <div className="post__body">
            <div className="post__info">
              <Link
                to={`/user/${comment.user.handle}`}
                className="link-style text-secondary"
              >
                {comment.user.name}
              </Link>
              <Link
                to={`/user/${comment.user.handle}`}
                className="link-style text-secondary"
              >
                @{comment.user.handle}
              </Link>
              <p className="text-secondary">{postTime(comment.date)}</p>
            </div>
            <p className="text-primary post__text">{comment.text}</p>
            <div className="post__options">
              <div className="post__option">
                {likeIcon}
                <span className="text-secondary">{comment.likes.length}</span>
              </div>
              <div className="post__option">
                {dislikeIcon}
                <span className="text-secondary">
                  {comment.dislikes.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentsPost.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  addCommentLike: PropTypes.func.isRequired,
  removeCommentLike: PropTypes.func.isRequired,
  addCommentDislike: PropTypes.func.isRequired,
  removeCommentDislike: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  clearErrors,
  deleteComment,
  addCommentLike,
  removeCommentLike,
  addCommentDislike,
  removeCommentDislike,
})(CommentsPost);
