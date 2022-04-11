<template>
  <ion-page>
    <ion-content fullscreen=true>
      <ion-button style="margin: 5px 10px;" size=block @click="createProduit">
        Ajouter un produit
      </ion-button>
      <StockItem v-for="item in produits" :item="item"
        @edit="editStock(item)" @buy="makeAchat(item)"/>
    </ion-content>
  </ion-page>
</template>
<script>
import StockItem from "../components/stock_item"

export default {
  components:{ StockItem },
  data(){
    return  {
      produits:[]
    }
  },
  watch:{
    "$store.state.produits":{
      deep:true,
      handler(new_val){
        this.produits = this.getCurrentProduit()
      }
    },
    "$store.state.home_keyword"(new_val){
      if(this.$route.path != "/home/stock") return
      this.produits = this.getCurrentProduit().filter(x => {
        return x.nom.toLowerCase().includes(new_val)
      })
    }
  },
  methods:{
    createProduit(){
      this.$store.state.active_stock_item = null
      this.$store.state.dialog_produit_shown = true
    },
    editStock(item){
      this.$store.state.active_stock_item = item
      this.$store.state.dialog_produit_shown = true
    },
    makeAchat(item){
      this.$store.state.active_stock_item = item
      this.$store.state.dialog_achat_shown = true
    },
    getCurrentProduit(){
      let c_k_id = this.getActiveKiosk().id
      return Object.values(this.$store.state.produits).filter(x => {
        return x.kiosk == c_k_id
      })
    }
  },
  mounted(){
    this.produits = this.getCurrentProduit()
  },
}
</script>
<style scoped>
ion-col{
  max-height: 100%;
  overflow-y: auto;
}
</style>