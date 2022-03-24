<template>
  <ion-col :data-id='item.id' :class="{'parent':true,'danger':item.quantite==0}">
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
    <div v-if="!item.validated_by">
      <ion-button size="small" expand="full" fill="clear"
        style="margin: 0;" @click="validateStock">
        <ion-icon slot="icon-only" :src="getIcon('checkmarkDone')"/>
      </ion-button>
      <ion-button size="small" expand="full" fill="clear"
        style="margin: 0;" @click="deleteStock">
        <ion-icon slot="icon-only" color="danger" :src="getIcon('close')"/>
      </ion-button>
    </div>
    <div v-else style="min-width: 20px;">
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
    validateStock(){
      if(confirm("êtes-vous sur de vouloir valider cette perte?")){
        this.item.validated_by = this.active_user
        let data = {
          id:this.item.id,
          user:this.active_user.id
        }
        this.$store.state.validated_pertes.add(data)
      }
    },
    deleteStock(){
      if(confirm("êtes-vous sur de vouloir supprimer cette perte?")){
        let index = this.$store.state.pertes.indexOf(this.item)
        if(index>=0){
          this.$store.state.pertes.splice(index, 1)
          let data = {
            id:this.item.id,
            user:this.active_user.id
          }
          this.$store.state.deleted_pertes.add(data)
        } else {
          console.error(`erreur de suppression de la perte ${this.item}`)
        }
      }
    },
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