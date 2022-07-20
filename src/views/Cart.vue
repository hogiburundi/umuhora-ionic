<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/home/vente">
            <ion-icon :src="getIcon('arrowBack')"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>UMUHORA</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <CartItem v-for="item in cart.content" :item="item"/>
      <div class="total">
        <div>Total:</div>
        <b>{{ money(cart.getTotal()) }} </b>
        <div> BIF</div>
      </div>
      <center @click="show_client_form = !show_client_form">
        <a href="#" v-if="!show_client_form">
          Afficher le formulaire client
        </a>
        <a href="#" v-else>
          Fermer le formulaire client
        </a>
      </center>
      <ion-col class="create" v-if="show_client_form">
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Nom du client</ion-label>
          <ion-input type=text placeholder="Nom du client"
            :value="nom" @IonChange="setNom($event.target.value)" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Télephone du client</ion-label>
          <ion-input type="number" placeholder="Télephone du client"
            :value="tel" @IonChange="setTel($event.target.value)" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Invoice Type</ion-label>
          <ion-select
            multiple="false"
            @IonChange="invoice_type=$event.target.value"
            :value="invoice_type"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="FN">
              Facture normale
            </ion-select-option>
            <ion-select-option value="RC">
              Remboursement caution
            </ion-select-option>
            <ion-select-option value="RHF">
              Réduction Hors Facture
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">VAT Taxpayer</ion-label>
          <ion-select
            multiple="false"
            @IonChange="vat_taxpayer=$event.target.value"
            :value="vat_taxpayer"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="0">
              Non assujetti à la TVA
            </ion-select-option>
            <ion-select-option value="1">
              Assujetti à la TVA
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">CT Taxpayer</ion-label>
          <ion-select
            multiple="false"
            @IonChange="ct_taxpayer=$event.target.value"
            :value="ct_taxpayer"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="0">
              Non Assujetti à la taxe de consommation
            </ion-select-option>
            <ion-select-option value="1">
              Assujetti à la taxe de consommation
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">TL Taxpayer</ion-label>
          <ion-select
            multiple="false"
            @IonChange="tl_taxpayer=$event.target.value"
            :value="tl_taxpayer"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="0">
              Non Assujetti au prélèvement forfaitaire libératoire
            </ion-select-option>
            <ion-select-option value="1">
              Assujetti au prélèvement forfaitaire libératoire
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Payment Type</ion-label>
          <ion-select
            multiple="false"
            @IonChange="payment_type=$event.target.value"
            :value="payment_type"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="1">
              en espèce
            </ion-select-option>
            <ion-select-option value="2">
              banque
            </ion-select-option>
            <ion-select-option value="3">
              à crédit
            </ion-select-option>
            <ion-select-option value="4">
              autres
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Invoice Currency</ion-label>
          <ion-select
            multiple="false"
            @IonChange="invoice_currency=$event.target.value"
            :value="invoice_currency"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="BIF">
              Franc Burundais
            </ion-select-option>
            <ion-select-option value="USD">
              United State Dollar
            </ion-select-option>
            <ion-select-option value="EUR">
              EURO
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Customer Name</ion-label>
          <ion-input type="text" 
            placeholder="Customer Name"
            @IonChange="customer_name=$event.target.value"
            :value="customer_name" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Customer TIN</ion-label>
          <ion-input type="text" 
            placeholder="Customer TIN"
            @IonChange="customer_TIN=$event.target.value"
            :value="customer_TIN" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Customer Address</ion-label>
          <ion-input type="text" 
            placeholder="Customer Address"
            @IonChange="customer_address=$event.target.value"
            :value="customer_address" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">VAT Customer Payer</ion-label>
          <ion-select
            multiple="false"
            @IonChange="vat_customer_payer=$event.target.value"
            :value="vat_customer_payer"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="0">
              Non assujetti à la TVA
            </ion-select-option>
            <ion-select-option value="1">
              assujetti à la TVA
            </ion-select-option>
          </ion-select>
        </ion-item>
      </ion-col>
      <div class="clients" v-if="nom.length>0 || tel.length>0">
        <h4 v-show="found_clients.length>0">Les clients trouvés</h4>
        <div class="client" v-for="client in found_clients">
          <input type="radio" :value="client" :id="client.tel" v-model="active_client">
          <label :for="client.tel">{{client.nom}} {{client.tel}}</label>
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <div class="payment">
        <ion-label>le montant payé:</ion-label>
        <input type="number" v-model="paid">
        <ion-label>BIF</ion-label>
      </div>
      <div class="payment">
        <ion-label>{{ ingaru<0?"A rendre":"Dette d'une somme de" }}:</ion-label>
        <b>{{ money(Math.abs(ingaru)) }}</b>
        <ion-label>BIF</ion-label>
      </div>
      <div class="two-cols">
        <ion-button size="6" @click="clearCart">RESET</ion-button>
        <ion-button size="6" @click="submitVente">SUBMIT</ion-button>
      </div>
    </ion-footer>
  </ion-page>
