<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Synchronisation</h3>
      <div class="line">
        <div class="key">validation pertes</div>
        <div>0/{{valid_pertes.size}}</div>
      </div>
      <div class="line">
        <div class="key">validation stocks</div>
        <div>0/{{valid_stocks.size}}</div>
      </div>
      <div class="line">
        <div class="key">suppression commandes</div>
        <div>0/{{ deleted_commandes.size }}</div>
      </div>
      <div class="line">
        <div class="key">suppression stocks</div>
        <div>0/{{ deleted_stocks.size }}</div>
      </div>
      <div class="line">
        <div class="key">suppression pertes</div>
        <div>0/{{ deleted_pertes.size }}</div>
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
        <div>0/{{ created_commandes.length }}</div>
      </div>
      <div class="line">
        <div class="key">envoie payments</div>
        <div>0/{{ created_payments.length }}</div>
      </div>
      <div class="line">
        <div class="key">envoie stocks</div>
        <div>0/{{ created_stocks.length }}</div>
      </div>
      <div class="line">
        <div class="key">envoie pertes</div>
        <div>0/{{ created_pertes.length }}</div>
      </div>
      <div class="line">
        <div class="key">envoie produits</div>
        <div>0/{{ created_produits.length }}</div>
      </div>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">ANULLER</ion-button>
        <ion-button fill=clear @click="">COMMENCER</ion-button>
      </ion-col>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    active:{
      type:Boolean, required:true
    },
  },
  data(){
    return {
      count_commandes: 0,count_payments: 0,count_stocks: 0,
      count_pertes: 0,count_produits: 0, valid_pertes:new Set(),
      valid_stocks:new Set(), deleted_commandes:new Set(),
      deleted_stocks:new Set(), deleted_pertes:new Set(),
      created_commandes:[], created_payments:[], created_stocks:[],
      created_pertes:[], created_produits:[]
    }
  },
  watch:{
    active(new_val){
      this.valid_pertes = this.$store.state.validated_pertes
      this.valid_stocks = this.$store.state.validated_stocks
      this.deleted_commandes = this.$store.state.deleted_commandes
      this.deleted_stocks = this.$store.state.deleted_stocks
      this.deleted_pertes = this.$store.state.deleted_pertes
      this.created_commandes = this.$store.state.commandes.filter(x => !!x.created)
      this.created_payments = this.$store.state.payments.filter(x => !!x.created)
      this.created_stocks = this.$store.state.stocks.filter(x => !!x.created)
      this.created_pertes = this.$store.state.pertes.filter(x => !!x.created)
      this.created_produits = this.$store.state.produits.filter(x => !!x.created)
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    validPertes(){

    },
    validStocks(){

    },
    delCommandes(){

    },
    delStocks(){

    },
    delPertes(){

    },
    getCommandes(){

    },
    getPayments(){

    },
    getStocks(){

    },
    getPertes(){

    },
    getProduits(){

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