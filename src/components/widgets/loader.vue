<template>
  <div class="fixed inset-0 bg-slate-950/80 flex justify-center items-center z-[9999]">
    <div class="loader"></div>
  </div>
</template>

<script>
  export default {
    name: "Loader",
  }
</script>

<style lang="scss" scoped>
.loader {
  display: inline-block;
  width: 64px;
  height: 64px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.loader:after {
  content: " ";
  display: block;
  width: 40px;
  height: 40px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #2e2e2e transparent #2e2e2e transparent;
  animation: loader 0.7s linear infinite;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
