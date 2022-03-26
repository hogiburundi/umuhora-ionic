<template>
<ion-page>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-button slot="start" routerLink="/home/stats">
              <ion-icon :src="getIcon('arrowBack')"></ion-icon>
            </ion-button>
          </ion-buttons>
        <ion-title>UMUHORA</ion-title>
        <ion-buttons slot="secondary">
          <ion-button @click="showDateDialog">
            <ion-icon slot="icon-only" :icon="getIcon('calendar')"/>
          </ion-button>
          <ion-button @click="showSearch">
            <ion-icon slot="icon-only" :icon="getIcon('search')"/>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-col>
        <StatStockItem v-for="stock in stocks" :item="stock" @perte="perdre(stock)"/>
      </ion-col>
    </ion-content>
    <ion-footer>
      <div class="group">
        <div>Montant: </div>
        <div>{{ money(
          stocks.reduce((acc, x) => acc+=x.prix_total, 0)
        )}}</div>
      </div>
    </ion-footer>
  </ion-page>
  <DialogDateFilter :active="date_shown" @close="date_shown=false"/>
  <ion-searchbar show-cancel-button="always" debounce="500" id="search_st"
    @ionCancel="closeSearch" @ionInput="search($event.target.value)"/>
  <DialogPerte :active="perte_shown" :item="active_item" @close="closeDialog"/>
</ion-page>
</template>

<script>
import StatStockItem from "../components/stat_stock_item"
import DialogDateFilter from "../components/dialog_date_filter"
import DialogPerte from "../components/dialog_perte"

export default {
  components:{StatStockItem, DialogDateFilter, DialogPerte},
  data(){
    return {
      date_shown:false, stocks:Object.values(this.$store.state.stocks),
      perte_shown:false, active_item:null,
    }
  },
  watch:{
    "$store.state.stocks"(new_val){
      this.stocks = Object.values(new_val)
    },
  },
  methods:{
    perdre(item){
      this.perte_shown = true
      this.active_item = item
      console.log(item)
    },
    closeDialog(){
      this.perte_shown = false
    },
    showDateDialog(){
      this.date_shown = true
    },
    closeSearch(event){
      event.target.classList.remove("shown")
    },
    showSearch(){
      let search_view = document.getElementById("search_st")
      search_view.classList.add("shown")
    },
  },
}
</script>
<style scoped>
ion-footer{
  display: flex;
  justify-content: center;
  padding: 5px 10px;
}
.group{
  display: flex;
}
</style>
