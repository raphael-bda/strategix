<template>
  <div class="relative bg-gray-900 font-sans h-screen w-full overflow-hidden">
    <div class="aurora-container">
      <div class="aurora-blob a"></div>
      <div class="aurora-blob b"></div>
      <div class="aurora-blob c"></div>
    </div>

    <div class="relative z-10 flex h-full">
      <AppSidebar />
      <div class="flex-1 flex flex-col overflow-hidden">
        <AppHeader />
        <main class="flex-1 overflow-x-hidden overflow-y-auto">
          <div class="px-6 py-8 lg:px-10">
            <RouterView />
          </div>
        </main>
      </div>
    </div>
    
    <Toaster rich-colors position="top-right" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { Toaster } from 'vue-sonner'
</script>

<style>
.aurora-container {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
.aurora-blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(48px);
  opacity: 0.3;
  animation: animate 15s infinite alternate;
}
.aurora-blob.a {
  width: 24rem;
  height: 24rem;
  background-color: var(--color-primary-green, #22c55e);
  top: -10%;
  left: -10%;
  animation-duration: 20s;
}
.aurora-blob.b {
  width: 20rem;
  height: 20rem;
  background-color: var(--color-neutral-purple, #a78bfa);
  bottom: -5%;
  right: -5%;
  animation-duration: 25s;
}
.aurora-blob.c {
  width: 18rem;
  height: 18rem;
  background-color: var(--color-info-blue, #3b82f6);
  bottom: 20%;
  left: 20%;
  animation-duration: 18s;
}

@keyframes animate {
  from {
    transform: rotate(0deg) scale(1) translateX(0px);
  }
  to {
    transform: rotate(360deg) scale(1.2) translateX(20px);
  }
}
</style>