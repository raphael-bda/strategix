<template>
  <div class="card">
    <h3 v-if="title" class="card-title">
      {{ title }}
    </h3>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>