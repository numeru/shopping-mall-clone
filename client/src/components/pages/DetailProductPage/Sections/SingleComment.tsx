import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserState } from "_reducers/user_reducer";
import { Comment } from "../DetailProductPage";
import ReplyComment from "./ReplyComment";

type Props = {
  commentList: Comment[];
  comment: Comment;
  user: UserState;
};

const SingleComment = ({ commentList, comment, user }: Props) => {
  const [replyCommentList, setReplyCommentList] = useState<Comment[]>([]);
  const [showReplyComments, setShowReplyComments] = useState(false);

  const getReplyCommentList = () => {
    const newReplyCommentList = commentList.filter(
      (aComment) => aComment.responseTo === comment._id
    );
    setReplyCommentList(newReplyCommentList);
  };

  useEffect(() => {
    getReplyCommentList();
  }, []);

  return (
    <>
      <li
        style={{ listStyle: "none", cursor: "pointer" }}
        onClick={() => setShowReplyComments((prev) => !prev)}
      >
        {comment.content}
        <br />
        {comment.createdAt.substring(0, 19).replace("T", " ")}
      </li>
      {replyCommentList && showReplyComments && (
        <ReplyComment
          user={user}
          comment={comment}
          replyCommentList={replyCommentList}
          setReplyCommentList={setReplyCommentList}
        />
      )}
    </>
  );
};

export default SingleComment;
