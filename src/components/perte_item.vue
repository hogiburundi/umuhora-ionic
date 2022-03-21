<template>
  <div :data-id='item.id' :class="{'parent':true,'danger':item.quantite==0}">
    <div class="item">
      <div class="inline">
        <div class="group">
          <b style="margin-right: 3px;">3</b> {{ item.stock }}
        </div>
        <div>{{ money(item.prix) }} FBU</div>
      </div>
      <div class="group">
        <div>{{ item.user }}</div>
        <b>{{ datetime(item.date) }}</b>
      </div>
      <div class="descr">{{ item.details }}</div>
    </div>
    <div>
      <ion-button size="small" expand="full" fill="clear"
        style="margin: 0;" @click="increaseQtt">
        <ion-icon :src="getIcon('checkmarkDone')"/>
      </ion-button>
      <ion-button size="small" expand="full" fill="clear"
        style="margin: 0;" @click="increaseQtt">
        <ion-icon color="danger" :src="getIcon('close')"/>
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
.group>div{
  margin-right: 10px;
}
.descr{
  font-size: .9em;
}
</style>