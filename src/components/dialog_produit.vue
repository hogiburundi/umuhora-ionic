<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Produit</h3>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Nom du produit</ion-label>
          <ion-input type=text placeholder="Nom du produit" :value="nom"
            @IonChange="nom=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Unité entrante</ion-label>
          <ion-input type=text placeholder="Unité entrante" :value="unite_entrante"
            @IonChange="unite_entrante=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Unité sortante</ion-label>
          <ion-input type=text placeholder="Unité sortante" :value="unite"
            @IonChange="unite=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">rapport</ion-label>
          <ion-input type=number placeholder="rapport" :value="rapport"
            @IonChange="rapport=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">prix de vente</ion-label>
          <ion-input type=number placeholder="prix de vente" :value="prix_vente"
            @IonChange="prix_vente=$event.target.value" clearInput/>
        </ion-item>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">
          ANULLER
        </ion-button>
        <ion-button fill=clear @click="save">VALIDER</ion-button>
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
  watch:{
    item(new_val){
      if(!!new_val){
        this.nom = new_val.nom
        this.unite_entrante = new_val.unite_entrante
        this.unite = new_val.unite
        this.rapport = new_val.rapport
        this.prix_vente = new_val.prix_vente
      } else {
        this.nom = ""
        this.unite_entrante = ""
        this.unite = ""
        this.rapport = 1
        this.prix_vente = ""
      }
    }
  },
  data(){
    return {
      nom : "", unite_entrante : "", unite : "", rapport:1,
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
        user_id: this.active_user.id,
        quantite: 0,
        kiosk: this.getActiveKiosk().id,
        kiosk_id: this.getActiveKiosk().id
      }
      if(!this.item){
        let id = this.generateId("produits")
        data.created = JSON.parse(JSON.stringify(data))
        data.id = id
        // this.$store.state.db_produits[id] = data
        // this.$store.state.produits.unshift(data)
      } else {
        for(let key of Object.keys(data)){
          this.item[key] = data[key]
        }
        // this.item.updated = data
      }
      console.log(data)
      // this.close()
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