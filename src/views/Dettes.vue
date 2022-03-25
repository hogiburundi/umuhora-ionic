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
        <DetteItem v-for="commande in commandes" :item="commande"
          @pay="makePay(commande)" @payments="showPayments(commande)"/>
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
  <ion-searchbar show-cancel-button="always" debounce="500" id="search_det"
    @ionCancel="closeSearch" @ionInput="search($event.target.value)"/>
  <DialogPay :item="active_item" :active="pay_shown" @close="closeDialogs"/>
  <DialogPayments :item="active_item" :active="payments_shown" @close="closeDialogs"/>
</ion-page>
</template>
<script>
import DetteItem from "../components/dette_item"
import DialogDateFilter from "../components/dialog_date_filter"
import DialogPay from "../components/dialog_pay"
import DialogPayments from "../components/dialog_payments"

export default {
  components:{DetteItem, DialogDateFilter, DialogPay, DialogPayments},
  data(){
    return {
      commandes:Array.from(this.$store.state.commandes).filter(x => x.prix>x.payee),
      date_shown:false, payments_shown:false, pay_shown:false,
      active_item:null
    }
  },
  watch:{
    "$store.state.commandes"(new_val){
      this.commandes = Array.from(new_val).filter(x => x.prix>x.payee)
    }
  },
  methods:{
    makePay(item){
      this.active_item = item
      this.pay_shown = true
    },
    showPayments(item){
      this.active_item = item
      this.payments_shown = true
    },
    closeDialogs(){
      this.active_item = null
      this.payments_shown = false
      this.pay_shown = false
    },
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
        response.data.results.forEach(x => this.$store.state.commandes.add(x))
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
    fetchPayments(){
      let link = ""
      if(this.getActiveKiosk()==null){
        return
      }
      let kiosk_id = this.getActiveKiosk().id
      if(!this.next){
        link = this.url+`/payment/?commande__kiosk=${kiosk_id}`;
      } else {
        link = this.next
      }
      axios.get(link, this.headers)
      .then((response) => {
        response.data.results.forEach(x => this.$store.state.payments.add(x))
        if(response.data.next.length > 0){
          this.next = response.data.next
          this.fetchPayments()
        } else {
          this.next = null
        }
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.fetchData)
      });
    },
  },
  mounted(){
    if(this.$store.state.commandes.size<1){
      this.fetchData()
    }
    if(this.$store.state.payments.size<1){
      this.fetchPayments()
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
