<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Hitamwo</h3>
      <ion-radio-group ref="kiosk">
        <ion-item lines="none" v-for="kiosk in active_user.kiosks">
          <ion-radio :value="kiosk" :id="kiosk.id"/>
          <ion-label :for="kiosk.id">{{ kiosk.nom }}</ion-label>
        </ion-item>
      </ion-radio-group>
      <ion-col class="options">
        <ion-button fill=clear @click="chooseKiosk">
          VALIDER
        </ion-button>
      </ion-col>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    active:{type:Boolean, required:true}
  },
  data(){
    return {
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    chooseKiosk(){
      this.$store.state.active_kiosk = this.$refs.kiosk.value
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
ion-radio{
  margin-right: 5px;
}
.dialog{
  z-index: 1001;
}
</style>