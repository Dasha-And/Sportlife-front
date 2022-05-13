<template>
  <div class="header">
    <h2 class="logo">Sportlife</h2>
    <div class="nav">
      <p class="nav-item selected">Головна</p>
      <p class="nav-item">Про продукт</p>
      <p class="nav-item">Зв'язатися</p>
      <router-link class="button nav-item-sign-in" to="/authorization">Увійти</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NonAuthorizedHeader"
}
</script>

<style scoped>
.logo {
  height: fit-content;
  margin-top: auto;
  margin-bottom: auto;
}
.header {
  display: flex;
  justify-content: space-between;
  height: 117px;
}
.nav {
  display: flex;
  justify-content: space-between;
  width: 583px;
}
.nav-item {
  cursor: pointer;
  display: block;
  height: fit-content;
  margin-top: auto;
  margin-bottom: auto;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
}
.nav-item:hover {
  color: #F4924A;
  transition-duration: 0.3s;
}
.nav-item-sign-in {
  margin-top: auto;
  margin-bottom: auto;
}
</style>