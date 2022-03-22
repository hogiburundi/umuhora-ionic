<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Perte facture #{{ item.id }}</h3>
      <div class="payment">
        <ion-label>Montant à payer:</ion-label>
        <b>{{ money(ideni) }}</b>
        <ion-label>BIF</ion-label>
      </div>
      <ion-item class="ion-no-padding">
        <ion-label position="floating">Payée</ion-label>
        <ion-input type=number placeholder="Payée" :value="ideni"
          @IonChange="payee=$event.target.value" clearInput/>
      </ion-item>
      <ion-label position="floating">
      <div class="payment">
        <ion-label>{{ ingaru>0?"ayo kugarura":"haburako" }}:</ion-label>
        <b>{{ money(Math.abs(ingaru)) }}</b>
        <ion-label>BIF</ion-label>
      </div>
      </ion-label>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">
          ANULLER
        </ion-button>
        <ion-button fill=clear @click="save">SOUMETTRE</ion-button>
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
  data(){
    return {
      payee:0, ingaru:0
    }
  },
  computed:{
    ideni(){
      return this.item.prix - this.item.payee
    },
  },
  watch:{
    payee(new_val){
      this.ingaru = new_val - this.ideni
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    save(){

    }
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
</style>