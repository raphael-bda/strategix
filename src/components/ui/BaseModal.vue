<template>
  <div v-if="show" @click.self="close" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
    <div class="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-95" :class="{ 'scale-100': show }">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-semibold text-white">{{ title }}</h3>
        <button @click="close" class="text-gray-400 hover:text-white">&times;</button>
      </div>
      <div>
        <slot></slot> </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  title: string;
}>();

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>