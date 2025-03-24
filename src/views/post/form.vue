<template>
  <div class="p-6">
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
    <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Bagian Kiri: Semua Input -->
      <div class="space-y-4">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-300">Featured Image</label>
          <div
            class="relative group border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-lg transition-all duration-200 overflow-hidden"
            :class="{ 'border-blue-500 bg-blue-500/10': isDragging }" @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false" @drop.prevent="handleFileDrop">
            <input type="file" name="photo" id="photo" @change="previewImage"
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
        </div>

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
      <div
        class="relative w-full h-64 md:h-full border border-gray-600 bg-gray-900 rounded-lg flex items-center justify-center">
        <template v-if="imagePreview">
          <img :src="imagePreview" alt="Preview"
            class="w-full h-full object-cover rounded-lg border border-gray-600 shadow-md">
          <button @click="removeImage"
            class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg shadow-md">
            ✕
          </button>
        </template>
        <span v-else class="text-gray-500">No Image Selected</span>
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

const isDragging = ref(false);
const imagePreview = ref(null);
const formModel = reactive({
  photo: "",
  title: "",
  category_name: "",
  body: "",
});

const handleFileDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    formModel.photo = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};


const previewImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    imagePreview.value = URL.createObjectURL(file);
  }
};

const removeImage = () => {
  imagePreview.value = null;
  document.getElementById("photo").value = ""; // Reset input file
};

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
    background: #1e293b; /* Warna gelap sesuai dengan tema */
    border-radius: 8px 8px 0 0;
    border: 1px solid #374151; /* Border yang lebih halus */
    padding: 8px;
}

:deep(.ql-toolbar.sticky) {
    position: sticky;
    top: 0;
    z-index: 1000;
    border-radius: 0;
}

:deep(.ql-container) {
    background: #111827; /* Sesuai dengan tema */
    color: #f9fafb; /* Warna teks putih */
    border: 1px solid #374151;
    min-height: 250px;
    font-size: 16px;
    line-height: 1.6;
    border-radius: 0 0 8px 8px;
    padding-top: 10px;
}

/* Placeholder Style */
:deep(.ql-editor.ql-blank::before) {
    color: #9ca3af; /* Warna abu-abu terang */
    font-style: italic;
}

/* Style toolbar buttons */
:deep(.ql-toolbar button) {
    margin: 0 5px;
    padding: 4px;
    border-radius: 4px;
    color: #d1d5db; /* Warna icon lebih soft */
    transition: background-color 0.2s ease-in-out;
}

:deep(.ql-toolbar button:hover) {
    background-color: #374151; /* Hover efek lebih halus */
}

/* Dropdown umum */
:deep(.ql-picker) {
    color: #d1d5db; /* Warna teks */
}

/* Opsi dropdown (background dan border) */
:deep(.ql-picker-options) {
    background: #1e293b; /* Latar belakang dropdown */
    border: none; /* Hapus border */
    padding: 4px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* Shadow lebih halus */
}

/* Warna teks dalam dropdown */
:deep(.ql-picker-item) {
    color: #f9fafb;
    padding: 6px 12px;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

/* Hover efek lebih halus (tanpa border atau rounded) */
:deep(.ql-picker-item:hover) {
    background: #111827; /* Warna hover lebih soft */
    color: #a5c7ff; /* Biru terang */
}

/* Selected item dengan rounded */
:deep(.ql-active .ql-picker-label),
:deep(.ql-active .ql-picker-item) {
    color: #cbd5e1; /* Warna lebih soft */
    background: #2d3b50;
    border-radius: 6px; /* Rounded hanya untuk selected */
}

/* Hover efek lebih smooth untuk dropdown */
:deep(.ql-toolbar .ql-picker-label:hover) {
    background: #374151;
    color: #a5c7ff;
}

</style>
