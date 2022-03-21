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
        <DetteItem v-for="commande in commandes" :item="commande"/>
      </ion-col>
    </ion-content>
    <ion-footer>
      <div class="group">
        <div>Montant: </div>
        <div>0</div>
      </div>
      <div class="group">
        <div>Payée: </div>
        <div>0</div>
      </div>
      <div class="group">
        <div>Reste: </div>
        <div>0</div>
      </div>
    </ion-footer>
  </ion-page>
  <DialogDateFilter :active="date_shown" @close="date_shown=false"/>
  <ion-searchbar show-cancel-button="always" debounce="500" id="search_det"
    @ionCancel="closeSearch" @ionInput="search($event.target.value)"/>
</ion-page>
</template>
<script>
import DetteItem from "../components/dette_item"
import DialogDateFilter from "../components/dialog_date_filter"

export default {
  components:{DetteItem, DialogDateFilter},
  data(){
    return {
      commandes:this.$store.state.commandes.filter(x => x.prix>x.payee),
      date_shown:false,
    }
  },
  watch:{
    "$store.state.commandes"(new_val){
      this.commandes = new_val.filter(x => x.prix>x.payee)
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
      let search_view = document.getElementById("search_det")
      search_view.classList.add("shown")
    },
    fetchData(){
      let link = ""
      if(this.getActiveKiosk()==null){
        return
      }
      let kiosk_id = this.getActiveKiosk().id
      if(!this.next){
        link = this.url+`/commande/?kiosk=${kiosk_id}`;
      } else {
        link = this.next
      }
      axios.get(link, this.headers)
      .then((response) => {
        this.$store.state.commandes.push(...response.data.results)
        if(response.data.next.length > 0){
          this.next = response.data.next
          this.fetchData()
        } else {
          this.next = null
        }
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.fetchData)
      });
    },
  },
  mounted(){
    if(this.$store.state.commandes.length<1){
      this.fetchData()
    }
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
