<template>
<div class="wrapper">
  <div class="text-center">
    <h2 class="logo">Sportlife</h2>
    <h1>Реєстрація</h1>
    <form action="" class="reg-form">
      <input type="text" name="name" placeholder="Введіть ваше ім’я">
      <input type="text" name="surname" placeholder="Введіть ваше прізвище">
      <input type="text" name="email" placeholder="Електронна пошта">
      <select name="town">
        <option value="" selected disabled>Оберіть місто</option>
        <option value="" v-for="town of towns.data" :key="town">{{town}}</option>
      </select>
      <input type="password" name="password" placeholder="Введіть пароль (від 8 символів)">
      <input type="password" name="confirmPassword" placeholder="Підтвердіть пароль">
      <button class="button reg-button" type="submit">Зареєструватися</button>
    </form>
    <div class="go-to-auth">
      <p class="go-to-auth-text">Вже з нами? <router-link to="/authorization">Увійдіть у свій акаунт SPORTLIFE</router-link></p>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: "Registration",
    data() {
    return {
      selectTown: "Оберіть місто",
      towns: []
    }
  },
  mounted() {
    fetch("https://countriesnow.space/api/v0.1/countries/cities",
        {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country: "ukraine" })})
        .then(response => response.json())
        .then(json => {this.towns = json})
  }
}

</script>

<style scoped>
.logo {
  margin-top: 41px;
  margin-bottom: 23px;
}
.reg-form {
  margin-top: 43px;
  width: 615px;
  margin-left: auto;
  margin-right: auto;
}
.reg-button {
  width: 220px;
  margin-top: 15px;
  margin-bottom: 43px;
}
.go-to-auth {
  width: 521px;
  height: 86px;
  border: 1px solid #C5C5C5;
  box-sizing: border-box;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 60px;
}
.go-to-auth-text {
  line-height: 86px;
  margin-top: 0;
  margin-bottom: 0;
}
</style>