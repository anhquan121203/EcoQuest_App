import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById, listBlog } from "../feartures/blog/blogSlice";

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

  // console.log(fetchAttractions)

  
  return {
    blogs,
    selectedBlog,
    loading,
    error,
    fetchBlogs ,
    blogById
  };
};

export default useBlog;
