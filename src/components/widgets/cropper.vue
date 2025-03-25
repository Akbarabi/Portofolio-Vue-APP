<template>
  <!-- Dropzone -->
  <div v-if="!localImageUrl && !localCroppedImageUrl"
    class="relative group border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-lg transition-all duration-200 overflow-hidden"
    :class="{ 'border-blue-500 bg-blue-500/10': isDragging }" @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false" @drop.prevent="handleFileDrop">
    <input type="file" name="photo" id="photo" @change="onFileChange"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
    <div class="flex flex-col items-center justify-center p-6 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-image text-gray-400 mb-2 group-hover:text-blue-400 transition-colors duration-200">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
      <span class="text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
        Drag and drop an image or click to browse
      </span>
      <span class="text-xs text-gray-500 mt-1">
        Recommended: JPG or PNG
      </span>
    </div>
  </div>

  <!-- Modal Cropper -->
  <Modal ref="cropperModal" size="xl" @close="afterCloseCropperModal">
    <template #title>
      <h1 class="text-xl text-slate-800 font-bold">Crop Image</h1>
    </template>
    <template #body>
      <vue-cropper v-if="tempImageUrl" ref="cropper" :src="tempImageUrl" :aspect-ratio="aspectRatio" :view-mode="1" :auto-crop-area="1"
        :background="false" :guides="false" class="w-full" />
    </template>
    <template #footer>
      <button @click="closeCropperModal"
        class="inline-flex items-center justify-center border border-gray-800 text-gray-800 bg-transparent align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md hover:bg-gray-100">
        Close
      </button>
      <button type="button" @click="cropImage"
        class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700">
        Crop
      </button>
    </template>
  </Modal>

  <!-- Tampilkan Gambar yang Ada -->
  <div v-if="localCroppedImageUrl || localImageUrl"
    class="relative border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-lg p-4 flex justify-center items-center">
    <button @click="clearCroppedImage"
      class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 p-1" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
      </svg>
    </button>
    <img :src="localCroppedImageUrl || localImageUrl" alt="Cropped Image" class="max-w-full rounded" />
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import "cropperjs/dist/cropper.css";
import Modal from './modal.vue';

export default {
  components: {
    VueCropper,
    Modal
  },

  props: {
    imageUrl: String,
    croppedImageUrl: String,
    aspectRatio: { type: Number, default: 1 },
  },

  data() {
    return {
      isDragging: false,
      cropModal: false,
      localImageUrl: null,
      localCroppedImageUrl: null
    }
  },

  watch: {
    imageUrl: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.localImageUrl = newValue
        }
      }
    },
    localImageUrl(newVal) {
      this.$emit("update:imageUrl", newVal);
    },
    localCroppedImageUrl(newVal) {
      this.$emit("update:croppedImageUrl", newVal);
    },
  },

  methods: {
    onDrop(event) {
      this.isDragging = false;
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.onFileChange({ target: { files: [files[0]] } });
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.tempImageUrl = URL.createObjectURL(file);
        this.openCropperModal();
      }
    },

    cropImage() {
      const canvas = this.$refs.cropper.getCroppedCanvas();
      if (canvas) {
        this.localCroppedImageUrl = canvas.toDataURL("image/png");
      }
      this.tempImageUrl = null;
      this.closeCropperModal();
    },
    clearCroppedImage() {
      this.localCroppedImageUrl = null;
      this.localImageUrl = null;
    },
    openCropperModal() {
      this.$refs.cropperModal.openModal();
    },
    closeCropperModal() {
      this.$refs.cropperModal.closeModal();
    },
    afterCloseCropperModal() {
    },
  }
}
</script>
