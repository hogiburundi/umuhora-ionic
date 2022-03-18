<template>
  <ion-page>
    <ion-content fullscreen=true>
      <ion-button style="margin: 5px 10px;" size=block @click="createProduit">
        Ajouter un produit
      </ion-button>
      <StockItem v-for="item in produits" :item="item"
        @edit="editStock(item)" @buy="makeAchat(item)"/>
    </ion-content>
    <DialogProduit :active="produit_shown" @close="closeDialog" :item="active_item"/>
    <DialogAchat :active="achat_shown" @close="closeDialog" :item="active_item"/>
  </ion-page>
</template>
<script>
import StockItem from "../components/stock_item"
import DialogProduit from "../components/dialog_produit"
import DialogAchat from "../components/dialog_achat"

export default {
  components:{ DialogProduit, StockItem, DialogAchat },
  data(){
    return {
      produits:this.$store.state.produits, produit_shown:false,
      achat_shown:false, active_item:null
    }
  },
  watch:{
    "$store.state.produits"(new_val){
      this.produits = this.$store.state.produits
    }
  },
  methods:{
    createProduit(){
      this.active_item = null
      this.produit_shown = true
    },
    editStock(item){
      this.active_item = item
      this.produit_shown = true
    },
    makeAchat(item){
      this.active_item = item
      this.achat_shown = true
    },
    closeDialog(){
      this.produit_shown = false
      this.achat_shown = false
    },
    fetchData(){
      let link = ""
      if(this.getActiveKiosk()==null){
        return
      }
      let kiosk_id = this.getActiveKiosk().id
      if(!this.next){
        link = this.url+`/produit/?kiosk=${kiosk_id}`;
      } else {
        link = this.next
      }
      axios.get(link, this.headers)
      .then((response) => {
        this.$store.state.produits.push(...response.data.results)
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
  },
  mounted(){
    if(this.$store.state.produits.length<1){
      this.fetchData()
    }
  },
}
</script>
<style scoped>
ion-col{
  max-height: 100%;
  overflow-y: auto;
}
</style>