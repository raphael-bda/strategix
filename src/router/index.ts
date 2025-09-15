// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'visao-geral',
      component: DashboardView
    },
    {
      path: '/mes-atual',
      name: 'mes-atual',
      component: () => import('@/views/MesAtualView.vue')
    },
    {
      path: '/campanhas',
      name: 'campanhas',
      component: () => import('@/views/CampanhasView.vue')
    },
    {
      path: '/faturamento',
      name: 'faturamento',
      component: () => import('@/views/FaturamentoView.vue')
    },
    {
      path: '/inscricoes',
      name: 'inscricoes',
      component: () => import('@/views/InscricoesView.vue')
    },
    {
      path: '/inadimplencia',
      name: 'inadimplencia',
      component: () => import('@/views/InadimplenciaView.vue')
    },
    {
      path: '/recuperacao',
      name: 'recuperacao',
      component: () => import('@/views/RecuperacaoView.vue')
    }
  ]
})

export default router