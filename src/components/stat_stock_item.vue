<template>
  <div :data-id='item.id' :class="{'parent':true,'danger':item.quantite==0}">
    <div class="item">
      <div line="none">
        <b>{{ item.produit.nom }}</b>
        <span> {{ datetime(item.date) }}</span>
      </div>
      <div class="inline">
        <div class="group">
          <div class="key">Qtt init.: </div>
          <div>{{ item.quantite_initiale }}</div>
        </div>
        <div class="group">
          <div class="key">Qtt act.: </div>
          <div>{{ item.quantite_actuelle }}</div>
        </div>
        <div class="group">
          <div class="key">PT: </div>
          <div>{{ money(item.prix_total) }}</div>
        </div>
      </div>
    </div>
    <div class="inline">
      <div class="inline" v-if="!item.validated_by">
        <ion-button size="small" expand="full" fill="clear"
          style="margin: 0;" @click="">
          <ion-icon :src="getIcon('checkmarkDone')"/>
        </ion-button>
        <ion-button size="small" expand="full" fill="clear"
          style="margin: 0;" @click="">
          <ion-icon color="danger" :src="getIcon('close')"/>
        </ion-button>
      </div>
      <ion-button size="small" expand="full" fill="clear"
        style="margin: 0;" @click="" v-else>
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