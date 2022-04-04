<template>
<div>
  <ion-col :data-id='item.id' :class="{'parent':true,'danger':item.quantite==0}">
    <div class="item">
      <div line="none">
        <b style="margin-right:5px">{{ item.produit.nom }}</b>
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
      <ion-col class="inline" v-if="!item.validated_by">
        <ion-button size="small" expand="full" fill="clear"
          style="margin: 0;" @click="validateStock">
          <ion-icon slot="icon-only" :src="getIcon('checkmarkDone')"/>
        </ion-button>
        <ion-button size="small" expand="full" fill="clear"
          style="margin: 0;" @click="deleteStock">
          <ion-icon slot="icon-only" color="danger" :src="getIcon('close')"/>
        </ion-button>
      </ion-col>
      <ion-button size="small" expand="full" fill="clear"
        style="margin: 0;" @click="perdre" v-else>
        <ion-icon slot="icon-only" :src="getIcon('removeCircleOutline')"/>
      </ion-button>
    </div>
  </ion-col>
  <div class="sep"></div>
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
  methods:{
    validateStock(){
      if(confirm("êtes-vous sur de vouloir valider ce stock?")){
        if(!this.item.id || this.item.id < 0){
          console.error(`seul les stocks provenant du serveur peuvent être validés`)
          return
        }
        this.item.validated_by = this.active_user
        let data = {
          id:this.item.id,
          user:this.active_user.id
        }
        this.$store.state.validated_stocks.add(data)
      }
    },
    deleteStock(){
      if(confirm("êtes-vous sur de vouloir supprimer ce stock?")){
        let index = this.$store.state.stocks.indexOf(this.item)
        if(index>=0){
          this.$store.state.stocks.splice(index, 1)
          if(!!this.item.id){
            let data = {
              id:this.item.id,
              user:this.active_user.id
            }
            this.$store.state.deleted_stocks.add(data)
          }
        } else {
          console.error(`erreur de suppression du stock ${this.item}`)
        }
      }
    },
    perdre(){
      this.$emit("perte")
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
.sep{
  height: 1px;
  background-color: lightgray;
  margin: 0 20px;
}
</style>