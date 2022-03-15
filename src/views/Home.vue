<template>
  <ion-page @click="hideMenu">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="secondary">
          <ion-button routerLink="/cart">
            <ion-icon slot="icon-only" :src="getIcon('cartOutline')"/>
          </ion-button>
          <ion-button>
            <ion-icon slot="icon-only" :icon="getIcon('search')"/>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="primary">
          <ion-button color="primary" id="menu-toggler">
            <ion-icon slot="icon-only"
              :ios="getIcon('ellipsisHorizontal')"
              :md="getIcon('ellipsisVertical')"/>
          </ion-button>
        </ion-buttons>
        <ion-title>UMUHORA</ion-title>
      </ion-toolbar>
      <ion-popover trigger="menu-toggler" dismiss-on-select="true" show-backdrop="false">
        <ion-content>
          <ion-list lines="none">
            <ion-item button size="small">Notifications</ion-item>
            <ion-item button size="small">Synchroniser</ion-item>
          </ion-list>
        </ion-content>
      </ion-popover>
    </ion-header>
    <ion-content>
      <ion-router-outlet/>
      <ion-fab-button class="todo-fab" @click="">
        <ion-icon :src="getIcon('qrCode')"></ion-icon>
      </ion-fab-button>
    </ion-content>
    <ion-footer>
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
    </ion-footer>
  </ion-page>
</template>

<script>
export default {
  data(){
    return {
      menu_shown:false
    }
  },
  methods:{
    displayMenu(){
      this.menu_shown=true
    },
    hideMenu(){
      this.menu_shown=false
    }
  }
}
</script>
<style scoped>
ion-fab-button{
  position: fixed;
  right: 10px;
  bottom: 70px;
}
ion-tab-bar{
  display: flex!important;
}
</style>
