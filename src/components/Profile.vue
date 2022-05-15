<template>
<div class="wrapper">

<AuthorizedHeader v-bind:selected="selected"></AuthorizedHeader>
  <h1 class="title">Мій профіль</h1>
  <div class="profile">

    <div class="info">
      <img src="../img/user-icon.svg" alt="" class="user-icon">
      <div>
        <h3>Іван Русанов</h3>
        <p>Email: s.rusanov4@gmail.com</p>
        <p>Місто: Lviv</p>
      </div>
    </div>

    <a href="" class="button edit-profile-button">Редагувати профіль</a>
  </div>
</div>
</template>

<script>
import AuthorizedHeader from "@/components/header/AuthorizedHeader";

export default {
  name: "Profile",
  components: {
    AuthorizedHeader
  },
  data() {
    return {
      selected: 'profile'
    }
  }
}
</script>

<style scoped>
.profile {
  width: 917px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
}
.user-icon {
  width: 120px;
  height: 120px;
}
.info {
  display: flex;
  width: 409px;
  justify-content: space-between;
}
.edit-profile-button {
  width: 220px;
  height: 38px;
}
.title {
  margin-top: 55px;
  margin-bottom: 100px;
}
</style>