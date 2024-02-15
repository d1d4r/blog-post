import { defineStore } from "pinia";
import { reactive } from "vue";
import Post from "@/service/firestore/Post.js";

export const useBlogPostStore = defineStore("blogPost", () => {
  const post = new Post();
  const blogPostState = reactive({
    posts: [],
    post: {},
    loading: false,
    error: null,
  });
  const fetchPosts = async () => {
    try {
      blogPostState.loading = true;
      blogPostState.error = null;
      blogPostState.posts = await post.getAll();
    } catch (error) {
      blogPostState.error = error;
    } finally {
      blogPostState.loading = false;
    }
  };

  const getById = async (id) => {
    blogPostState.loading = true;
    blogPostState.error = null;
    blogPostState.post = await post.get(id);
    blogPostState.loading = false;
  };

//   const filterPost = (id) => {
//     return blogPostState.posts.filter((post) => post.id === id);
//   };

  return {
    blogPostState,
    fetchPosts,
    getById,
  };
});
