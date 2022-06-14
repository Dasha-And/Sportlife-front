<template>
  <div class="header">
    <h2 class="logo">Sportlife</h2>
    <div class="nav">
      <p class="nav-item" v-bind:class="getClassForMain()">Головна</p>
      <p class="nav-item">Про продукт</p>
      <p class="nav-item">Зв'язатися</p>
      <a class="nav-item" @click="onDropdownClick"><img src="../../img/user-icon.svg" alt="" class="user-icon"><p class="nav-item" v-bind:class="getClassForProfile()">{{user}}</p></a>
    </div>

    <div class="polygon" v-bind:class="showDropdown">

    </div>
    <div class="dropdown" v-bind:class="showDropdown()">
      <a><p class="dropdown-text" @click="goToProfile">Мій профіль</p></a>
      <hr>
      <a><p class="dropdown-text" @click="showModal">Створити нову подію</p></a>
      <hr>
      <a><p class="dropdown-text" @click="logout">Вийти</p></a>
    </div>
  </div>

  <ChooseSportModal
      v-show="isModalVisible"
      @close="closeModal"
  />

</template>

<script>
import ChooseSportModal from "@/components/modal/ChooseSportModal";
import UserService, {USER_FULLNAME, USER_ID} from "@/UserService";
export default {
  name: "AuthorizedHeader",
  components: {ChooseSportModal},
  props: ['selected'],
  data() {
    return {
      isClicked: false,
      isModalVisible: false,
      user: localStorage.getItem(USER_FULLNAME),
      id: localStorage.getItem(USER_ID)
    }
  },
  methods: {
    getClassForMain() {
      return {
        'selected': this.$props.selected === 'main'
      }
    },
    getClassForProfile() {
      return {
        'selected': this.$props.selected === 'profile'
      }
    },
    onDropdownClick() {
      this.isClicked = !this.isClicked
    },
    showDropdown() {
      return {
        'show' : this.isClicked === true,
      }
    },
    goToProfile() {
      this.$router.push('/profile/' + localStorage.getItem(USER_ID))
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    logout() {
      UserService.logout()
      this.$router.push("/")
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
.hide {
  display: none;
}
.show {
  display: block;
}
a {
  text-decoration: none;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
  cursor: pointer;
}
.dropdown-text:hover {
  color: #F4924A;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
}
</style>