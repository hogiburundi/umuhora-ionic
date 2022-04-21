<template>
  <ion-page>
    <ion-content>
      <keep-alive>
        <ion-col overflow-scroll="false">
          <VenteItem v-for="item in produits.slice(0, 21)" :item="item" :key="item.id"/>
        </ion-col>
      </keep-alive>
    </ion-content>
  </ion-page>
</template>
<script>
import VenteItem from "../components/vente_item"
export default {
  data(){
    return {
      produits:[], produit_chunk:[], last:21
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
    }
  },
  mounted(){
    if(this.produits.length == 0){
      this.produits = this.getCurrentProduit()
      // window.onscroll = () => {
      //   let bottom = document.documentElement.scrollTop + window.innerHeight == document.documentElement.offsetHeight;
      //   if (bottomOfWindow) {
      //     this.produit_chunk.push(this.produit_chunk.length, this.produit_chunk.length+this.last)
      //   }
      // };
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