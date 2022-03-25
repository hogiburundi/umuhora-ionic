<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Synchronisation</h3>
      <div class="line">
        <div class="key">validation pertes</div>
        <div>{{ valid_pertes.size }}/{{ valid_pertes_count }}</div>
      </div>
      <div class="line">
        <div class="key">validation stocks</div>
        <div>{{ valid_stocks.size }}/{{ valid_stocks_count }}</div>
      </div>
      <div class="line">
        <div class="key">suppression commandes</div>
        <div>{{ deleted_commandes.size }}/{{ deleted_commandes_count }}</div>
      </div>
      <div class="line">
        <div class="key">suppression stocks</div>
        <div>{{ deleted_stocks.size }}/{{ deleted_stocks_count }}</div>
      </div>
      <div class="line">
        <div class="key">suppression pertes</div>
        <div>{{ deleted_pertes.size }}/{{ deleted_pertes_count }}</div>
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
      count_pertes: 0,count_produits: 0, valid_pertes_count:0,
      valid_pertes:new Set(), valid_stocks_count:0, valid_stocks:new Set(),
      deleted_commandes_count:0, deleted_commandes:new Set(),
      deleted_stocks_count:0, deleted_stocks:new Set(), deleted_pertes_count:0,
      deleted_pertes:new Set(), created_commandes_count:0, created_commandes:[],
      created_payments_count:0, created_payments:[], created_stocks_count:0,
      created_stocks:[], created_pertes_count:0, created_pertes:[],
      created_produits_count:0, created_produits:[]
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
      this.created_commandes = this.$store.state.commandes.filter(x => !!x.created)
      this.created_commandes_count = this.created_commandes.length
      this.created_payments = this.$store.state.payments.filter(x => !!x.created)
      this.created_payments_count = this.created_payments.length
      this.created_stocks = this.$store.state.stocks.filter(x => !!x.created)
      this.created_stocks_count = this.created_stocks.length
      this.created_pertes = this.$store.state.pertes.filter(x => !!x.created)
      this.created_pertes_count = this.created_pertes.length
      this.created_produits = this.$store.state.produits.filter(x => !!x.created)
      this.created_produits_count = this.created_produits.length
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