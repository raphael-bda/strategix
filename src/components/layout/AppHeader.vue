<template>
  <header class="bg-gray-800 shadow-md p-4 flex justify-between items-center flex-wrap gap-4">
    <div class="flex items-center gap-3">
      <span class="text-white font-semibold">Período:</span>
      <select class="input-field !w-auto" :value="store.state.periodo.ano">
        <option>2025</option>
        <option>2024</option>
      </select>
      <select class="input-field !w-auto" :value="store.state.periodo.mes" @change="handleMesChange">
        <option value="todos">Ano Inteiro</option>
        <option v-for="mes in meses" :key="mes.key" :value="mes.key">{{ mes.label }}</option>
      </select>
    </div>
    
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-end">
        <button @click="triggerImport" class="btn btn-secondary text-sm">Importar Backup (JSON)</button>
        <input type="file" ref="fileInput" @change="handleImport" class="hidden" accept=".json">
      </div>
      
      <div class="flex flex-col items-end">
        <button @click="store.exportarDadosCSV" class="btn text-sm">Exportar para CSV</button>
        <a href="#" @click.prevent="store.exportarDadosJSON" class="text-xs text-gray-500 hover:text-primary-green mt-1">
          Backup Completo (JSON)
        </a>
      </div>

      <div class="w-10 h-10 bg-neutral-purple rounded-full ml-4"></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';

const store = useDashboardStore();
const fileInput = ref<HTMLInputElement | null>(null);

const meses = [
    { key: 'janeiro', label: 'Janeiro' }, { key: 'fevereiro', label: 'Fevereiro' },
    { key: 'marco', label: 'Março' }, { key: 'abril', label: 'Abril' },
    { key: 'maio', label: 'Maio' }, { key: 'junho', label: 'Junho' },
    { key: 'julho', label: 'Julho' }, { key: 'agosto', label: 'Agosto' },
    { key: 'setembro', label: 'Setembro' }, { key: 'outubro', label: 'Outubro' },
    { key: 'novembro', label: 'Novembro' }, { key: 'dezembro', label: 'Dezembro' }
];

function handleMesChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  store.setMes(target.value);
}

function triggerImport() {
  fileInput.value?.click();
}

function handleImport(event: Event) {
  store.importarDadosJSON(event);
}
</script>

<style scoped>
.input-field.\!w-auto {
  width: auto;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>