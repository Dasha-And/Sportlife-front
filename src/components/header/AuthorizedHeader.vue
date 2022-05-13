<template>
  <div class="header">
    <h2 class="logo">Sportlife</h2>
    <div class="nav">
      <p class="nav-item" v-bind:class="getClass()">Головна</p>
      <p class="nav-item">Про продукт</p>
      <p class="nav-item">Зв'язатися</p>
      <a class="nav-item" @click="showDropdown"><img src="../../img/user-icon.svg" alt="" class="user-icon"><p class="nav-item">Іван Русанов</p></a>
    </div>

    <div class="polygon" v-bind:class="showDropdown()">

    </div>
    <div class="dropdown" v-bind:class="showDropdown()">
      <router-link to="/profile"><p class="dropdown-text">Мій профіль</p></router-link>
      <hr>
      <router-link to="/profile"><p class="dropdown-text">Створити нову подію</p></router-link>
      <hr>
      <router-link to="/profile"><p class="dropdown-text">Налаштування</p></router-link>
    </div>
  </div>

</template>

<script>
export default {
  name: "AuthorizedHeader",
  props: ['selected'],
  data() {
    return {
      isClicked: false
    }
  },
  methods: {
    getClass() {
      return {
        'selected': this.$props.selected === 'main'
      }
    },
    showDropdown() {
      this.isClicked = !this.isClicked
      return {
        'show' : this.isClicked === true
      }
    }
  }
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
  width: 602px;
}
.nav-item {
  display: flex;
  cursor: pointer;

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
.user-icon {
  margin-right: 12px;
}
.dropdown {
  display: none;
  position: absolute;
  width: 324px;
  height: 166px;
  left: 1054px;
  top: 92px;
  text-align: left;
  background: #FFFFFF;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.polygon {

  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 25px solid white;
  position: absolute;
  left: 1226px;
  top: 80px;
  z-index: 1;
  box-shadow: 0 16px 10px -17px rgba(0, 0, 0, 0.5);
}
hr {
  width: 269px;
  height: 1px;
  border: none;
  background-color: #C8C8C8;
}
.dropdown-text {
  padding-left: 35px;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
}
.show {
  display: block;
}
a {
  text-decoration: none;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
}
.dropdown-text:hover {
  color: #F4924A;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
}
</style>