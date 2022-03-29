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
        <CommandeItem v-for="commande in commandes" :item="commande"/>
      </ion-col>
    </ion-content>
    <ion-footer>
      <div class="group">
        <div>Montant: </div>
        <div>{{ money(
          commandes.reduce((acc, x) => acc+=x.prix, 0)
        )}}</div>
      </div>
      <div class="group">
        <div>Payée: </div>
        <div>{{ money(
          commandes.reduce((acc, x) => acc+=x.payee, 0)
        )}}</div>
      </div>
      <div class="group">
        <div>Reste: </div>
        <div>{{ money(
          commandes.reduce((acc, x) => acc+=x.prix-x.payee, 0)
        )}}</div>
      </div>
    </ion-footer>
  </ion-page>
  <DialogDateFilter :active="date_shown" @close="date_shown=false"/>
  <ion-searchbar show-cancel-button="always" debounce="500" id="search_com"
    @ionCancel="closeSearch" @ionInput="search($event.target.value)"/>
</ion-page>
</template>
<script>
import CommandeItem from "../components/commande_item"
import DialogDateFilter from "../components/dialog_date_filter"

export default {
  components:{ CommandeItem, DialogDateFilter},
  data(){
    return {
      date_shown:false, commandes:Object.values(this.$store.state.commandes)
    }
  },
  watch:{
    "$store.state.commandes":{
      deep:true,
      handler(new_val){
        this.commandes = Object.values(new_val)
      }
    }
  },
  methods:{
    showDateDialog(){
      this.date_shown = true
    },
    closeSearch(event){
      event.target.classList.remove("shown")
    },
    showSearch(){
      let search_view = document.getElementById("search_com")
      search_view.classList.add("shown")
    },
    search(keyword){
      this.commandes = Object.values(this.$store.state.commandes).filter(x => {
        return JSON.stringify(x).toLowerCase().includes(keyword)
      })
    }
  },
  mounted(){
  },
}
</script>
<style scoped>
ion-footer{
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
}
.group{
  display: flex;
}
</style>
