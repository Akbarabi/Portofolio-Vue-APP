<template>
  <NavBar></NavBar>

  <Loader v-if="isLoading"></Loader>
  <div v-else class="bg-gray-900/95 lg:ml-64 p-4 md:p-6 lg:p-6 min-h-screen">
    <slot></slot>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar.vue';
import Loader from '@/components/widgets/loader.vue';

export default {
  components: {
    NavBar,
    Loader
  },

  data() {
    return {
      isLoading: false
    }
  },

  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
</script>
