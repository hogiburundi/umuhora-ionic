<template>
  <ion-page>
    <ion-content>
      <ion-col>
        <VenteItem v-for="item in $store.state.produits" :item="item"/>
      </ion-col>
    </ion-content>
  </ion-page>
</template>
<script>
import VenteItem from "../components/vente_item"
export default {
  data(){
    return {
    }
  },
  watch:{
    "$store.state.active_kiosk"(new_val){
      this.fetchData()
    }
  },
  components:{VenteItem},
  methods:{
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  max-width: 100vw;
  align-content: flex-start;
}
</style>