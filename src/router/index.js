import Vue from 'vue'
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Stats from '../views/Stats.vue'
import Stock from '../views/Stock.vue'
import Vente from '../views/Vente.vue'
import Commande from '../views/Commande.vue'

const routes = [
  { path: '/', redirect: 'home' },
  {
    path:"/home/", 
    component: Home,
    children: [
      {path: "", redirect: "/home/vente"},
      { path: "vente", component: Vente},
      { path: "stock", component: Stock},
      { path: "stats", component: Stats}
    ]
  },
  { path: '/commande', name: 'commande', component: Commande},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
