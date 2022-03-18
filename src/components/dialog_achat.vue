<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Achat {{ item.nom }}</h3>
      <ion-item class="ion-no-padding">
        <ion-label position="floating">Quantité</ion-label>
        <ion-input type=number placeholder="Quantité"
          @IonChange="qtt=$event.target.value" clearInput/>
      </ion-item>
      <ion-label v-if="!!escompte">
        la somme escomptée est {{ escompte }}
      </ion-label>
      <ion-item class="ion-no-padding">
        <ion-label position="floating">Prix d'achat</ion-label>
        <ion-input type=number placeholder="Prix d'achat"
          @IonChange="prix_vente=$event.target.value" clearInput/>
      </ion-item>
      <div class="field">
        <label for="du">Date d'expiration</label>
        <input type="date" id="du">
      </div>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">
          ANULLER
        </ion-button>
        <ion-button fill=clear @click="postStock">VALIDER</ion-button>
      </ion-col>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    active:{type:Boolean, required:true},
    item:{type:Object, required:false}
  },
  data(){
    return {
      qtt:0, prix_vente:0, date:null, escompte:""
    }
  },
  watch:{
    qtt(new_val){
      this.escompte = new_val*this.item.prix_vente
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    postStock(){
      let data = {
        quantite_actuelle:this.qtt,
        date_expiration:!!this.date?this.date:undefined,
        prix_total:this.prix_vente,
        produit:this.item.id
      }
      axios.post(this.url+"/stock/", data, this.headers)
      .then((response) => {
        this.$store.state.stocks.unshift(response.data)
        this.close()
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.postStock)
      });
    },
  }
};
</script>
<style scoped>
.options{
  padding-bottom: 0;
}
.ion-padding{
  padding-bottom: 5px;
}
.field{
  margin-top: 10px;
}
</style>