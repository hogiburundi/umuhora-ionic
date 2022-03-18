<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Acheter</h3>
      <ion-item class="ion-no-padding">
        <ion-label position="floating">Nom du produit</ion-label>
        <ion-input type=text placeholder="Nom du produit"
          @IonChange="nom=$event.target.value" clearInput/>
      </ion-item>
      <ion-item class="ion-no-padding">
        <ion-label position="floating">Unité entrante</ion-label>
        <ion-input type=text placeholder="Unité entrante"
          @IonChange="unite_entrante=$event.target.value" clearInput/>
      </ion-item>
      <div class="field">
        <label for="du">Date d'expiration</label>
        <input type="date" id="du">
      </div>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">
          ANULLER
        </ion-button>
        <ion-button fill=clear>VALIDER</ion-button>
      </ion-col>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    active:{type:Boolean, required:true},
    item:{type:Object, required:true}
  },
  data(){
    return {
      nom : "", unite_entrante : "", unite : "", rapport : "",
      prix_vente : "",
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    postStock(){
      try {
        this.prix_vente = eval(this.prix_vente)
        this.rapport = eval(this.rapport)
      } catch(e) {
        this.$store.state.notification = {
          type:"danger", message:"le prix n'est evaluable"
        }
        return
      }
      let data = {
        quantite_actuelle:this.quantite_actuelle,
        date_expiration:!!this.date_expiration?this.date_expiration:undefined,
        prix_total:this.prix_total,
        produit:this.produit.id,
      }
      if(!this.item){
        axios.post(this.url+"/stock/", data, this.headers)
        .then((response) => {
          this.$store.state.stocks.unshift(response.data)
          this.close()
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, this.postStock)
        });
      } else {
        axios.put(this.url+`/stock/${this.item.id}/`, data, this.headers)
        .then((response) => {
          let new_val = response.data
          for(let key of Object.keys(new_val)){
            this.item[key] = new_val[key]  
          }
          this.$emit("close")
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, this.postStock)
        });
      }
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