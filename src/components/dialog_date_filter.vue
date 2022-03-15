<template>
  <div class="dialog">
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
      <div class="options">
        <ion-button fill=clear color="medium">ANULLER</ion-button>
        <ion-button fill=clear>VALIDER</ion-button>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    item:{type:Object, required:true}
  },
  data(){
    return {
    }
  },
  methods: {
  },
  computed:{
  }
};
</script>
<style scoped>
</style>