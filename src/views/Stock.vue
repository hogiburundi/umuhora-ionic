<template>
  <ion-page>
    <ion-content fullscreen=true  overflow-scroll="false">
      <ion-button style="margin: 5px 10px;" size=block @click="createProduit">
        Ajouter un produit
      </ion-button>
      <StockItem v-for="item in produits.slice(0, 21)" :item="item"
        @edit="editStock(item)" @buy="makeAchat(item)" :key="item.id"/>
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
      console.log('LOADING STOCK')
      let c_k_id = this.getActiveKiosk().id
      return Object.values(this.$store.state.produits).filter(x => {
        return x.kiosk == c_k_id
      })
    }
  },
  mounted(){
    console.log('STOCK MOUNTED')
    if(this.produits.length==0){
      console.log('STOCK RELOADED')
      this.produits = this.getCurrentProduit()
    }
  },
  activated(){
    console.log('STOCK ACTIVATED')
  }
}
</script>
<style scoped>
ion-col{
  max-height: 100%;
  overflow-y: auto;
}
</style>