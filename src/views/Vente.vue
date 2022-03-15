<template>
  <ion-page>
    <ion-col>
      <VenteItem v-for="i in 12" :item="default_vente"/>
    </ion-col>
  </ion-page>
</template>
<script>
import VenteItem from "../components/vente_item"
export default {
  data(){
    return {
      default_vente:{
        id:1, quantite:5, nom:"ibiharage", prix_vente:2000,
        unite_sortante:"kg"
      }
    }
  },
  components:{VenteItem},
}
</script>
<style scoped>
ion-col{
  max-height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: flex-start;
  align-content: flex-start;
}
</style>