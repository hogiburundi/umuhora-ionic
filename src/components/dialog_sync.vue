<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Synchronisation</h3>
      <div class="line" :class="{'active':validating_pertes}">
        <div class="key">validation pertes</div>
        <div>
          {{ valid_pertes_count-valid_pertes.size }}/{{ valid_pertes_count }}
        </div>
      </div>
      <div class="line" :class="{'active':validating_stocks}">
        <div class="key">validation stocks</div>
        <div>
          {{ valid_stocks_count-valid_stocks.size }}/{{ valid_stocks_count }}
        </div>
      </div>
      <div class="line" :class="{'active':deleting_commandes}">
        <div class="key">suppression payments</div>
        <div>
          {{ deleted_commandes_count-deleted_commandes.size }}/{{ deleted_commandes_count }}
        </div>
      </div>
      <div class="line" :class="{'active':deleting_stocks}">
        <div class="key">suppression stocks</div>
        <div>
          {{ deleted_stocks_count-deleted_stocks.size }}/{{ deleted_stocks_count }}
        </div>
      </div>
      <div class="line" :class="{'active':deleting_pertes}">
        <div class="key">suppression pertes</div>
        <div>
          {{ deleted_pertes_count-deleted_pertes.size }}/{{ deleted_pertes_count }}
        </div>
      </div>
      <div class="line" :class="{'active':sending_commandes}">
        <div class="key">envoie commandes</div>
        <div>
          {{ created_commandes_count - created_commandes.length }}/{{ created_commandes_count }}
        </div>
      </div>
      <div class="line" :class="{'active':sending_payments}">
        <div class="key">envoie payments</div>
        <div>
          {{ created_payments_count - created_payments.length }}/{{ created_payments_count }}
        </div>
      </div>
      <div class="line" :class="{'active':sending_stocks}">
        <div class="key">envoie stocks</div>
        <div>
          {{ created_stocks_count - created_stocks.length }}/{{ created_stocks_count }}
        </div>
      </div>
      <div class="line" :class="{'active':sending_pertes}">
        <div class="key">envoie pertes</div>
        <div>
          {{ created_pertes_count - created_pertes.length }}/{{ created_pertes_count }}
        </div>
      </div>
      <div class="line" :class="{'active':sending_produits}">
        <div class="key">envoie produits</div>
        <div>
          {{ created_produits_count - created_produits.length }}/{{ created_produits_count }}
        </div>
      </div>
      <div class="line" :class="{'active':receiving_commandes}">
        <div class="key">reception commandes</div>
        <div>{{ count_commandes }}</div>
      </div>
      <div class="line" :class="{'active':receiving_payments}">
        <div class="key">reception payments</div>
        <div>{{ count_payments }}</div>
      </div>
      <div class="line" :class="{'active':receiving_stocks}">
        <div class="key">reception stocks</div>
        <div>{{ count_stocks }}</div>
      </div>
      <div class="line" :class="{'active':receiving_pertes}">
        <div class="key">reception pertes</div>
        <div>{{ count_pertes }}</div>
      </div>
      <div class="line" :class="{'active':receiving_produits}">
        <div class="key">reception produits</div>
        <div>{{ count_produits }}</div>
      </div>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="stopper">
          ANULLER
        </ion-button>
        <ion-button fill=clear @click="fetch"  v-if="!in_action">
          COMMENCER
        </ion-button>
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
      in_action:false,

      count_stocks: 0, count_pertes: 0, count_produits: 0, valid_stocks_count: 0,
      valid_pertes_count: 0, deleted_commandes_count: 0, deleted_stocks_count: 0,
      deleted_pertes_count: 0, created_commandes_count: 0, created_payments_count: 0,
      created_stocks_count: 0, created_pertes_count: 0, created_produits_count: 0,
      count_commandes: 0, count_payments: 0,

      next_commandes: null, next_payments: null, next_stocks: null,
      next_pertes: null, next_produits: null,

      validating_pertes: false,validating_stocks: false,deleting_commandes: false,
      deleting_stocks: false,deleting_pertes: false,receiving_commandes: false,
      receiving_payments: false,receiving_stocks: false,receiving_pertes: false,
      receiving_produits: false,sending_commandes: false,sending_payments: false,
      sending_stocks: false,sending_pertes: false,sending_produits: false,

      valid_pertes:new Set(),  valid_stocks:new Set(), deleted_commandes:new Set(),
      deleted_stocks:new Set(), deleted_pertes:new Set(),

      created_commandes:[], created_payments:[], created_stocks:[],
      created_pertes:[], created_produits:[]
    }
  },
  watch:{
    active(new_val){
      if(new_val){
        this.count_stocks= 0
        this.count_pertes= 0
        this.count_produits= 0
        this.valid_stocks_count= 0
        this.valid_pertes_count= 0
        this.deleted_commandes_count= 0
        this.deleted_stocks_count= 0
        this.deleted_pertes_count= 0
        this.created_commandes_count= 0
        this.created_payments_count= 0
        this.created_stocks_count= 0
        this.created_pertes_count= 0
        this.created_produits_count= 0
        this.count_commandes= 0
        this.count_payments= 0
        
        this.validating_pertes= false
        this.validating_stocks= false
        this.deleting_commandes= false
        this.deleting_stocks= false
        this.deleting_pertes= false
        this.receiving_commandes= false
        this.receiving_payments= false
        this.receiving_stocks= false
        this.receiving_pertes= false
        this.receiving_produits= false
        this.sending_commandes= false
        this.sending_payments= false
        this.sending_stocks= false
        this.sending_pertes= false
        this.sending_produits= false

        this.valid_pertes = this.$store.state.validated_pertes
        this.valid_stocks = this.$store.state.validated_stocks
        this.deleted_commandes = this.$store.state.deleted_commandes
        this.deleted_stocks = this.$store.state.deleted_stocks
        this.deleted_pertes = this.$store.state.deleted_pertes

        this.valid_pertes_count = this.valid_pertes.size
        this.valid_stocks_count = this.valid_stocks.size
        this.deleted_commandes_count = this.deleted_commandes.size
        this.deleted_stocks_count = this.deleted_stocks.size
        this.deleted_pertes_count = this.deleted_pertes.size

        this.created_commandes = Object.values(this.$store.state.commandes).filter(x => !!x.created)
        this.created_commandes_count = this.created_commandes.length
        this.created_payments = Object.values(this.$store.state.payments).filter(x => !!x.created)
        this.created_payments_count = this.created_payments.length
        this.created_stocks = Object.values(this.$store.state.stocks).filter(x => !!x.created)
        this.created_stocks_count = this.created_stocks.length
        this.created_pertes = Object.values(this.$store.state.pertes).filter(x => !!x.created)
        this.created_pertes_count = this.created_pertes.length
        this.created_produits = Object.values(this.$store.state.produits).filter(x => !!x.created)
        this.created_produits_count = this.created_produits.length
      }
    }
  },
  methods: {
    stopper(){
      if(this.in_action){
        this.in_action = false
      } else {
        this.$emit("close")
      }
    },
    fetch(){
      let link = ""
      if(this.getActiveKiosk()==null){
        return
      }
      this.kiosk_id = this.getActiveKiosk().id
      this.in_action = true
      this.validPertes()
    },
    validPertes(){
      let link;
      this.validating_pertes = true
      if(!this.in_action) return
      if(this.valid_pertes.size > 0){
        let item = Array.from(this.valid_pertes)[0]
        axios.get(`${this.url}/perte/${item}/valider/`, this.headers)
        .then((response) => {
          this.valid_pertes.delete(item)
          this.validPertes()
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, null)
          this.valid_pertes.delete(item)
          this.validPertes()
        });
      } else {
        this.validStocks()
      }
    },
    validStocks(){
      let link;
      this.validating_stocks = true
      if(!this.in_action) return
      if(this.valid_stocks.size > 0){
        let item = Array.from(this.valid_stocks)[0]
        axios.get(`${this.url}/stock/${item.id}/valider/`, this.headers)
        .then((response) => {
          this.valid_stocks.delete(item)
          this.validStocks()
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, null)
          this.valid_stocks.delete(item)
          this.validPertes()
        });
      } else {
        this.delCommandes()
      }
    },
    delCommandes(){
      let link;
      this.deleting_commandes = true
      if(!this.in_action) return
      if(this.deleted_commandes.size > 0){
        let item = Array.from(this.deleted_commandes)[0]
        axios.delete(`${this.url}/commande/${item}/`, this.headers)
        .then((response) => {
          this.delCommandes()
        }).catch((error) => {
          console.error(error.response.data)
          this.deleted_commandes.delete(item)
          this.delCommandes()
        });
      } else {
        this.delStocks()
      }
    },
    delStocks(){
      let link;
      this.deleting_stocks = true
      if(!this.in_action) return
      if(this.deleted_stocks.size > 0){
        let item = Array.from(this.deleted_stocks)[0]
        axios.delete(`${this.url}/stock/${item}/`, this.headers)
        .then((response) => {
          this.deleted_stocks.delete(item)
          this.delStocks()
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, this.delStocks)
        });
      } else {
        this.delPertes()
      }
    },
    delPertes(){
      let link;
      this.deleting_pertes = true
      if(!this.in_action) return
      if(this.deleted_pertes.size > 0){
        let item = Array.from(this.deleted_pertes)[0]
        axios.delete(`${this.url}/perte/${item}/`, this.headers)
        .then((response) => {
          this.deleted_pertes.delete(item)
          this.delPertes()
        }).catch((error) => {
          this.displayErrorOrRefreshToken(error, this.delPertes)
        });
      } else {
        this.postCommandes()
      }
    },
    postCommandes(){
      let link;
      this.sending_commandes = true
      if(!this.in_action) return
      if(this.created_commandes.length > 0){
        let item = this.created_commandes[0]
        if(!item.created){
          this.created_commandes.splice(0, 1)
          this.postCommandes()
          return
        }
        axios.post(this.url+`/commande/`, item.created, this.headers)
        .then((response) => {
          this.created_commandes.splice(0, 1)
          delete(this.$store.state.commandes[item.id])
          this.$store.state.commandes[response.data.id] = response.data
          this.postCommandes()
        }).catch((error) => {
          if(!!error.response && error.response.status == 400){
            this.created_commandes.splice(0, 1)
            this.postCommandes()
          } else{
            this.displayErrorOrRefreshToken(error, this.postCommandes)
          }
        });
      } else {
        this.postPayments()
      }
    },
    postPayments(){
      let link;
      this.sending_payments = true
      if(!this.in_action) return
      if(this.created_payments.length > 0){
        let item = this.created_payments[0]
        if(!item.created){
          this.created_payments.splice(0, 1)
          this.postPayments()
          return
        }
        axios.post(this.url+`/payment/`, item.created, this.headers)
        .then((response) => {
          this.created_payments.splice(0, 1)
          delete(this.$store.state.payments[item.id])
          this.$store.state.payments[response.data.id] = response.data
          this.postPayments()
        }).catch((error) => {
          if(!!error.response && error.response.status == 400){
            this.created_payments.splice(0, 1)
            this.postPayments()
          } else{
            this.displayErrorOrRefreshToken(error, this.postPayments)
          }
        });
      } else {
        this.postStocks()
      }
    },
    postStocks(){
      let link;
      this.sending_stocks = true
      if(!this.in_action) return
      if(this.created_stocks.length > 0){
        let item = this.created_stocks[0]
        if(!item.created){
          this.created_stocks.splice(0, 1)
          this.postStocks()
          return
        }
        axios.post(this.url+`/stock/`, item.created, this.headers)
        .then((response) => {
          this.created_stocks.splice(0, 1)
          delete(this.$store.state.stocks[item.id])
          this.$store.state.stocks[response.data.id] = response.data
          this.postStocks()
        }).catch((error) => {
          if(!!error.response && error.response.status == 400){
            this.created_stocks.splice(0, 1)
            this.postStocks()
          }
          this.displayErrorOrRefreshToken(error, this.postStocks)
        });
      } else {
        this.postPertes()
      }
    },
    postPertes(){
      let link;
      this.sending_pertes = true
      if(!this.in_action) return
      if(this.created_pertes.length > 0){
        let item = this.created_pertes[0]
        if(!item.created){
          this.created_pertes.splice(0, 1)
          this.postPertes()
          return
        }
        axios.post(this.url+`/perte/`, item.created, this.headers)
        .then((response) => {
          this.created_pertes.splice(0, 1)
          delete(this.$store.state.pertes[item.id])
          this.$store.state.pertes[response.data.id] = response.data
          this.postPertes()
        }).catch((error) => {
          if(!!error.response && error.response.status == 400){
            this.created_pertes.splice(0, 1)
            this.postPertes()
          }
          this.displayErrorOrRefreshToken(error, this.postPertes)
        });
      } else {
        this.postProduits()
      }
    },
    postProduits(){
      let link;
      this.sending_produits = true
      if(!this.in_action) return
      if(this.created_produits.length > 0){
        let item = this.created_produits[0]
        if(!item.created){
          this.created_produits.splice(0, 1)
          this.postProduits()
          return
        }
        axios.post(this.url+`/produit/`, item.created, this.headers)
        .then((response) => {
          this.created_produits.splice(0, 1)
          delete(this.$store.state.produits[item.id])
          this.$store.state.produits[response.data.id] = response.data
          this.postProduits()
        }).catch((error) => {
          if(!!error.response && error.response.status == 400){
            this.created_produits.splice(0, 1)
            this.postProduits()
          } else{
            this.displayErrorOrRefreshToken(error, this.postProduits)
          }
        });
      } else {
        this.getCommandes()
      }
    },
    getCommandes(){
      let link;
      this.receiving_commandes = true
      if(!this.in_action) return
      if(!this.next_commandes){
        link = this.url+`/commande/?kiosk=${this.kiosk_id}`;
      } else {
        link = this.next_commandes
      }
      axios.get(link, this.headers)
      .then((response) => {
        response.data.results.forEach(x => this.$store.state.commandes[x.id]=x)
        this.count_commandes += response.data.results.length
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
      let link;
      this.receiving_payments = true
      if(!this.in_action) return
      if(!this.next_payments){
        link = this.url+`/payment/?commande__kiosk=${this.kiosk_id}`;
      } else {
        link = this.next_payments
      }
      axios.get(link, this.headers)
      .then((response) => {
        response.data.results.forEach(x => this.$store.state.payments[x.id]=x)
        this.count_payments += response.data.results.length
        if(!!response.data.next){
          this.next_payments = response.data.next
          this.getPayments()
        } else {
          this.next_payments = null
          this.getStocks()
        }
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.getPayments)
      });
    },
    getStocks(){
      let link;
      this.receiving_stocks = true
      if(!this.in_action) return
      if(!this.next_stocks){
        link = this.url+`/stock/?kiosk=${this.kiosk_id}`;
      } else {
        link = this.next_stocks
      }
      axios.get(link, this.headers)
      .then((response) => {
        response.data.results.forEach(x => this.$store.state.stocks[x.id]=x)
        this.count_stocks += response.data.results.length
        if(!!response.data.next){
          this.next_stocks = response.data.next
          this.getPertes()
        } else {
          this.next_stocks = null
          this.getPertes()
        }
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.getStocks)
      });
    },
    getPertes(){
      let link;
      this.receiving_pertes = true
      if(!this.in_action) return
      if(!this.next_pertes){
        link = this.url+`/perte/?kiosk=${this.kiosk_id}`;
      } else {
        link = this.next_pertes
      }
      axios.get(link, this.headers)
      .then((response) => {
        response.data.results.forEach(x => this.$store.state.pertes[x.id]=x)
        this.count_pertes += response.data.results.length
        if(!!response.data.next){
          this.next_pertes = response.data.next
          this.getPertes()
        } else {
          this.next_pertes = null
          this.getProduits()
        }
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.getPertes)
      });
    },
    getProduits(){
      let link;
      this.receiving_produits = true
      if(!this.in_action) return
      if(!this.next_produits){
        link = this.url+`/produit/?kiosk=${this.kiosk_id}`;
      } else {
        link = this.next_produits
      }
      axios.get(link, this.headers)
      .then((response) => {
        response.data.results.forEach(x => this.$store.state.produits[x.id]=x)
        this.count_produits += response.data.results.length
        if(!!response.data.next){
          this.next_produits = response.data.next
          this.getProduits()
        } else {
          this.next_produits = null
          this.in_action = false
        }
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.getProduits)
      });
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
.active{
  font-weight: 700;
}
</style>