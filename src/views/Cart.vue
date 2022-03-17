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
        <b>0.0 </b>
        <div> BIF</div>
      </div>
      <div>
        <input type="checkbox" v-model="is_new" id="is_new">
        <label for="is_new"> C'est un nouveau client</label>
      </div>
      <div class="create" v-if="is_new">
        <ion-item>
          <ion-label position="floating">Nom du client</ion-label>
          <ion-input type=text placeholder="Password" v-model="nom" clearInput/>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Télephone du client</ion-label>
          <ion-input type=text placeholder="Password" v-model="tel" clearInput/>
        </ion-item>
      </div>
      <div class="search" v-else>
        <input type="text">
        <button>chercher</button>
      </div>
    </ion-content>
    <ion-footer>
      <div class="payment">
        <ion-label>le montant payé:</ion-label>
        <input type="number" value="0.0">
        <ion-label>BIF</ion-label>
      </div>
      <div class="payment">
        <ion-label>ayo kugarura:</ion-label>
        <b>0</b>
        <ion-label>BIF</ion-label>
      </div>
      <div class="two-cols">
        <ion-button size="6">RESET</ion-button>
        <ion-button size="6">SUBMIT</ion-button>
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
      is_new:false, nom:"", tel:""
    }
  },
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