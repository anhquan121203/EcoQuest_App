import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, getBlogById, listBlog } from "../feartures/blog/blogSlice";

const useBlog = () => {
  const { blogs, selectedBlog, loading, error } = useSelector(
    (state) => state.blog
  );
  const dispatch = useDispatch();

  const fetchBlogs = useCallback(
    () => {
      dispatch(listBlog());
    },
    [dispatch]
  );

  const blogById = async (id) => {
    dispatch(getBlogById(id));
  }

  // create blog
  const addNewBlog = async (blogData) => {
    try {
      const resultAction = await dispatch(createBlog(blogData));
      const data = await resultAction.payload;
      fetchBlogs();
      return { success: true, data };
    } catch (error) {
      console.error("addNewtrip error:", error);
      return { success: false, error };
    }
  };

  
  return {
    blogs,
    selectedBlog,
    loading,
    error,
    fetchBlogs ,
    blogById,
    addNewBlog
  };
};

export default useBlog;
