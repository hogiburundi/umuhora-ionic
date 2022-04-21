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
    console.log('VENTE MOUNTED')
    if(this.produits.length == 0){
      console.log('VENTE RELOADING')
      this.produits = this.getCurrentProduit()
      console.log('VENTE RELOADED')
    }
  },
  activated(){
    console.log('VENTE ACTIVATED')
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