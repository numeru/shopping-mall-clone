import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserState } from "_reducers/user_reducer";
import { Comment } from "../DetailProductPage";
import SingleComment from "./SingleComment";

type Props = {
  user: UserState;
  commentList: Comment[];
  setCommentList: React.Dispatch<React.SetStateAction<Comment[]>>;
  productId: string;
};

const ProductComments = ({
  user,
  commentList,
  setCommentList,
  productId,
}: Props) => {
  const [commentContent, setCommentContent] = useState("");

  const handleSumbitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      content: commentContent,
      writer: user.userData._id,
      postId: productId,
    };

    axios.post("/api/comment/saveComment", data).then((response) => {
      if (response.data.success) {
        console.log(response);
        setCommentContent("");
        setCommentList([...commentList, response.data.result[0]]);
      }
    });
  };

  return (
    <section style={{ width: "100%", padding: "1rem 1.5rem" }}>
      <ul>
        {commentList ? (
          commentList.map((comment) => {
            if (!comment.responseTo) {
              return (
                <SingleComment
                  key={comment._id}
                  commentList={commentList}
                  comment={comment}
                  user={user}
                />
              );
            }
          })
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </ul>
      {user.userData?.isAuth && (
        <form onSubmit={handleSumbitComment}>
          <input
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button type="submit">저장</button>
        </form>
      )}
    </section>
  );
};

export default ProductComments;
