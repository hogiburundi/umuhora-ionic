<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Filtrage</h3>
      <div class="field">
        <label for="filtering">par ordre:</label>
        <select id="filtering">
          <option>Date croissant</option>
          <option>Date decroissant</option>
        </select>
      </div>
      <div class="field">
        <label for="du">À partir du</label>
        <input type="date" id="du">
        <label for="au">Jusqu'au</label>
        <input type="date" id="au">
      </div>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">
          ANULLER
        </ion-button>
        <ion-button fill=clear>VALIDER</ion-button>
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
</style>