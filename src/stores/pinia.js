import { createPinia } from "pinia";

import { useAuthStore } from "./pinia/auth";

const pinia = createPinia();
export default pinia;

export { useAuthStore };
