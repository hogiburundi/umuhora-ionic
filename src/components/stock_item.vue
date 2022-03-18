<template>
  <ion-col :data-id='item.id' :class="{'parent':true,'danger':item.quantite==0}">
    <div class="item">
      <div>{{ item.nom }}</div>
      <div class="inline">
        <div class="info">
          <div>Qtt.:</div>
          {{item.quantite || 0}} {{item.unite}}
        </div>
        <div class="info">
          <div>PU:</div>
          {{ money(item.prix_vente) }} Fbu
        </div>
      </div>
    </div>
    <ion-list class="inline">
      <ion-button size="small" fill="clear" @click="editStock">
        <ion-icon :src="getIcon('pencil')"/>
      </ion-button>
      <ion-button size="small" fill="clear" @click="increaseQtt">
        <ion-icon :src="getIcon('bagAdd')"/>
      </ion-button>
    </ion-list>
  </ion-col>
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
  methods:{
    editStock(){
      this.$emit("edit")
    },
    increaseQtt(){
      this.$emit("buy")
    }
  }
};
</script>
<style scoped>
.parent{
  display: flex;
  margin: 10px 0 0 10px;
  padding: 0;
  width: 100%;
}
.item{
  flex-grow: 1;
}
.info{
  font-size: .8em;
  margin-right: 5px;
  display: flex;
  flex-grow: 1;
}
.info>*{
  margin-right: 5px;
  display: flex;
}
.inline{
  display: flex;
}
ion-button{
  margin: 0
}
</style>