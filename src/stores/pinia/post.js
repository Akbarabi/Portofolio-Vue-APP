import axios from "axios";
import { defineStore } from "pinia";

export const usePostStore = defineStore("post", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_API_URL,
    post: {},
    posts: [],
    totalData: 0,
    response: {
      status: null,
      message: null,
      list: null,
    },
    formAction: {
      action: "",
      form_title: "",
      form_button: "",
    },
    current: 1,
    perpage: 25,
    searchQuery: "",
  }),

  actions: {
    async openForm(action) {
      this.formAction.action = action;
    },
    async getPosts() {
      try {
        const response = await axios.get(`${this.apiUrl}/api/v1/posts`);

        this.posts = response.data.data.list;
        this.totalData = response.data.data.total;

        this.response = {
          status: response.status,
          message: response.data.message,
        };
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          list: error.response?.data.errors,
        };
      }
    },

    async getPostsById() {
      try {
        const response = await axios.get(`${this.apiUrl}/api/v1/posts`);

        this.post = response.data.data.data;

        this.response = {
          status: response.status,
          message: response.data.message,
        };
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          list: error.response.data.errors,
        };
      }
    },
  },
});
