<template>
  <div :data-id='item.id' :class="{'parent':true,'danger':item.quantite==0}">
    <div class="item">
      <b>01 Mar 2022 14:34:13</b>
      <div class="inline">
        <div class="group">
          <div class="key">Vente: </div>
          <div>0</div>
        </div>
        <div class="group">
          <div class="key">Dettes: </div>
          <div>0</div>
        </div>
        <div class="group">
          <div class="key">NET: </div>
          <div>0</div>
        </div>
      </div>
      <div class="group">
        <div class="key">prise par: </div>
        <div>Jonathan NKURUNZIZA</div>
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