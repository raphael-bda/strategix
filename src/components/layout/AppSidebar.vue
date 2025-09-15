<template>
  <aside class="w-64 flex-shrink-0 bg-gray-800/80 backdrop-blur-sm p-4 flex flex-col border-r border-gray-700/50">
    <div class="text-white text-3xl font-bold mb-10 text-center text-primary-green">
      Strategix
    </div>
    
    <nav class="flex-1 space-y-2">
      <RouterLink v-for="link in navigationLinks" :key="link.name" :to="link.path"
        class="flex items-center p-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
        active-class="bg-primary-green/20 text-white"
      >
        <component :is="link.icon" class="w-5 h-5 mr-4" />
        <span>{{ link.name }}</span>
      </RouterLink>
    </nav>

    <div class="mt-auto">
      <p class="text-sm text-gray-500 text-center">&copy; 2025 Strategix Corp.</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { LayoutDashboard, Calendar, Megaphone, DollarSign, Users, TrendingDown, Repeat } from 'lucide-vue-next';

const navigationLinks = [
  { name: 'Visão Geral', path: '/', icon: LayoutDashboard },
  { name: 'Mês Atual', path: '/mes-atual', icon: Calendar },
  { name: 'Campanhas', path: '/campanhas', icon: Megaphone },
  { name: 'Faturamento', path: '/faturamento', icon: DollarSign },
  { name: 'Inscrições', path: '/inscricoes', icon: Users },
  { name: 'Inadimplência', path: '/inadimplencia', icon: TrendingDown },
  { name: 'Recuperação', path: '/recuperacao', icon: Repeat },
];
</script>