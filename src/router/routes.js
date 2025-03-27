export default [
    {
    path: "/testing",
    name: "testing",
    meta: {
      title: "Testing",
    },
    component: () => import("../views/testing/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login",
    },
    component: () => import("../views/auth/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "Register",
    },
    component: () => import("../views/auth/register.vue"),
  },
  {
    path: "/",
    name: "dashboard",
    component: () => import("../views/dashboard/index.vue"),
    meta: {
      title: "Dashboard",
      authRequired: false,
    },
  },
  {
    path: "/posts",
    name: "posts",
    component: () => import("../views/post/index.vue"),
    meta: {
      title: "Posts",
      authRequired: false,
    },
  },
  {
    path: "/posts/form",
    name: "post-form",
    component: () => import("../views/post/form.vue"),
    meta: {
      title: "Create Post",
      authRequired: false,
    },
  }
];
