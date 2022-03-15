<template>
  <div class="parent" lines="none">
    <ion-button color="medium">-</ion-button>
    <ion-button>+</ion-button>
    <ion-label>1.0 x Umuceri à 2 500 par kg</ion-label>
    <ion-icon :src="getIcon('close')" color="danger"/>
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
.parent{
  display: flex;
  align-items: center;
}
ion-label{
  flex-grow: 1;
}
</style>