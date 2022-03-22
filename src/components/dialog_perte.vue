<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Perte de {{ item.produit.nom }}</h3>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">quantite</ion-label>
          <ion-input type=number placeholder="quantite" value=1 :value="quantite"
            @IonChange="quantite=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Motif</ion-label>
          <ion-textarea placeholder="Insiguro itomoye y'ukuntu vyagenze"
            @IonChange="unite_entrante=$event.target.value"/>
        </ion-item>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">
          ANULLER
        </ion-button>
        <ion-button fill=clear @click="save">SOUMETTRE</ion-button>
      </ion-col>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    active:{type:Boolean, required:true},
    item:{type:Object, required:false},
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
    save(){
      let data = {
        nom: this.nom,
        unite_entrante: this.unite_entrante,
        unite: this.unite,
        rapport: this.rapport,
        prix_vente: this.prix_vente,
        user: this.active_user.id,
        kiosk: this.getActiveKiosk().id
      }
      if(!this.item){
        this.$store.state.produits.push(data)
        this.$store.state.created_produits.push(data)
      } else {
        for(let key of Object.keys(data)){
          this.item[key] = data[key]
        }
        if(!!this.item.id){
          this.$store.state.updated_produits_ids.add(this.item.id)
        }
      }
      this.close()
    }
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
</style>