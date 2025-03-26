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

        <div class="overflow-x-auto">
            <table class="min-w-full text-gray-300 border border-gray-800 rounded-xl overflow-hidden bg-gray-800">
                <!-- Header -->
                <thead class="bg-gray-700 text-indigo-400">
                    <tr class="border-gray-700 border-b">
                        <th class="py-3 px-6 text-left">Image</th>
                        <th class="py-3 px-6 text-left">Title</th>
                        <th class="py-3 px-6 text-left">Category</th>
                        <th class="py-3 px-6 text-left">Views</th>
                        <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>

                <!-- Body -->
                <tbody>
                    <tr v-if="posts.length === 0">
                        <td colspan="6" class="text-center p-5">Data not found</td>
                    </tr>
                    <tr v-for="(post, index) in posts" :key="index"
                        :class="index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'">
                        <td class="py-3 px-6">
                            <img :src="post.photo_url" class="object-cover h-16 w-24 rounded-lg" />
                        </td>
                        <td class="py-3 px-6">{{ post.title }}</td>
                        <td class="py-3 px-6">{{ post.category_name }}</td>
                        <td class="py-3 px-6">{{ post.view_count }}</td>
                        <td class="py-3 px-6 text-center">
                            <button @click="editPost(post.id)"
                                class="text-yellow-400 hover:text-yellow-500 font-medium text-xs px-4 py-2 rounded-lg shadow-sm mr-2">
                                Edit
                            </button>
                            <button
                                class="text-red-400 hover:text-red-500 font-medium text-xs px-4 py-2 rounded-lg shadow-sm">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Layouts>
</template>


<script setup>
import Layouts from "@/layouts/main.vue";
import { useRouter } from "vue-router";
import { usePostStore } from "@/stores/pinia";
import { ref, onMounted } from "vue";

const router = useRouter();
const postStore = usePostStore();
const posts = ref([]);

const getPosts = async () => {
    await postStore.getPosts();
    posts.value = postStore.posts;
};

const createPost = async () => {
    postStore.openForm("create");
    router.push({ name: "post-form" });
};

const editPost = async (id) => {
    postStore.openForm("edit");
    await postStore.getPostById(id);
    router.push({ name: "post-form" });
};

onMounted(async () => {
    await getPosts();
});
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
