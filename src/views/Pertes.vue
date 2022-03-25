<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-button slot="start" routerLink="/home/stats">
              <ion-icon :src="getIcon('arrowBack')"></ion-icon>
            </ion-button>
          </ion-buttons>
        <ion-title>UMUHORA</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-col>
        <PerteItem v-for="perte in pertes" :item="perte"/>
      </ion-col>
    </ion-content>
    <ion-footer>
      <div class="group">
        <div>Montant: </div>
        <div>{{ money(
          pertes.reduce((acc, x) => acc+=x.prix, 0)
        )}}</div>
      </div>
    </ion-footer>
  </ion-page>
</template>
<script>
import PerteItem from "../components/perte_item"
export default {
  components:{PerteItem},
  data(){
    return {
      pertes:Array.from(this.$store.state.pertes)
    }
  },
  watch:{
    "$store.state.pertes"(new_val){
      this.pertes = Array.from(new_val)
    }
  },
  methods:{
    fetchData(){
      let link = ""
      if(this.getActiveKiosk()==null){
        return
      }
      let kiosk_id = this.getActiveKiosk().id
      if(!this.next){
        link = this.url+`/perte/?kiosk=${kiosk_id}`;
      } else {
        link = this.next
      }
      axios.get(link, this.headers)
      .then((response) => {
        response.data.results.forEach(x => this.$store.state.pertes.add(x))
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
    if(this.$store.state.pertes.size<1){
      this.fetchData()
    }
  },
}
</script>
<style scoped>
ion-footer{
  display: flex;
  justify-content: center;
  padding: 5px 10px;
}
.group{
  display: flex;
}
</style>
