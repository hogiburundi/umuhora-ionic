<template>
  <ion-page>
    <ion-content id="ventes_parent">
      <ion-col id="ventes" @scroll="e => loadMore(e)">
        <VenteItem v-for="item in chunk" :item="item" :key="item.id"/>
      </ion-col>
    </ion-content>
  </ion-page>
</template>
<script>
import VenteItem from "../components/vente_item"
export default {
  data(){
    return {
      chunk:this.$store.state.ibidandazwa,
      last:21, load_more:false
    }
  },
  watch:{
    "$store.state.ibidandazwa":{
      deep:true,
      handler(new_val){
        this.last = 21
        this.chunk = new_val
      }
    },
    "$store.state.home_keyword"(new_val){
      this.last = 21
      if(this.$route.path != "/home/vente") return
      let ibidandazwa = JSON.parse(localStorage.produits)
      this.chunk = ibidandazwa.filter(x => {
        return x.nom.toLowerCase().includes(new_val)
      }).slice(0, this.last)
    }
  },
  components:{VenteItem},
  methods:{
    loadData(){
      let db = Object.values(JSON.parse(localStorage.produits))
      let chunk = db.filter(x => x.quantite > 0).slice(0, 21)
    },
    loadMore(event){
      let div_ventes = event.target
      let div_ventes_parent = document.getElementById("ventes_parent")
      let size_ventes = div_ventes.scrollTop
      let size_ventes_parent = div_ventes_parent.clientHeight
      let size_total = div_ventes.scrollHeight
      this.load_more = size_ventes + size_ventes_parent == size_total;

      if(this.load_more) {
        let ibidandazwa = JSON.parse(localStorage.produits)
        this.chunk.push(
          ...ibidandazwa.slice(this.chunk.length, this.chunk.length+this.last)
        )
        this.load_more = false
      }
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
</style>