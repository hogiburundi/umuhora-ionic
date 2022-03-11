<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button slot="start" routerLink="/">
              <ion-icon :src="getIcon('arrowBack')"></ion-icon>
            </ion-button>
          </ion-buttons>
        <ion-title>URUFATANAMENDE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-footer>
        <ion-toolbar>
          <ion-title>Footer</ion-title>
        </ion-toolbar>
      </ion-footer>
    </ion-content>
  </ion-page>
</template>

<script>
</script>
<style>
  ion-fab-button{
    position: fixed;
    right: 10px;
    bottom: 70px;
  }
</style>
