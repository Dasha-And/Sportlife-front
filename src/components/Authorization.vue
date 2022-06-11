<template>
<div class="wrapper">
  <div class="text-center">
    <h2 class="logo">Sportlife</h2>
    <h1 class="title">Вхід</h1>
    <p class="welcome-text">Ласкаво просимо!</p>
    <div action="" class="auth-form">
      <input type="text" name="email" placeholder="Електронна пошта" class="height" v-model="email">
      <input type="password" name="password" placeholder="Пароль" class="height" v-model="password">
      <button class="button auth-button" @click="loginClicked">Увійти</button>
    </div>
    <div class="go-to-reg">
      <p class="go-to-reg-text">Ще немає акаунту? <router-link to="/registration">Приєднуйтесь до SPORTLIFE</router-link></p>
    </div>
  </div>
</div>
</template>

<script>
import UserService from "@/UserService";

export default {
  name: "Authorization",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginClicked() {
      console.log(this.email)
      console.log(this.password)
      UserService
          .login(this.email, this.password)
          .then(() => {
            UserService.registerSuccessfulLogin(this.email, this.password, 0)
            UserService.getUserByEmail(this.email).then((res) => {
              let user = res.data
              UserService.registerSuccessfulLogin(this.email, this.password, user.id)
              UserService.saveFullName(user.name, user.surname)
              this.$router.push(`/profile/${user.id}`)
            })

          }).catch((ex) => {
        console.log(ex)
      })

    }
  }
}
</script>

<style scoped>
.auth-form {
  margin-top: 36px;
  width: 615px;
  margin-left: auto;
  margin-right: auto;
}
.go-to-reg {
  width: 521px;
  height: 86px;
  border: 1px solid #C5C5C5;
  box-sizing: border-box;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 60px;
}
.go-to-reg-text {
  line-height: 86px;
  margin-top: 0;
  margin-bottom: 0;
}
.auth-button {
  width: 220px;
  margin-top: 15px;
  margin-bottom: 43px;
}
.logo {
  margin-top: 100px;
  margin-bottom: 50px;
}
.title {
  margin-top: 0;
  margin-bottom: 0;
}
.welcome-text {
  margin-top: 17px;
}
</style>