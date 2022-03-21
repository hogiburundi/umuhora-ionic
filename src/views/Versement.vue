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
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-col>
        <VersementItem v-if="today_versement" :item="today_versement"/>
        <VersementItem v-for="versement in versements" :item="versement"/>
      </ion-col>
    </ion-content>
    <ion-fab-button class="todo-fab" @click="">
      <ion-icon :src="getIcon('walletOutline')"></ion-icon>
    </ion-fab-button>
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
</ion-page>
</template>
<script>
import VersementItem from "../components/versement_item"
import DialogDateFilter from "../components/dialog_date_filter"

export default {
  components:{VersementItem, DialogDateFilter},
  data(){
    return {
      date_shown:false, versements:this.$store.state.versements,
      today_versement:null
    }
  },
  watch:{
    "$store.state.versements"(new_val){
      this.versements = new_val
    }
  },
  methods:{
    showDateDialog(){
      this.date_shown = true
    },
    fetchData(){
      let link = ""
      if(this.getActiveKiosk()==null){
        return
      }
      let kiosk_id = this.getActiveKiosk().id
      if(!this.next){
        link = this.url+`/versement/?kiosk=${kiosk_id}`;
      } else {
        link = this.next
      }
      axios.get(link, this.headers)
      .then((response) => {
        this.$store.state.versements.push(...response.data.results)
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
    fetchToday(){
      if(this.getActiveKiosk()==null){
        return
      }
      let kiosk_id = this.getActiveKiosk().id
      let link = this.url+`/versement/today/?kiosk=${kiosk_id}`;
      axios.get(link, this.headers)
      .then((response) => {
        this.today_versement = response.data
      });
    },
  },
  mounted(){
    if(this.$store.state.versements.length<1){
      this.fetchData()
      this.fetchToday()
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
ion-fab-button{
  position: fixed;
  right: 10px;
  bottom: 40px;
}
</style>
