<template>
  <NavBar></NavBar>

  <div class="bg-gray-900/95 lg:ml-64 p-4 md:p-6 min-h-screen">
    <slot></slot>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar.vue';

export default {
  components: {
    NavBar
  }
}
</script>
