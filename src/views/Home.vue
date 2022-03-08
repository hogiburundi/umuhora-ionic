<template>
  <ion-page>
    <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="vente" href="/vente">
          <ion-icon :src="getIcon('calendar')"></ion-icon>
          <ion-label>Vente</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="stock" href="/stock">
          <ion-icon :src="getIcon('personCircle')"></ion-icon>
          <ion-label>Stock</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="stats" href="/stats">
          <ion-icon :src="getIcon('personCircle')"></ion-icon>
          <ion-label>Statistiques</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import Stats from "./Stats"
import Stock from "./Stock"
import Vente from "./Vente"
export default {
  components:{Stats, Stock, Vente}
}
</script>
