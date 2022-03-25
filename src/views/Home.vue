<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="secondary">
          <ion-button routerLink="/cart">
            <ion-icon slot="icon-only" :src="getIcon('cartOutline')"/>
            <ion-badge color="danger" v-if="$store.state.cart.content.length>0">
              {{ $store.state.cart.content.length }}
            </ion-badge>
          </ion-button>
          <ion-button @click="showSearch">
            <ion-icon slot="icon-only" :icon="getIcon('search')"/>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="primary">
          <ion-button id="menu-toggler">
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
            <ion-item button size="small">
              <ion-label>Notifications</ion-label>
              <ion-icon :icon="getIcon('notificationsOutline')"/>
              <ion-badge color="danger" class="notif">
                {{ $store.state.cart.content.length }}
              </ion-badge>
            </ion-item>
            <ion-item button size="small" @click="showSync">
              <ion-label>Synchroniser</ion-label>
              <ion-icon :icon="getIcon('sync')"/>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-popover>
    </ion-header>
    <ion-content>
      <div @touchend="toggleFab">
        <ion-router-outlet/>
        <ion-fab-button class="todo-fab" @click="startScan" v-show="fab_shown">
          <ion-icon :src="getIcon('qrCode')"></ion-icon>
        </ion-fab-button>
      </div>
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
    <ion-searchbar show-cancel-button="always" debounce="0" id="search"
      @ionCancel="closeSearch" @ionInput="search($event.target.value)"/>
    <DialogProduit :active="produit_shown" @close="closeDialog"
      :item="active_stock_item"/>
    <DialogSync :active="sync_shown" @close="closeDialog"/>
    <DialogAchat :active="achat_shown" @close="closeDialog"
      :item="active_stock_item"/>
  </ion-page>
</template>

<script>
import DialogProduit from "../components/dialog_produit"
import DialogAchat from "../components/dialog_achat"
import DialogSync from "../components/dialog_sync"
import { Camera } from '@capacitor/camera';

export default {
  components:{ DialogProduit, DialogAchat, DialogSync },
  data(){
    return {
      menu_shown:false, produit_shown:false, achat_shown:false,
      active_stock_item:null, produit_shown: false, achat_shown:false,
      fab_shown:true, sync_shown:false
    }
  },
  watch:{
    "$store.state.dialog_produit_shown"(new_val){
      this.produit_shown = new_val
    },
    "$store.state.dialog_achat_shown"(new_val){
      this.achat_shown = new_val
    },
    "$store.state.active_stock_item"(new_val){
      this.active_stock_item = new_val
    }
  },
  methods:{
    displayMenu(){
      this.menu_shown=true
    },
    closeDialog(){
      this.$store.state.dialog_produit_shown = false
      this.$store.state.dialog_achat_shown = false
      this.$store.state.active_stock_item = null
      this.sync_shown = false
    },
    startScan(){
      Camera.requestPermissions()
    },
    closeSearch(event){
      console.log('Close')
      event.target.classList.remove("shown")
    },
    showSearch(){
      let search_view = document.getElementById("search")
      search_view.classList.add("shown")
    },
    showSync(){
      this.sync_shown=true
    },
    search(keyword){
      console.log(keyword)
    },
    toggleFab(){
      let vue = this
      this.fab_shown = true
      window.clearTimeout(window.current_event)
      window.current_event = window.setTimeout(() => {
        vue.fab_shown = false
      }, 5000)
    }
  },
  mounted(){
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
ion-badge{
  position: absolute;
  top: -5px;
  right: -7px;
  font-size: .8em;
}
ion-badge.notif{
  position: absolute;
  top: 5px;
  right: 20px;
  font-size: .8em;
}
</style>
