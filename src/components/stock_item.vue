<template>
  <div :data-id='item.id' :class="{'parent':true,'danger':item.quantite==0}">
    <div class="item">
      <div>{{ item.nom }}</div>
      <div class="inline">
        <div class="info">
          <div>Qtt.:</div>
          {{item.quantite || 0}} {{item.unite_sortante}}
        </div>
        <div class="info">
          <div>PU:</div>
          {{ money(item.prix_vente) }} Fbu
        </div>
      </div>
    </div>
    <div class="inline">
      <ion-button size="small" expand="full" fill="clear"
        style="margin: 0;" @click="decreaseQtt">
        <ion-icon :src="getIcon('pencil')"/>
      </ion-button>
      <ion-button size="small" expand="full" fill="clear"
        style="margin: 0;" @click="increaseQtt">
        <ion-icon :src="getIcon('bagAdd')"/>
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
  methods: {
    increaseQtt : function(){
      this.cart.add(this.item);
    },
    decreaseQtt : function(){
      this.cart.decrease(this.item.id);
    },
    enableEdition(){
      if(this.item.quantite!=0) this.editable=true
    }
  },
  computed:{
    qtt:{
      get(){
        return 0
        // return this.cart.getQuantite(this.item.id);
      },
      set(value){
        if(value.length==0) return;
        this.cart.add(this.item, value);
      }
    }
  }
};
</script>
<style scoped>
.parent{
  display: flex;
  margin: 10px 0;
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
</style>