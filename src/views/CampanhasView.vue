<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-semibold text-white">Gestão de Campanhas</h1>
      <button @click="abrirModal()" class="btn">Nova Campanha</button>
    </div>
    <div class="content-grid grid-2 mt-8">
      <BaseCard title="Campanhas Ativas">
        <div class="campaign-list" v-auto-animate>
          <div v-if="!campanhasAtivas.length" class="no-data">Nenhuma campanha ativa</div>
          <div v-for="campanha in campanhasAtivas" :key="campanha.id" class="campaign-item">
            <div class="campaign-header">
              <span class="campaign-name">{{ campanha.nome }}</span>
              <p><strong>Matrículas:</strong> {{ campanha.matriculas }}</p>
            </div>
            <div class="campaign-actions">
              <button @click="abrirModal(campanha)" class="btn-icon edit" title="Editar">✏️</button>
              <button @click="store.excluirCampanha(campanha.id)" class="btn-icon delete" title="Excluir">✕</button>
            </div>
          </div>
        </div>
      </BaseCard>
      <BaseCard title="Campanhas Concluídas">
        <div class="campaign-list" v-auto-animate>
           <div v-if="!campanhasConcluidas.length" class="no-data">Nenhuma campanha concluída</div>
           <div v-for="campanha in campanhasConcluidas" :key="campanha.id" class="campaign-item">
             <div class="campaign-header">
               <span class="campaign-name">{{ campanha.nome }}</span>
               <p><strong>Matrículas:</strong> {{ campanha.matriculas }}</p>
             </div>
             <div class="campaign-actions">
               <button @click="abrirModal(campanha)" class="btn-icon edit" title="Editar">✏️</button>
               <button @click="store.excluirCampanha(campanha.id)" class="btn-icon delete" title="Excluir">✕</button>
             </div>
           </div>
        </div>
      </BaseCard>
    </div>
    <BaseModal :show="isModalOpen" :title="modalTitle" @close="fecharModal">
      <form @submit.prevent="handleSalvarCampanha" class="space-y-4">
        <div class="input-group">
          <label class="input-label">Nome da Campanha</label>
          <input type="text" class="input-field" v-model="campanhaEditavel.nome" required>
        </div>
        <div class="input-group">
          <label class="input-label">Matrículas</label>
          <input type="number" class="input-field" v-model.number="campanhaEditavel.matriculas" required>
        </div>
        <div class="input-group">
          <label class="input-label">Status</label>
          <select class="input-field" v-model="campanhaEditavel.status">
            <option value="ativas">Ativa</option>
            <option value="concluidas">Concluída</option>
          </select>
        </div>
         <div class="flex justify-end pt-4">
            <button type="button" @click="fecharModal" class="btn btn-secondary mr-2">Cancelar</button>
            <button type="submit" class="btn">Salvar</button>
         </div>
      </form>
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import type { Campanha } from '@/types';
import { vAutoAnimate } from '@formkit/auto-animate';

const store = useDashboardStore();
const campanhasAtivas = computed(() => store.campanhasAtivas || []);
const campanhasConcluidas = computed(() => store.campanhasConcluidas || []);
const isModalOpen = ref(false);
const novaCampanhaDefault: Campanha = { id: 0, nome: '', matriculas: 0, status: 'ativas', dataInicio: '', dataTermino: '' };
const campanhaEditavel = ref<Campanha>({ ...novaCampanhaDefault });
const modalTitle = computed(() => campanhaEditavel.value.id ? 'Editar Campanha' : 'Nova Campanha');
function abrirModal(campanha?: Campanha) {
  campanhaEditavel.value = campanha ? { ...campanha } : { ...novaCampanhaDefault };
  isModalOpen.value = true;
}
function fecharModal() { isModalOpen.value = false; }
function handleSalvarCampanha() {
  store.salvarCampanha(campanhaEditavel.value);
  fecharModal();
}
</script>
<style scoped>
.campaign-list { max-height: 300px; overflow-y: auto; padding-right: 8px; }
.campaign-item { background: rgba(15, 23, 42, 0.8); padding: 12px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
.campaign-header { display: flex; flex-direction: column; align-items: flex-start; }
.campaign-name { font-weight: 600; }
.campaign-actions { display: flex; gap: 8px; flex-shrink: 0; margin-left: 16px; }
.btn-icon { background: #374151; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: pointer; border: none; color: white; }
.btn-icon.edit:hover { background: #3B82F6; }
.btn-icon.delete:hover { background: #EF4444; }
.no-data { text-align: center; color: #64748b; padding: 20px; }
</style>