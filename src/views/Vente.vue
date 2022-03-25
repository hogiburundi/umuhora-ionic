<template>
  <ion-page>
    <ion-content>
      <ion-col>
        <VenteItem v-for="item in produits" :item="item"/>
      </ion-col>
    </ion-content>
  </ion-page>
</template>
<script>
import VenteItem from "../components/vente_item"
export default {
  data(){
    return {
      produits:Array.from(this.$store.state.produits).filter(x => x.quantite>0)
    }
  },
  watch:{
    "$store.state.active_kiosk"(new_val){
      this.fetchData()
    },
    "$store.state.produits"(new_val){
      this.produits = Array.from(new_val).filter(x => x.quantite>0)
    }
  },
  components:{VenteItem},
  methods:{
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