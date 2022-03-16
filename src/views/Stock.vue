<template>
  <ion-page>
    <ion-content fullscreen=true>
      <StockItem v-for="i in 13" :item="default_vente"
       @edit="editStock"/>
    </ion-content>
    <DialogProduit :active="produit_shown" @close="closeDialog"/>
  </ion-page>
</template>
<script>
import StockItem from "../components/stock_item"
import DialogProduit from "../components/dialog_produit"

export default {
  components:{ DialogProduit, StockItem },
  data(){
    return {
      default_vente:{
        id:1, quantite:5, nom:"ibiharage", prix_vente:2000,
        unite_sortante:"kg",
      },
      produit_shown:false
    }
  },
  methods:{
    editStock(){
      this.produit_shown = true
    },
    closeDialog(){
      this.produit_shown = false
    }
  }
}
</script>
<style scoped>
ion-col{
  max-height: 100%;
  overflow-y: auto;
}

</style>