// TODO: FINISHED

// React
import React from "react";
import PropTypes from "prop-types";

// Components
import CommentsPost from "./CommentsPost";

// Feed containing all the comments for a post
const CommentsFeed = (props) => {
  const { comments, postId } = props;
  let commentPosts;
  let feed = <div className="timeline__comments flex flex--abs-center">
    <p className="text-secondary ma-y-sm">
      Be the first to reply to this post
    </p>
  </div>;

  if (comments.length !== 0) {
    commentPosts = comments.map((comment) => (
      <CommentsPost key={comment._id} postId={postId} comment={comment} />
    ));
    feed = <div className="comments__feed">{commentPosts}</div>;
  }

  return feed;
};

CommentsFeed.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default CommentsFeed;
