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
    active:{type:Boolean, required:true}
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
.field{
  margin-top: 10px;
}
</style>