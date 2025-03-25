<template>
  <Layouts>
    <div class="flex sm:flex-row justify-between mb-4">
      <router-link to="/trashed"
        class="bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-500 font-medium text-xs px-4 py-2 rounded-lg shadow-sm text-center"
        type="button">
        Deleted post
      </router-link>
      <button @click="createPost"
        class="bg-green-900/30 hover:bg-green-900/50 text-yellow-400 hover:text-yellow-500 font-medium text-xs px-4 py-2 rounded-lg shadow-sm"
        type="button">
        Create post
      </button>
    </div>
  </Layouts>
</template>

<script setup>
import Layouts from "@/layouts/main.vue";
import { useRouter } from 'vue-router';
import { usePostStore } from '@/stores/pinia';

const router = useRouter();
const postStore = usePostStore();


const createPost = async () => {
  postStore.openForm('create');
  router.push({ name: "post-form" });
}

const editPost = async (id) => {
  postStore.openForm('edit');
  await postStore.getPostById(id);
  router.push({ name: "post-form" });
}
</script>

<style scoped>
/* Perbaikan toolbar Quill */
.ql-toolbar {
  background-color: #4a5568;
  /* Warna lebih cerah */
  border-radius: 12px 12px 0 0;
  border: none;
  padding: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.ql-editor {
  height: 150px;
  min-height: 150px;
  overflow-y: visible;
  background-color: #1a202c;
  color: white;
  padding: 10px;
  border-radius: 0 0 12px 12px;
}
</style>
