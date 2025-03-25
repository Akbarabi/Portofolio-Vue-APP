import { createPinia } from "pinia";

import { useAuthStore } from "./pinia/auth";
import { usePostStore } from "./pinia/post";

const pinia = createPinia();
export default pinia;

export { useAuthStore, usePostStore };
