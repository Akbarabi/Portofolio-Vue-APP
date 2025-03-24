import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/forgot-password"];
  const loggedUser = localStorage.getItem("user");

  const authRequired = to.matched.some((route) => route.meta.authRequired);

  // Redirect if routes not need auth
  if (!authRequired) return next();

  // Check if user logged and routes needed auth
  if (authRequired && !loggedUser) return next({ name: "login" });

  next();
});

router.beforeResolve((to, from, next) => {
  document.title = to.meta.title ?? "Portofolio";

  next();
});

export default router;
