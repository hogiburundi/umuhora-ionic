<template>
  <ion-page>
    <ion-content id="ventes_parent">
      <ion-col id="ventes">
        <VenteItem v-for="item in chunk" :item="item" :key="item.id"/>
        <ion-col v-if="chunk.size > 0" class="loadmore">
          <a @click="loadMore()">load more</a>
        </ion-col>
      </ion-col>
    </ion-content>
  </ion-page>
</template>
<script>
import VenteItem from "../components/vente_item"
export default {
  data(){
    return {
      chunk:this.$store.state.ibidandazwa, last:21, load_more:false
    }
  },
  watch:{
    "$store.state.home_keyword"(new_val){
      this.last = 21
      if(this.$route.path != "/home/vente") return
      let ibidandazwa = Object.values(JSON.parse(localStorage.getItem("produits")))
      this.chunk = ibidandazwa.filter(x => {
        return x.quantite > 0 && x.nom.toLowerCase().includes(new_val)
      }).slice(0, this.last)
    }
  },
  components:{VenteItem},
  methods:{
    loadData(){
      let db = Object.values(JSON.parse(localStorage.produits))
      let chunk = db.filter(x => x.quantite > 0).slice(0, 21)
    },
    loadMore(){
      let ibidandazwa = Object.values(JSON.parse(localStorage.produits))
      this.chunk.push(
        ...ibidandazwa.slice(this.chunk.length, this.chunk.length+this.last)
      )
      this.load_more = false
    }
  },
  mounted(){
    if(this.chunk.size == 0){
      this.loadData()
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
.loadmore{
  width: 100%;
  grid-column: 1 / span 3;
  display: flex;
  justify-content: center;
}
</style>