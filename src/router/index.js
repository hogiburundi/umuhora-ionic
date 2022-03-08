import Vue from 'vue'
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Stats from '../views/Stats.vue'
import Stock from '../views/Stock.vue'
import Vente from '../views/Vente.vue'

const routes = [
  { path: '/', redirect: '/vente'},
  { path: '/vente', name: 'vente', component: Vente},
  { path: '/stock', name: 'stock', component: Stock},
  { path: '/stats', name: 'stats', component: Stats},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
