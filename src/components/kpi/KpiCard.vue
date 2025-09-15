<template>
  <div 
    @click="$emit('edit', kpi.id)"
    class="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-primary-green/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
  >
    <div class="flex justify-between items-start">
      <h3 class="text-sm font-semibold text-gray-400 uppercase">{{ kpi.title }}</h3>
      <div 
        class="text-xs font-bold px-2 py-1 rounded-full"
        :class="kpi.trend >= 0 ? 'bg-primary-green/20 text-primary-green' : 'bg-critical-red/20 text-critical-red'"
      >
        {{ kpi.trend >= 0 ? '↑' : '↓' }} {{ Math.abs(kpi.trend) }}%
      </div>
    </div>
    <p class="mt-2 text-3xl font-bold text-white">
      {{ formattedValue }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Kpi } from '@/types'
import { formatCurrency, formatPercentage } from '@/utils/formatters'

const props = defineProps<{
  kpi: Kpi
}>()

defineEmits(['edit']) // Declaramos o evento que será emitido

const formattedValue = computed(() => {
  if (props.kpi.isCurrency) {
    return formatCurrency(props.kpi.value)
  }
  if (props.kpi.isPercentage) {
    return formatPercentage(props.kpi.value)
  }
  return props.kpi.value.toString()
})
</script>