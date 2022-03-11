<template>
  <div :data-id='item.id' :class="{'parent':true,'danger':item.quantite==0}">
    <div class="item">
      <div line="none">
        <b>Ndagala</b>
        <span> 01 Mar 2022 02:00:00</span>
      </div>
      <div class="inline">
        <div class="group">
          <div class="key">Qtt init.: </div>
          <div>0</div>
        </div>
        <div class="group">
          <div class="key">Qtt act.: </div>
          <div>0</div>
        </div>
        <div class="group">
          <div class="key">PT: </div>
          <div>0</div>
        </div>
      </div>
    </div>
    <div class="inline">
      <div class="inline" v-if="Math.random() < 0.5">
        <ion-button size="small" expand="full" fill="clear"
          style="margin: 0;" @click="increaseQtt">
          <ion-icon :src="getIcon('checkmarkDone')"/>
        </ion-button>
        <ion-button size="small" expand="full" fill="clear"
          style="margin: 0;" @click="increaseQtt">
          <ion-icon color="danger" :src="getIcon('close')"/>
        </ion-button>
      </div>
      <ion-button size="small" expand="full" fill="clear"
        style="margin: 0;" @click="increaseQtt" v-else>
        <ion-icon :src="getIcon('removeCircleOutline')"/>
      </ion-button>
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
      cart : this.$store.state.cart,
      editable:false
    }
  },
};
</script>
<style scoped>
.parent{
  display: flex;
  margin: 0 10px 15px 10px;
}
.item{
  flex-grow: 1;
}
.inline{
  display: flex;
  justify-content: space-between;
}
.group{
  display: flex;
  align-items: baseline;
}
.key{
  font-size: .8em;
  margin-right: 2px;
}
</style>