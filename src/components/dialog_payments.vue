<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Paiments facture #{{ item.id }}</h3>
      <ion-list>
        <ion-item class="ion-no-padding" v-for="payment in payments">
          <div>
            <div class="inline">
              <div>{{ datetime(payment.date) }}</div>
              <div>payee: <b>{{ money(payment.montant) }}</b></div>
            </div>
            <div>user: {{ payment.user }}</div>
          </div>
        </ion-item>
      </ion-list>
      <ion-col class="options">
        <ion-button fill=clear @click="close">OK</ion-button>
      </ion-col>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    active:{type:Boolean, required:true},
    item:{type:Object, required:false},
  },
  computed:{
    payments(){
      return this.$store.state.payments.filter(x => x.commande==this.item.id)
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
  }
};
</script>
<style scoped>
.options{
  padding-bottom: 0;
}
.ion-padding{
  padding-bottom: 5px;
}
.inline>div{
  display: inline-block;
  margin-right: 10px;
}
</style>