<template>
    <button
        class="inline-flex items-center font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed focus:outline-none"
        :class="computedClasses" :disabled="disabled" :loading="loading">
        <svg v-if="loading" fill="none" class="animate-spin h-4 w-4 mr-2" viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"
                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z">
            </path>
            <path stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-800"
                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                stroke="currentColor"></path>
        </svg>

        <slot class="mr-2"></slot>
    </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    variant: {
        type: String,
        default: "solid",
        validator: value => {
            ["ghost", "solid", "outline"].includes(value)
        }
    },
    color: {
        type: String,
        default: "primary",
        validator: (value) => {
            ["primary", "secondary", "success", "danger", "error"].includes(value)
        }
    },
    size: {
        type: String,
        default: "md",
        validator: (value) => {
            ["xs", "sm", "md", "lg", "xl"].includes(value)
        }
    },
    rounded: {
        type: String,
        default: "md",
        validator: (value) => {
            ["xs", "sm", "md", "lg", "xl", "2xl", "full"].includes(value)
        }
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const baseColors = {
    primary: {
        bg: 'bg-blue-600',
        text: 'text-white',
        hover: 'hover:bg-blue-700 hover:border-blue-800',
        focus: 'focus:ring-blue-500',
        border: 'border-blue-600'
    },
    secondary: {
        bg: 'bg-gray-600',
        text: 'text-white',
        hover: 'hover:bg-gray-700 hover:border-gray-800',
        focus: 'focus:ring-gray-500',
        border: 'border-gray-600'
    },
    success: {
        bg: 'bg-green-600',
        text: 'text-white',
        hover: 'hover:bg-green-700 hover:border-green-800',
        focus: 'focus:ring-green-500',
        border: 'border-green-600'
    },
    danger: {
        bg: 'bg-red-600',
        text: 'text-white',
        hover: 'hover:bg-red-700 hover:border-red-800',
        focus: 'focus:ring-red-500',
        border: 'border-red-600'
    },
    error: {
        bg: 'bg-orange-600',
        text: 'text-white',
        hover: 'hover:bg-orange-700 hover:border-orange-800',
        focus: 'focus:ring-orange-500',
        border: 'border-orange-600'
    },
}

const computedClasses = computed(() => {
    const baseColor = baseColors[props.color] || baseColors.primary;
    const { bg, text, hover, focus, border } = baseColor;

    const variants = {
        solid: `${bg} ${text} ${hover} ${focus} focus:ring-2 border-2 ${border} hover:border-2`,
        outline: `border-2 ${border} ${text} ${hover} ${focus} focus:ring-2 bg-transparent hover:bg-opacity-10`,
        ghost: `bg-transparent border-transparent ${text} ${hover} ${focus} focus:ring-2 hover:border-2 ${border}`,
    };

    const sizes = {
        xs: 'text-xs px-2 py-1',
        sm: 'text-sm px-3 py-2',
        md: 'text-sm px-4 py-2',
        lg: 'text-base px-4 py-2',
        xl: 'text-base px-6 py-3'
    };

    const rounded = {
        xs: 'rounded-xs',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        full: 'rounded-full'
    };

    return [variants[props.variant], sizes[props.size], rounded[props.rounded]].join(" ");
})
</script>
