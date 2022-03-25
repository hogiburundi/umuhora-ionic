<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Synchronisation</h3>
      <ion-col class="options">
        <ion-button fill=clear @click="close">STOPPER</ion-button>
      </ion-col>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    active:{type:Boolean, required:true},
  },
  data(){
    return {
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
.ion-padding{
  padding-bottom: 5px;
}
</style>