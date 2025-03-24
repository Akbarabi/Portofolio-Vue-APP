<template>
  <Layouts>
    <div class="flex flex-col sm:flex-row justify-between mb-4">
      <router-link to="/trashed"
        class="mb-2 sm:mb-0 bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-500 font-medium text-xs px-4 py-2 rounded-lg shadow-sm text-center"
        type="button">
        Deleted post
      </router-link>
      <button
        class="bg-green-900/30 hover:bg-green-900/50 text-yellow-400 hover:text-yellow-500 font-medium text-xs px-4 py-2 rounded-lg shadow-sm"
        type="button">
        Create post
      </button>
    </div>
  </Layouts>
</template>

<script setup>
import Layouts from '@/layouts/main.vue';
</script>
