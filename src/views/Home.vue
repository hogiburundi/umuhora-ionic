<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>URUFATANAMENDE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-router-outlet/>
      <ion-fab-button class="todo-fab" @click="">
        <ion-icon :src="getIcon('qrCode')"></ion-icon>
      </ion-fab-button>
    </ion-content>
  </ion-page>
</template>

<script>
</script>
<style scoped>
  ion-fab-button{
    position: fixed;
    right: 10px;
    bottom: 70px;
  }
</style>
