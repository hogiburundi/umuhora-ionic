<template>
  <ion-page>
    <ion-content id="ventes_parent">
      <ion-col id="ventes" @scroll="e => loadMore(e)">
        <VenteItem v-for="item in produit_chunk" :item="item" :key="item.id"/>
      </ion-col>
    </ion-content>
  </ion-page>
</template>
<script>
import VenteItem from "../components/vente_item"
export default {
  data(){
    return {
      produits:[], produit_chunk:[], last:21, load_more:false
    }
  },
  watch:{
    "$store.state.produits":{
      deep:true,
      handler(new_val){
        this.last = 21
        this.produits = this.getCurrentProduit()
      }
    },
    produits(new_val){
      this.produit_chunk = new_val.slice(0, this.last)
    },
    "$store.state.home_keyword"(new_val){
      this.last = 21
      if(this.$route.path != "/home/vente") return
      this.produits = this.getCurrentProduit().filter(x => {
        return x.quantite>0 && x.nom.toLowerCase().includes(new_val)
      })
    }
  },
  components:{VenteItem},
  methods:{
    getCurrentProduit(){
      console.log('LOADING VENTE')
      if(!this.getActiveKiosk()) return []
      let c_k_id = this.getActiveKiosk().id
      return Object.values(this.$store.state.produits).filter(x => {
        return x.quantite > 0 && x.kiosk == c_k_id
      })
    },
    loadMore(event){
      let div_ventes = event.target
      let div_ventes_parent = document.getElementById("ventes_parent")
      let size_ventes = div_ventes.scrollTop
      let size_ventes_parent = div_ventes_parent.clientHeight
      let size_total = div_ventes.scrollHeight
      this.load_more = size_ventes + size_ventes_parent == size_total;

      if(this.load_more) {
        this.produit_chunk.push(
          ...this.produits.slice(this.produit_chunk.length, this.produit_chunk.length+this.last)
        )
        this.load_more = false
      }
    }
  },
  mounted(){
    if(this.produits.length == 0){
      this.produits = this.getCurrentProduit()
    }
  }
}
</script>
<style scoped>
ion-col{
  max-height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  max-width: 100vw;
  align-content: flex-start;
}
</style>