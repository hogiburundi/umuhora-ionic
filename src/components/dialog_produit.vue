<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Filtrage</h3>
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
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Unité sortante</ion-label>
          <ion-input type=text placeholder="Unité sortante"
            @IonChange="unite=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">rapport</ion-label>
          <ion-input type=text placeholder="rapport" value=1
            @IonChange="rapport=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">prix de vente</ion-label>
          <ion-input type=text placeholder="prix de vente"
            @IonChange="prix_vente=$event.target.value" clearInput/>
        </ion-item>
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
</style>