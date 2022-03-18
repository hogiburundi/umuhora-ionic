<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/home/vente">
            <ion-icon :src="getIcon('arrowBack')"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>UMUHORA</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <CartItem v-for="item in $store.state.cart.content" :item="item"/>
      <div class="total">
        <div>Total:</div>
        <b>{{ money($store.state.cart.getTotal()) }} </b>
        <div> BIF</div>
      </div>
      <ion-col class="create">
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Nom du client</ion-label>
          <ion-input type=text placeholder="Nom du client"
            :value="nom" @IonChange="setNom($event.target.value)" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Télephone du client</ion-label>
          <ion-input type="number" placeholder="Télephone du client"
            :value="tel" @IonChange="setTel($event.target.value)" clearInput/>
        </ion-item>
      </ion-col>
    </ion-content>
    <ion-footer>
      <div class="payment">
        <ion-label>le montant payé:</ion-label>
        <input type="number" v-model="paid">
        <ion-label>BIF</ion-label>
      </div>
      <div class="payment">
        <ion-label>{{ ingaru<0?"ayo kugarura":"ideni rya" }}:</ion-label>
        <b>{{ money(Math.abs(ingaru)) }}</b>
        <ion-label>BIF</ion-label>
      </div>
      <div class="two-cols">
        <ion-button size="6" @click="clearCart">RESET</ion-button>
        <ion-button size="6" @click="submitVente">SUBMIT</ion-button>
      </div>
    </ion-footer>
  </ion-page>
</template>
<script>
import CartItem from "../components/cart_item"
export default {
  components:{ CartItem },
  data(){
    return {
      nom:"", tel:"", paid:this.$store.state.cart.getTotal()
    }
  },
  computed:{
    ingaru(){
      return this.$store.state.cart.getTotal() - this.paid
    }
  },
  watch:{
    "$store.state.cart.content":{
      deep:true,
      handler(new_val){
        this.paid = this.$store.state.cart.getTotal()
      }
    }
  },
  methods:{
    clearCart(){
      this.$store.state.cart.content = []
    },
    setTel(value){
      this.tel = value
      this.searchFor(value)
    },
    setNom(value){
      this.nom = value
      this.searchFor(value)
    },
    searchFor(keyword){
    },
    submitVente(){
      console.log(this.nom, this.tel)
    }
  }
}
</script>
<style scoped>
.search{
  margin-top: 5px;
  display: flex;
  align-items: flex-start;
}
.search input{
  border-radius: 10px 0 0 10px;
  height: 35px;
  border: 2px solid var(--ion-color-primary);
  padding: 5px 10px;
  flex-grow: 1;
}
.search button{
  border-radius: 0 10px 10px 0;
  height: 35px;
  background: var(--ion-color-primary);
  color: white;
  padding: 0 20px;
  margin-left: -2px;
}
.payment{
  display: flex;
  justify-content: center;
  align-items: center;
}
.payment input{
  width: 80px;
  padding: 5px;
  margin: 5px;
  text-align: right;
}
.total{
  display: flex;
  justify-content: right;
}
.two-cols{
  display: flex;
}
.two-cols>*{
  flex-grow: 1;
}
.item-native{
  padding-left: 0!important;
}
</style>