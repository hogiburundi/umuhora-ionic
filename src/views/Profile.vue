<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-button slot="start" routerLink="/home/stats">
              <ion-icon :src="getIcon('arrowBack')"></ion-icon>
            </ion-button>
          </ion-buttons>
        <ion-title>UMUHORA</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="kiosk">
        <h3>Alimentation UMUCO</h3>
        <div class="img-user">
          <img src="/img/ic_user.png" alt="">
        </div>
        <div class="licence">Licence active jusqu'à Avril 2022</div>
      </div>
      <ion-list>
        <ion-item-divider color="light">PROFILE BASIC</ion-item-divider>
        <ion-item>
          <ion-icon :src="getIcon('person')"/>
          <ion-label>Alimentation umuco</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon :src="getIcon('planet')"/>
          <ion-label>https://www.umucopharma.com</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon :src="getIcon('informationCircle')"/>
          <ion-label>Un peu d'informations sur nous. Ca continue et ca continue</ion-label>
        </ion-item>
        <ion-item-divider color="light">INFORMATION PRIVEES</ion-item-divider>
        <ion-item>
          <ion-icon :src="getIcon('mail')"/>
          <ion-label>umuco@gmail.com</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon :src="getIcon('call')"/>
          <ion-label>+257 75 202 231</ion-label>
        </ion-item>
        <ion-item-divider color="light">PROFILE BASIC</ion-item-divider>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Type de contribuable</ion-label>
          <ion-select
            multiple="false"
            @IonChange="tp_type=$event.target.value"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="1">
              Personne Physique
            </ion-select-option>
            <ion-select-option value="2">
              Personne Morale
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Nom et prénom</ion-label>
          <ion-input type="text"
            placeholder="Nom et prénom"
            :value="$store.state.user.tp_name"
            @IonChange="tp_name=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">NIF du contribuable</ion-label>
          <ion-input type="text"
            placeholder="NIF du contribuable"
            :value="$store.state.user.tp_TIN"
            @IonChange="tp_TIN=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Le numéro du registre de commerce</ion-label>
          <ion-input type="text"
            placeholder="Le numéro du registre de commerce"
            :value="$store.state.user.tp_trade_number"
            @IonChange="tp_trade_number=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Boite postale</ion-label>
          <ion-input type="text"
            placeholder="Boite postale"
            :value="$store.state.user.tp_postal_number"
            @IonChange="tp_postal_number=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Numéro de téléphone</ion-label>
          <ion-input type="text"
            placeholder="Numéro de téléphone"
            :value="$store.state.user.tp_phone_number"
            @IonChange="tp_phone_number=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Province</ion-label>
          <ion-input type="text"
            placeholder="Province"
            :value="$store.state.user.tp_address_province"
            @IonChange="tp_address_province=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Commune</ion-label>
          <ion-input type="text"
            placeholder="Commune"
            :value="$store.state.user.tp_address_commune"
            @IonChange="tp_address_commune=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Quartier</ion-label>
          <ion-input type="text"
            placeholder="Quartier"
            :value="$store.state.user.tp_address_quartier"
            @IonChange="tp_address_quartier=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Avenue</ion-label>
          <ion-input type="text"
            placeholder="Avenue"
            :value="$store.state.user.tp_address_avenue"
            @IonChange="tp_address_avenue=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Numero</ion-label>
          <ion-input type="text"
            placeholder="Numero"
            :value="$store.state.user.tp_address_number"
            @IonChange="tp_address_number=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Centre fiscal du contribuable</ion-label>
          <ion-select
            multiple="false"
            @IonChange="tp_fiscal_center=$event.target.value"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="DGC">
              Direction des Grands contribuables
            </ion-select-option>
            <ion-select-option value="DMC">
              Direction des Moyens Contribuables
            </ion-select-option>
            <ion-select-option value="DPMC">
              Direction des Petits et Micro Contribuables
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Secteur d'activité</ion-label>
          <ion-input type="text"
            placeholder="Secteur d'activité"
            :value="$store.state.user.tp_activity_sector"
            @IonChange="tp_activity_sector=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Forme Juridique</ion-label>
          <ion-input type="text"
            placeholder="Forme Juridique"
            :value="$store.state.user.tp_legal_form"
            @IonChange="tp_legal_form=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item-divider color="light">INFORMATIONS DE CONNEXION OBR</ion-item-divider>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">OBR Username</ion-label>
          <ion-input type="text"
            placeholder="nom d'utilisateur OBR"
            :value="$store.state.user.username"
            @IonChange="tp_username=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Password</ion-label>
          <ion-input type=password
            placeholder="Password"
            :value="$store.state.user.password"
            @IonChange="tp_password=$event.target.value" clearInput/>
        </ion-item>
        <ion-item-divider color="light">INFORMATION UTILISATEUR</ion-item-divider>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">OBR Username</ion-label>
          <ion-input type="text"
            placeholder="nom d'utilisateur OBR"
            :value="$store.state.user.username"
            @IonChange="username=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Password</ion-label>
          <ion-input type=password
            placeholder="Mot de passe"
            :value="$store.state.user.password"
            @IonChange="password=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Confirm Password</ion-label>
          <ion-input type=password
            placeholder="confirmation Mot de passe"
            :value="$store.state.user.password"
            @IonChange="password=$event.target.value" clearInput/>
        </ion-item>
        <ion-button color="primary" expand="block">Valider</ion-button>
        <ion-item-divider color="light">ACCESSIBILITE</ion-item-divider>
        <ion-item>
          <ion-icon :src="getIcon('colorPalette')"/>
          <ion-label class="descr">
            <label>Couleurs pour mal voyants</label>
            <div>
              lorem ipsum dolor sit amet, consectetur
              adipisicing elit, sed do eiusmod tempor
            </div>
          </ion-label>
          <ion-toggle/>
        </ion-item>
        <ion-item-divider color="light">ABOUT</ion-item-divider>
        <ion-item>
          <ion-icon :src="getIcon('logoWhatsapp')"/>
          <ion-label>Aide</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon :src="getIcon('lockClosed')"/>
          <ion-label>Confindentialité</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon :src="getIcon('documentText')"/>
          <ion-label>Termes et condition</ion-label>
        </ion-item>
        <ion-button color="danger" expand="block">Déconnexion</ion-button>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  data(){
    return {
      tp_type: "",
      tp_name: "",
      tp_TIN: "",
      tp_trade_number: "",
      tp_postal_number: "",
      tp_phone_number: "",
      tp_address_province: "",
      tp_address_commune: "",
      tp_address_quartier: "",
      tp_address_avenue: "",
      tp_address_number: "",
      tp_fiscal_center: "",
      tp_activity_sector: "",
      tp_legal_form: "",
      tp_username: "",
      tp_password: "",
      username: "",
      password: "",
      password1: ""
    }
  }
}
</script>
<style scoped>
.kiosk{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.licence{
  color: green;
  margin-top: 10px;
}
ion-button{
  margin: 10px;
}
ion-label label{
  font-weight: 650;
}
.descr{
  white-space: wrap!important;
}
.ion-no-padding{
  margin: 0 15px;
}
</style>
