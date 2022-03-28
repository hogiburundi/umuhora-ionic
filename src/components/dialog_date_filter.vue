<template>
  <div class="dialog" v-if="active">
    <ion-list class="body ion-padding">
      <h3>Filtrage</h3>
      <ion-item class="ion-no-padding">
        <ion-label for="filtering">par ordre:</ion-label>
        <ion-select multiple="false" cancel-text="annuller" ok-text="valider">
          <ion-select-option value="bacon">Date croissant</ion-select-option>
          <ion-select-option value="olives">Date decroissant</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item class="ion-no-padding" button @click="showDu">
        <ion-label for="du">À partir du</ion-label>
        <ion-text slot=end>{{ datetime(du) }}</ion-text>
      </ion-item>
      <ion-datetime @ionChange="choosedDu" presentation="time-date"
        :value="du" v-if="du_shown"/>
      <ion-item class="ion-no-padding" button @click="showAu">
        <ion-label for="au">Jusqu'au</ion-label>
        <ion-text slot=end>{{ datetime(au) }}</ion-text>
      </ion-item>
      <ion-datetime @ionChange="choosedAu" presentation="time-date"
        :value="au" v-if="au_shown"/>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">
          ANULLER
        </ion-button>
        <ion-button fill=clear>VALIDER</ion-button>
      </ion-col>
    </ion-list>
  </div>
</template>

<script >
export default {
  props: {
    active:{type:Boolean, required:true}
  },
  data(){
    return {
      du:new Date().toISOString(), au:new Date().toISOString(), 
      du_shown:false, au_shown:false,
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    choosedDu(event){
      this.du = event.target.value
      this.du_shown = false
    },
    choosedAu(event){
      this.au = event.target.value
      this.au_shown = false
    },
    showDu(){
      this.au_shown = false
      this.du_shown = true
    },
    showAu(){
      this.du_shown = false
      this.au_shown = true
    }
  },
  computed:{
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
.body{
  max-height: 80%;
  overflow-y: auto;
}
</style>