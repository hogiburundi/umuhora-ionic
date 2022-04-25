<template>
  <ion-page>
    <ion-content id="stock_parent">
      <ion-col id="stock" @scroll="loadMore">
        <ion-button style="margin: 0 10px 5px 10px;" size=block @click="createProduit">
          Ajouter un produit
        </ion-button>
        <StockItem v-for="item in chunk" :item="item"
          @edit="editStock(item)" @buy="makeAchat(item)" :key="item.id"/>
      </ion-col>
    </ion-content>
  </ion-page>
</template>
<script>
import StockItem from "../components/stock_item"

export default {
  components:{ StockItem },
  data(){
    return  {
      chunk:this.$store.state.produits.slice(0, 21),
      last:21, load_more:false
    }
  },
  watch:{
    "$store.state.produits":{
      deep:true,
      handler(new_val){
        this.last = 21
        this.produits = new_val.slice(0, this.last)
      }
    },
    "$store.state.home_keyword"(new_val){
      this.last = 21
      if(this.$route.path != "/home/stock") return
      this.chunk = this.$store.state.produits.filter(x => {
        return x.nom.toLowerCase().includes(new_val)
      }).slice(0, 21)
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
    loadMore(event){
      let div_stock = document.getElementById("stock")
      let div_stock_parent = document.getElementById("stock_parent")
      let size_stock = div_stock.scrollTop
      let size_stock_parent = div_stock_parent.clientHeight
      let size_total = div_stock.scrollHeight

      this.load_more = size_stock + size_stock_parent == size_total;

      if(this.load_more) {
        this.chunk.push(
          ...this.$store.state.produits.slice(this.chunk.length, this.chunk.length+this.last)
        )
        this.load_more = false
      };
    }
  },
  mounted(){
  },
}
</script>
<style scoped>
#stock{
  display: block;
  height: 100%;
  overflow-y: auto;
}
</style>