// src/stores/authStore.js
import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    apiUrl: process.env.VITE_APP_API_URL,
    userLogin: {},
    response: {
      status: null,
      message: null,
      list: null,
    },
  }),
  actions: {
    async register(name, email, password) {
      try {
        const response = await axios.post(`${this.apiUrl}/api/v1/users`, {
          name,
          email,
          password,
        });

        if (response.status === 201) {
          await this.login(email, password);
        }
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },

    async login(email, password) {
      try {
        const response = await axios.post(`${this.apiUrl}/api/v1/auth/login`, {
          email,
          password,
        });
        this.userLogin = response.data.data.user;

        await this.saveToken(response.data.data.access_token);
        await this.saveUser(response.data.data.user);

        if (this.userLogin.user_roles_name === "Super Admin") {
          window.location.href = "/";
        }

        if (this.userLogin.user_roles_name === "Verifier") {
          window.location.href = "/";
        }

        if (this.userLogin.user_roles_name === "Creator") {
          window.location.href = "/";
        }
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.response.data.errors,
          list: error.response.data.errors,
        };
      }
    },

    async refresh() {
      try {
        const response = await axios.post(`${this.apiUrl}/api/v1/auth/refresh`, {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        });

        await this.saveToken(response.data.data.access_token);
        await this.saveUser(response.data.data.user);
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          list: error.response.data.errors,
        };
      }
    },

    async logout() {
      await this.removeToken();
      this.userLogin = {};
    },
    async forgotPassword(data) {
      try {
        const response = await axios.post(
          `${this.apiUrl}/api/v1/forgot-password`,
          data
        );

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
    async saveUserLogin() {
      try {
        const response = await axios.get(`${this.apiUrl}/api/v1/auth/profile`, {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        });
        this.userLogin = response.data.data;
        await this.saveUser(this.userLogin);

      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.erros,
          list: error.response.data.errors,
        };
      }
    },
    async saveToken(token) {
      localStorage.setItem("token", token);
    },
    async saveUser(data) {
      localStorage.setItem("user", JSON.stringify(data));
    },
    async removeToken() {
      localStorage.clear();
    },
    getToken() {
      return localStorage.getItem("token") || "";
    },
  },
});
