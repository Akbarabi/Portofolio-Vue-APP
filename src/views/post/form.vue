<template>
  <Loader v-if="isLoading"></Loader>

  <div v-else class="p-6 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <button
        class="text-sm text-blue-500 hover:text-blue-700 font-medium text-center px-4 py-2 rounded-md cursor-pointer"
        @click="$router.back()">
        <i class="fas fa-arrow-left mr-2"></i> Back
      </button>
      <button
        class="text-sm bg-blue-600 text-white hover:bg-blue-700 font-medium text-center px-4 py-2 rounded-md cursor-pointer">
        <i class="fas fa-save mr-2"></i> Save
      </button>
    </div>
    <hr class="border-gray-700 mb-4" />

    <!-- Grid Layout -->
    <form class="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      <!-- Bagian Kiri: Semua Input -->
      <div class="space-y-4">
        <div>
          <label for="title" class="block mb-2 text-sm font-medium text-white">Title</label>
          <input type="text" name="title" id="title"
            class="bg-gray-900 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="What's your post title?" required>
        </div>

        <div>
          <label for="category_name" class="block mb-2 text-sm font-medium text-white">Category</label>
          <input type="text" name="category_name" id="category_name"
            class="bg-gray-900 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Enter category name" required>
        </div>
      </div>

      <!-- Bagian Kanan: Preview Gambar dengan Tombol Hapus -->
      <div>
        <label class="text-sm text-slate-800 font-bold mb-2">Foto</label>
        <ImageCropper :imageUrl="imageUrl" :aspectRatio="16 / 9" @update:imageUrl="imageUrl = $event"
          @update:croppedImageUrl="croppedImageUrl = $event; formModel.photo = $event;" />
        {{ formModel.photo }}
      </div>
    </form>

    <!-- Quill Editor di Bawah Semua Input -->
    <div class="mt-6">
      <label for="body" class="block mb-2 text-sm font-medium text-white">Body</label>
      <QuillEditor contentType="html" v-model:content="formModel.body" :options="quillSettings.editorOption" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import ImageCropper from "@/components/widgets/cropper";
import Loader from "@/components/widgets/loader.vue";

const isLoading = ref(false);
const imageUrl = ref("");
const croppedImageUrl = ref("");
const formModel = reactive({
  photo: "",
  title: "",
  category_name: "",
  body: "",
});

const quillSettings = {
  editorOption: {
    theme: "snow",
    placeholder: "Start writing here...",
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ font: [] }],
        ['clean'],
        ['link', 'image']
      ],
    }
  }
}

const handleScroll = () => {
  const toolbar = document.querySelector('.ql-toolbar');
  if (toolbar) {
    const scrollTop = window.scrollY;
    if (scrollTop > 100) {
      toolbar.classList.add('sticky');
    } else {
      toolbar.classList.remove('sticky');
    }
  }
};

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 1000)
  window.addEventListener('scroll', handleScroll);
})

onUnmounted(() => {
  window.addEventListener('scroll', handleScroll);
})
</script>

<style scoped>
::placeholder {
  color: #9ca3af;
}

:deep(.ql-toolbar) {
  background: #1e293b;
  /* Warna gelap sesuai dengan tema */
  border-radius: 8px 8px 0 0;
  border: 1px solid #374151;
  /* Border yang lebih halus */
  padding: 8px;
}

:deep(.ql-toolbar.sticky) {
  position: sticky;
  top: 0;
  z-index: 1000;
  border-radius: 0;
}

:deep(.ql-container) {
  background: #111827;
  /* Sesuai dengan tema */
  color: #f9fafb;
  /* Warna teks putih */
  border: 1px solid #374151;
  min-height: 250px;
  font-size: 16px;
  line-height: 1.6;
  border-radius: 0 0 8px 8px;
  padding-top: 10px;
}

/* Placeholder Style */
:deep(.ql-editor.ql-blank::before) {
  color: #9ca3af;
  /* Warna abu-abu terang */
  font-style: italic;
}

/* Style toolbar buttons */
:deep(.ql-toolbar button) {
  margin: 0 5px;
  padding: 4px;
  border-radius: 4px;
  color: #d1d5db;
  transition: background-color 0.2s ease-in-out;
}

:deep(.ql-toolbar button:hover) {
  background-color: #374151;
  /* Hover efek lebih halus */
}

/* Dropdown umum */
:deep(.ql-picker) {
  color: #d1d5db;
  /* Warna teks */
}

/* Opsi dropdown (background dan border) */
:deep(.ql-picker-options) {
  background: #1e293b;
  /* Latar belakang dropdown */
  border: none;
  /* Hapus border */
  padding: 4px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  /* Shadow lebih halus */
}

/* Warna teks dalam dropdown */
:deep(.ql-picker-item) {
  color: #f9fafb;
  padding: 6px 12px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

/* Hover efek lebih halus (tanpa border atau rounded) */
:deep(.ql-picker-item:hover) {
  background: #111827;
  /* Warna hover lebih soft */
  color: #a5c7ff;
  /* Biru terang */
}

/* Selected item dengan rounded */
:deep(.ql-active .ql-picker-label),
:deep(.ql-active .ql-picker-item) {
  color: #cbd5e1;
  /* Warna lebih soft */
  background: #2d3b50;
  border-radius: 6px;
  /* Rounded hanya untuk selected */
}

/* Hover efek lebih smooth untuk dropdown */
:deep(.ql-toolbar .ql-picker-label:hover) {
  background: #374151;
  color: #a5c7ff;
}
</style>
