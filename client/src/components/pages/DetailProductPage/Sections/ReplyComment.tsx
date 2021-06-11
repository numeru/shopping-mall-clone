import axios from "axios";
import React from "react";
import { useState } from "react";
import { UserState } from "_reducers/user_reducer";
import { Comment } from "../DetailProductPage";

type Props = {
  user: UserState;
  comment: Comment;
  replyCommentList: Comment[];
  setReplyCommentList: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const ReplyComment = ({
  user,
  comment,
  replyCommentList,
  setReplyCommentList,
}: Props) => {
  const [replyCommentContent, setReplyCommentContent] = useState("");

  const handleSumbitReplyComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      writer: user.userData._id,
      postId: comment.postId,
      responseTo: comment._id,
      content: replyCommentContent,
    };

    axios.post("/api/comment/saveComment", data).then((response) => {
      if (response.data.success) {
        console.log(response);
        setReplyCommentContent("");
        setReplyCommentList([...replyCommentList, response.data.result[0]]);
      }
    });
  };

  return (
    <div>
      <ul style={{ paddingLeft: "80px" }}>
        {replyCommentList.map((replyComment) => (
          <li key={replyComment._id} style={{ listStyle: "none" }}>
            {replyComment.content}
            <br />
            {replyComment.createdAt.substring(0, 19).replace("T", " ")}
          </li>
        ))}
      </ul>
      {user.userData?.isAuth && (
        <form
          onSubmit={handleSumbitReplyComment}
          style={{ paddingLeft: "80px" }}
        >
          <input
            type="text"
            value={replyCommentContent}
            onChange={(e) => setReplyCommentContent(e.target.value)}
          />
          <button type="submit">저장</button>
        </form>
      )}
    </div>
  );
};

export default ReplyComment;
