<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Synchronisation</h3>
      <div class="line">
        <div class="key">validation pertes</div>
        <div>{{ valid_pertes_count-valid_pertes.size }}/{{ valid_pertes_count }}</div>
      </div>
      <div class="line">
        <div class="key">validation stocks</div>
        <div>{{ valid_stocks_count-valid_stocks.size }}/{{ valid_stocks_count }}</div>
      </div>
      <div class="line">
        <div class="key">suppression commandes</div>
        <div>{{ deleted_commandes_count-deleted_commandes.size }}/{{ deleted_commandes_count }}</div>
      </div>
      <div class="line">
        <div class="key">suppression stocks</div>
        <div>{{ deleted_stocks_count-deleted_stocks.size }}/{{ deleted_stocks_count }}</div>
      </div>
      <div class="line">
        <div class="key">suppression pertes</div>
        <div>{{ deleted_pertes_count-deleted_pertes.size }}/{{ deleted_pertes_count }}</div>
      </div>
      <div class="line">
        <div class="key">reception commandes</div>
        <div>{{ count_commandes }}</div>
      </div>
      <div class="line">
        <div class="key">reception payments</div>
        <div>{{ count_payments }}</div>
      </div>
      <div class="line">
        <div class="key">reception stocks</div>
        <div>{{ count_stocks }}</div>
      </div>
      <div class="line">
        <div class="key">reception pertes</div>
        <div>{{ count_pertes }}</div>
      </div>
      <div class="line">
        <div class="key">reception produits</div>
        <div>{{ count_produits }}</div>
      </div>
      <div class="line">
        <div class="key">envoie commandes</div>
        <div>{{ created_commandes.length }}/{{ created_commandes_count }}</div>
      </div>
      <div class="line">
        <div class="key">envoie payments</div>
        <div>{{ created_payments.length }}/{{ created_payments_count }}</div>
      </div>
      <div class="line">
        <div class="key">envoie stocks</div>
        <div>{{ created_stocks.length }}/{{ created_stocks_count }}</div>
      </div>
      <div class="line">
        <div class="key">envoie pertes</div>
        <div>{{ created_pertes.length }}/{{ created_pertes_count }}</div>
      </div>
      <div class="line">
        <div class="key">envoie produits</div>
        <div>{{ created_produits.length }}/{{ created_produits_count }}</div>
      </div>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">ANULLER</ion-button>
        <ion-button fill=clear @click="fetch">COMMENCER</ion-button>
      </ion-col>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    active:{
      type:Boolean, required:true, kiosk_id:-1
    },
  },
  data(){
    return {
      count_commandes: 0, count_payments: 0, count_stocks: 0, 
      count_pertes: 0, count_produits: 0, valid_pertes_count:0,

      next_commandes: null, next_payments: null, next_stocks: null,
      next_pertes: null, next_produits: null,

      valid_stocks_count:0, deleted_commandes_count:0, deleted_stocks_count:0,
      deleted_pertes_count:0, created_commandes_count:0, created_payments_count:0,
      created_stocks_count:0, created_pertes_count:0, created_produits_count:0,

      valid_pertes:new Set(),  valid_stocks:new Set(), deleted_commandes:new Set(),
      deleted_stocks:new Set(), deleted_pertes:new Set(),

      created_commandes:[], created_payments:[], created_stocks:[],
      created_pertes:[], created_produits:[]
    }
  },
  watch:{
    active(new_val){
      this.valid_pertes = this.$store.state.validated_pertes
      this.valid_pertes_count = this.valid_pertes.size
      this.valid_stocks = this.$store.state.validated_stocks
      this.valid_stocks_count = this.valid_stocks.size
      this.deleted_commandes = this.$store.state.deleted_commandes
      this.deleted_commandes_count = this.deleted_commandes.size
      this.deleted_stocks = this.$store.state.deleted_stocks
      this.deleted_stocks_count = this.deleted_stocks.size
      this.deleted_pertes = this.$store.state.deleted_pertes
      this.deleted_pertes_count = this.deleted_pertes.size
      this.created_commandes = Array.from(this.$store.state.commandes).filter(x => !!x.created)
      this.created_commandes_count = this.created_commandes.length
      this.created_payments = Array.from(this.$store.state.payments).filter(x => !!x.created)
      this.created_payments_count = this.created_payments.length
      this.created_stocks = Array.from(this.$store.state.stocks).filter(x => !!x.created)
      this.created_stocks_count = this.created_stocks.length
      this.created_pertes = Array.from(this.$store.state.pertes).filter(x => !!x.created)
      this.created_pertes_count = this.created_pertes.length
      this.created_produits = Array.from(this.$store.state.produits).filter(x => !!x.created)
      this.created_produits_count = this.created_produits.length
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    fetch(){
      let link = ""
      if(this.getActiveKiosk()==null){
        return
      }
      this.kiosk_id = this.getActiveKiosk().id
    },
    validPertes(){
      if(this.valid_pertes.size > 0){
        let item = Array.from(valid_pertes)[0]
        axios.get(`${this.url}/perte/${item}/valider/`, this.headers)
        .then((response) => {
          valid_pertes.delete(item)
          this.validPertes()
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, this.validPertes)
        });
      } else {
        this.validStocks()
      }
    },
    validStocks(){
      if(this.valid_stocks.size > 0){
        let item = Array.from(valid_stocks)[0]
        axios.get(`${this.url}/stock/${item}/valider/`, this.headers)
        .then((response) => {
          valid_stocks.delete(item)
          this.validStocks()
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, this.validStocks)
        });
      } else {
        this.delCommandes()
      }
    },
    delCommandes(){
      if(this.deleted_commandes.size > 0){
        let item = Array.from(deleted_commandes)[0]
        axios.remove(`${this.url}/perte/${item}/`, this.headers)
        .then((response) => {
          deleted_commandes.delete(item)
          this.delCommandes()
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, this.delCommandes)
        });
      } else {
        this.delStocks()
      }
    },
    delStocks(){
      if(this.deleted_stocks.size > 0){
        let item = Array.from(deleted_stocks)[0]
        axios.remove(`${this.url}/stock/${item}/`, this.headers)
        .then((response) => {
          deleted_stocks.delete(item)
          this.delStocks()
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, this.delStocks)
        });
      } else {
        this.delPertes()
      }
    },
    delPertes(){
      if(this.deleted_pertes.size > 0){
        let item = Array.from(deleted_pertes)[0]
        axios.remove(`${this.url}/perte/${item}/`, this.headers)
        .then((response) => {
          deleted_pertes.delete(item)
          this.delPertes()
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, this.delPertes)
        });
      } else {
        this.getCommandes()
      }
    },
    getCommandes(){
      if(!this.next_commandes){
        link = this.url+`/commande/?kiosk=${this.kiosk_id}`;
      } else {
        link = this.next_commandes
      }
      axios.get(link, this.headers)
      .then((response) => {
        response.data.results.forEach(x => this.$store.state.commandes.add(x))
        count_commandes += response.data.results.length
        if(!!response.data.next){
          this.next_commandes = response.data.next
          this.getCommandes()
        } else {
          this.next_commandes = null
          this.getPayments()
        }
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.getCommandes)
      });
    },
    getPayments(){
      if(!this.next_payments){
        link = this.url+`/payment/?commande__kiosk=${this.kiosk_id}`;
      } else {
        link = this.next_payments
      }
      axios.get(link, this.headers)
      .then((response) => {
        response.data.results.forEach(x => this.$store.state.payments.add(x))
        count_payments += response.data.results.length
        if(!!response.data.next){
          this.next_payments = response.data.next
          this.getPayments()
        } else {
          this.next_payments = null
          this.getProduits()
        }
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.getPayments)
      });
    },
    getProduits(){
      if(!this.next_produits){
        link = this.url+`/produit/?kiosk=${this.kiosk_id}`;
      } else {
        link = this.next_produits
      }
      axios.get(link, this.headers)
      .then((response) => {
        response.data.results.forEach(x => this.$store.state.produits.add(x))
        count_produits += response.data.results.length
        if(!!response.data.next){
          this.next_produits = response.data.next
          this.getProduits()
        } else {
          this.next_produits = null
          this.getPertes()
        }
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.getProduits)
      });
    },
    getPertes(){
      if(!this.next_pertes){
        link = this.url+`/perte/?kiosk=${this.kiosk_id}`;
      } else {
        link = this.next_pertes
      }
      axios.get(link, this.headers)
      .then((response) => {
        response.data.results.forEach(x => this.$store.state.pertes.add(x))
        count_pertes += response.data.results.length
        if(!!response.data.next){
          this.next_pertes = response.data.next
          this.getPertes()
        } else {
          this.next_pertes = null
          this.getStocks()
        }
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.getPertes)
      });
    },
    getStocks(){
      if(!this.next_stocks){
        link = this.url+`/stock/?kiosk=${this.kiosk_id}`;
      } else {
        link = this.next_stocks
      }
      axios.get(link, this.headers)
      .then((response) => {
        response.data.results.forEach(x => this.$store.state.stocks.add(x))
        count_stocks += response.data.results.length
        if(!!response.data.next){
          this.next_stocks = response.data.next
          this.getStocks()
        } else {
          this.next_stocks = null
          postCommandes
        }
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.getStocks)
      });
    },
    postCommandes(){

    },
    postPayments(){

    },
    postStocks(){

    },
    postPertes(){

    },
    postProduits(){

    },
  }
};
</script>
<style scoped>
.ion-padding{
  padding-bottom: 5px;
}
.line{
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
</style>