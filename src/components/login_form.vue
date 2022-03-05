<template>
  <ion-page>
    <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <ion-label position="floating">Username</ion-label>
          <ion-input type=text placeholder="Username" clearInput/>
        </ion-col>
        <ion-col size="12">
          <ion-label position="floating">Password</ion-label>
          <ion-input type=password placeholder="Password" clearInput/>
        </ion-col>
        <ion-col size="12">
          <ion-button expand="block">
            CONNEXION
          </ion-button>
        </ion-col>
      </ion-row>
      <div>
        Mot de passe oublié? Demandez de l'aide
      </div>
    </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>

export default {
}
</script>
