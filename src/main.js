import './assets/main.css'

import { createApp } from 'vue'
import pinia from './stores/pinia'

import App from './App.vue'
import router from './router'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

app.use(pinia)
app.use(router)
app.component('QuillEditor', QuillEditor)
app.component(VueCropper)

import { axiosInterceptors } from './core/interceptor/axios-interceptor'
axiosInterceptors();

app.mount('#app')
