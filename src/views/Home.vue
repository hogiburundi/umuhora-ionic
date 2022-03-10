<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>URUFATANAMENDE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-router-outlet/>
          <ion-tab-bar slot="bottom">
            <ion-tab-button tab="vente" href="/home/vente">
              <ion-icon :src="getIcon('calendar')"></ion-icon>
              <ion-label>Vente</ion-label>
            </ion-tab-button>
            <ion-tab-button tab="stock" href="/home/stock">
              <ion-icon :src="getIcon('personCircle')"></ion-icon>
              <ion-label>Stock</ion-label>
            </ion-tab-button>
            <ion-tab-button tab="stats" href="/home/stats">
              <ion-icon :src="getIcon('personCircle')"></ion-icon>
              <ion-label>Statistiques</ion-label>
            </ion-tab-button>
          </ion-tab-bar>
    </ion-content>
  </ion-page>
</template>

<script>
</script>
