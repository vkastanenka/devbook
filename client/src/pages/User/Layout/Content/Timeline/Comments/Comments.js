// TODO: FINISHED

// React
import React from "react";
import PropTypes from "prop-types";

// Components
import CommentsForm from "./Layout/CommentsForm";
import CommentsFeed from "./Layout/CommentsFeed";

const Comments = (props) => {
  const { postId, comments } = props;

  return (
    <div className="comments ma-y-sm">
      <CommentsForm postId={postId} />
      <CommentsFeed postId={postId} comments={comments} />
    </div>
  );
};

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Comments;