</template>
<script>
import CartItem from "../components/cart_item"

export default {
  components:{ CartItem },
  data(){
    return {
      nom:"",
      tel:"",
      paid:this.$store.state.cart.getTotal(),
      clients:[],
      active_client:null,
      found_clients:[],

      show_client_form:false,

      invoice_type: "",
      vat_taxpayer: "",
      ct_taxpayer: "",
      tl_taxpayer: "",
      vat_taxpayer: "",
      ct_taxpayer: "",
      tl_taxpayer: "",
      payment_type: "",
      invoice_currency: "",
      customer_name: "",
      customer_TIN: "",
      customer_address: "",
      vat_customer_payer: ""
    }
  },
  computed:{
    ingaru(){
      return this.$store.state.cart.getTotal() - this.paid
    },
    cart(){
      return this.$store.state.cart
    }
  },
  watch:{
    "$store.state.cart.content":{
      deep:true,
      handler(new_val){
        this.paid = this.cart.getTotal()
      }
    },
    active_client(new_val){
      if(new_val){
        this.nom = new_val.nom
        this.tel = new_val.tel
      }
    },
  },
  methods:{
    clearCart(){
      this.cart.content = []
    },
    setTel(value){
      this.tel = value
      this.searchFor(value)
    },
    setNom(value){
      this.nom = value
      this.searchFor(value)
    },
    searchFor(keyword){
      if(this.nom.length == 0 && this.tel.length == 0){
        this.found_clients = []
        return
      }
      let nom = this.nom.toLowerCase()
      let tel = this.tel.toLowerCase()

      this.found_clients = this.clients.filter(x => {
        return (nom.length>0 && x.nom.toLowerCase().includes(nom)) ||
              (tel.length>0 && x.tel.toLowerCase().includes(tel))
      })
      this.active_client = null
    },
    submitVente(){
      let client_infos_are_correct = (this.tel.length>=7)&&(this.nom.length>=3)
      if(this.ingaru > 0){
        if(!client_infos_are_correct){
          this.makeToast("Erreur", "pour les dettes le client est obligatoire")
          return;
        }
      }
      let data = {};
      let items = [];
      let client = null;
      if(client_infos_are_correct){
        client = {
          "id":this.generateId("clients"),
          "nom":this.nom,
          "tel":this.tel
        }
        this.saveInDB("clients", client)
      }
      for(let item of this.cart.content){
        items.unshift({"produit":item.product.id, "quantite":item.quantite})
      }
      if(items.length==0){
        this.makeToast("Erreur", "les ventes nulles ne sont pas plausible")
        return;
      }
      let payee = this.paid<=this.cart.getTotal()?this.paid:this.cart.getTotal()
      data = {
        payee:payee,
        client: client,
        ventes:items,
        user:this.active_user.id,
        date:new Date(),
        kiosk:this.getActiveKiosk().id
      };
      let id = this.generateId("commandes")
      let command = {
        id: id,
        prix: this.cart.getTotal(),
        prix_achat: null,
        date: new Date(),
        payee: payee,
        updated_at: new Date(),
        user: this.active_user.username,
        kiosk: this.getActiveKiosk().id,
        client: client,
        created:data,
        user_id: this.active_user.id,
        kiosk_id: this.getActiveKiosk().id
      }
      for(let item of this.cart.content){
        item.product.quantite -= item.quantite
        this.saveInDB("produits", item.product)
      }
      this.saveInDB("commandes", command)
      this.cart.content = []
      this.$router.push("/")
    },
    fetchData(){
      let link = ""
      if(this.getActiveKiosk()==null){
        return
      }
      let kiosk_id = this.getActiveKiosk().id
      if(!this.next){
        link = this.url+`/client/?kiosk=${kiosk_id}`;
      } else {
        link = this.next
      }
      axios.get(link, this.headers)
      .then((response) => {
        this.saveInDB("clients", response.data.results)
        if(!!response.data.next){
          this.next = response.data.next
          this.fetchData()
        } else {
          this.next = null
        }
      }).catch((error) => {
        this.displayErrorOrRefreshToken(error, this.fetchData)
      });
    },
  },
  mounted(){
    this.clients = Object.values(JSON.parse(localStorage.getItem("clients")))
    if(this.clients.length<1){
      this.fetchData()
    }
  }
}
</script>
<style scoped>
.payment{
  display: flex;
  justify-content: center;
  align-items: center;
}
.payment input{
  width: 80px;
  padding: 5px;
  margin: 5px;
  text-align: right;
}
.total{
  display: flex;
  justify-content: right;
}
.two-cols{
  display: flex;
}
.two-cols>*{
  flex-grow: 1;
}
.item-native{
  padding-left: 0!important;
}
.client{
  display: flex;
  align-items: center; 
  margin-bottom: 5px; 
}
.client>*{
  margin-right: 5px;
}
</style>