<template>
  <ion-col :data-id='item.id' :class="{'parent':true,'danger':item.quantite==0}">
    <div class="item" @click="$emit('click')">
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
        <div>{{ client }}</div>
      </div>
    </div>
    <div class="inline" text-center button>
      <ion-button size="small" expand="full" fill="clear"
        style="margin: 0;" @click.stop="deleteCommande">
        <ion-icon color="danger" slot="icon-only" :src="getIcon('close')"/>
      </ion-button>
    </div>
  </ion-col>
</template>

<script >
import { alertController } from '@ionic/vue';

export default {
  props: {
    item:{type:Object, required:true}
  },
  computed:{
    client(){
      if(!!this.item.client){
        if(this.item.id > 0){
          return this.item.client
        } else {
          return `${this.item.client.nom} ${this.item.client.tel}`
        }
      } else {
        return "-"
      }
    }
  },
  methods: {
    deleteCommande(){
      alertController.create({
        header: 'Attention!',
        message: 'Voulez-vous vraiment supprimer cette commande?',
        buttons: [
          {
            text: 'laisser',
            role: 'cancel'
          },
          {
            text: 'OUI',
            handler: () => {
              let elapsed = (new Date() - new Date(this.item.date)) / (1000*60)
              if(elapsed > 60){
                this.makeToast("Erreur", "Le temps de suppression expirée")
              } else {
                this.$store.state.deleted_commandes.add(this.item.id)
                delete(this.$store.state.commandes[this.item.id])
              }
            },
          },
        ],
      }).then(res => {
        res.present();
      });
    }
  },
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