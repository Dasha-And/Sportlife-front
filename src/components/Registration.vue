<template>
<div class="wrapper">
  <div class="text-center">
    <h2 class="logo">Sportlife</h2>
    <h1>Реєстрація</h1>
    <form action="" class="reg-form">
      <input type="text" name="name" placeholder="Введіть ваше ім’я">
      <input type="text" name="surname" placeholder="Введіть ваше прізвище">
      <input type="text" name="email" placeholder="Електронна пошта">
      <select v-model="selectTown">
        <option disabled="disabled" selected="selected">Оберіть місто</option>
      </select>
      <input type="password" name="password" placeholder="Введіть пароль (від 8 символів)">
      <input type="password" name="password" placeholder="Підтвердіть пароль">
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      selectTown: "Оберіть місто"
    }
  }

}
</script>

<style scoped>
.text-center {
  text-align: center;
}
.logo {
  margin-top: 41px;
  margin-bottom: 23px;
}
.reg-form {
  margin-top: 43px;
}
input, select{
  width: 615px;
  height: 50px;
  border: 1px solid #C5C5C5;
  box-sizing: border-box;
  border-radius: 10px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  padding-left: 31px;
  margin-bottom: 28px;
}
.option-text {
  color: #C5C5C5;
}
</style>