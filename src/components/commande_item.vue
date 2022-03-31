<template>
  <ion-col :data-id='item.id' :class="{'parent':true,'danger':item.quantite==0}">
    <div class="item">
      <b>No. {{item.id}} du {{ datetime(item.date) }}</b>
      <div class="inline">
        <div class="group">
          <div class="key">Montant: </div>
          <div>{{ money(item.prix) }}</div>
        </div>
        <div class="group">
          <div class="key">Payée: </div>
          <div>{{ item.payee }}</div>
        </div>
        <div class="group">
          <div class="key">Reste: </div>
          <div>{{ item.prix - item.payee }}</div>
        </div>
      </div>
      <div class="group">
        <div class="key">Client: </div>
        <div>{{ item.client }}</div>
      </div>
    </div>
    <div class="inline" text-center button>
      <ion-button size="small" expand="full" fill="clear"
        style="margin: 0;" @click="deleteCommande">
        <ion-icon color="danger" slot="icon-only" :src="getIcon('close')"/>
      </ion-button>
    </div>
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
  methods: {
    enableEdition(){
      if(this.item.quantite!=0) this.editable=true
    },
    deleteCommande(){
      if(confirm("Voulez-vous anuller cette vente?")){
        this.$store.state.deleted_commandes.add(this.item.id)
        delete(this.$store.state.commandes[this.item.id])
      }
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
  margin: 0 10px 5px 10px;
}
.item{
  flex-grow: 1;
}
.inline{
  display: flex;
  justify-content: space-between;
}
.group>*{
  display: inline-block;
}
.key{
  font-size: .8em;
  margin-right: 2px;
}
</style>