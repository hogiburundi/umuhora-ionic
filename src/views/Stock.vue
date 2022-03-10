<template>
  <ion-page>
    <div>Stock Tab</div>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="vente" href="/home/vente">
        <ion-icon :src="getIcon('cartOutline')"></ion-icon>
        <ion-label>Vente</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="stock" href="/home/stock">
        <ion-icon :src="getIcon('basketOutline')"></ion-icon>
        <ion-label>Stock</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="stats" href="/home/stats">
        <ion-icon :src="getIcon('statsChart')"></ion-icon>
        <ion-label>Statistiques</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-page>
</template>
<script>
</script>