import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, listCommentByBlog } from "../feartures/comment/commentSlice";

const useComment = () => {
  const { comments, selectedComment, loading, error } = useSelector(
    (state) => state.comment
  );
  const dispatch = useDispatch();

  const commentByBlog = async (id) => {
    dispatch(listCommentByBlog(id));
  };

  const addNewComment = async (commentData) => {
    try {
      const resultAction = await dispatch(createComment(commentData));
      const data = await resultAction.payload;
      await commentByBlog(commentData.BlogId); 
      return { success: true, data };
    } catch (error) {
      console.error("addNewComment error:", error);
      return { success: false, error };
    }
  };
  

  return {
    comments,
    selectedComment,
    loading,
    error,
    commentByBlog,
    addNewComment,
  };
};

export default useComment;
