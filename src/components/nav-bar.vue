<template>
  <!-- Mobile Toggle Button -->
  <button id="mobile-toggle" @click="toggleSidebar"
    class="md:hidden fixed bottom-4 left-4 z-50 p-2 bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:bg-gray-700 transition">
    <i class="fas fa-bars text-gray-400"></i>
  </button>

  <!-- Sidebar -->
  <nav id="sidebar"
    class="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-gray-300 border-r border-gray-800 z-50 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col">

    <!-- Logo Section -->
    <div class="flex items-center h-16 px-6 border-b border-gray-800 bg-gray-800">
      <router-link to="/" class="text-lg font-semibold cursor-pointer flex-1">
        <span class="text-indigo-400">{{ appName }}</span>
        <span class="text-xs font-medium text-gray-500 ml-2">Admin Panel</span>
      </router-link>
      <!-- Close Button for Mobile -->
      <button id="close-sidebar" class="md:hidden p-2 text-gray-400 hover:text-gray-200" @click="closeSidebar">
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
    </div>

    <!-- Content Wrapper (Prevents Scroll Issue) -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Navigation Menu (Scrollable) -->
      <div class="flex-1 overflow-y-auto p-4 space-y-1">
        <router-link to="/"
          :class="`flex w-full items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer
                      ${currentRoute === '/' ? 'bg-indigo-900/30 text-indigo-400' : 'hover:bg-gray-800 text-gray-400'}`">
          <i class="fas fa-table-cells w-5 text-center"></i>
          <span class="text-sm font-medium">Dashboard</span>
        </router-link>

        <div class="pt-4">
          <h4 class="px-3 text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Data Management
          </h4>
          <router-link to="/posts"
            :class="`flex w-full items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer
                          ${currentRoute === '/posts' ? 'bg-indigo-900/30 text-indigo-400' : 'hover:bg-gray-800 text-gray-400'}`">
            <i class="fas fa-newspaper w-5 text-center"></i>
            <span class="text-sm font-medium">Posts</span>
            <span class="ml-auto text-xs bg-indigo-900/30 text-indigo-400 px-2 py-1 rounded-full">45</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isMobile = ref(false);
const currentRoute = ref(router.currentRoute.value.path);
const appName = ref(import.meta.env.VITE_APP_NAME || 'Admin');

const checkMobile = () => {
  if (window.innerWidth < 768) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
  }
}

const toggleSidebar = () => {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.add('translate-x-0');
  sidebar.classList.remove('-translate-x-full');
}

const closeSidebar = () => {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('translate-x-0');
  sidebar.classList.add('-translate-x-full');
}

onMounted(() => {
  checkMobile();
})
</script>

<style scoped></style>
