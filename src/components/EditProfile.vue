<template>
  <div class="wrapper">
    <AuthorizedHeader v-bind:selected="selected"></AuthorizedHeader>
    <h1>Редагувати профіль</h1>
    <form action="" class="reg-form" v-on:submit.prevent="submitForm">
      <input type="text" name="name" placeholder="Введіть ваше ім’я" class="height" v-model="form.name">
      <input type="text" name="surname" placeholder="Введіть ваше прізвище" class="height" v-model="form.surname">
      <input type="text" name="email" placeholder="Електронна пошта" class="height" v-model="form.email">
      <vue-tel-input placeholder="Телефон" class="height" v-model="form.phone" :value="form.phone" @input="onInput"></vue-tel-input>
      <textarea name="description" v-model="form.description" placeholder="Розкажіть про себе та ваші досягнення в спорті (не обов'язково)" class="textarea-height" ></textarea>
      <Multiselect
          v-model="form.town"
          :options="towns.data"
          searchable=searchable
          class="towns"
          name="town"
          placeholder="Оберіть місто"
      />
      <input type="date" id="dateOfBirth" name="dateOfBirth" @input="date" placeholder="Дата народження" class="height">
      <button class="button reg-button" type="submit">Зберегти</button>
    </form>
  </div>

</template>

<script>

import AuthorizedHeader from "@/components/header/AuthorizedHeader";
import UserService from "@/UserService";
import Multiselect from "@vueform/multiselect";
import moment from "moment";

export default {
  name: "EditProfile",
  components: {
    AuthorizedHeader,
    Multiselect
  },
  data() {
    return {
      selected: 'profile',
      towns: [],
      form: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        description: '',
        town: '',
        dateOfBirth: '',
        password: ''
      }
    }
  },
  computed: {
    date: {
      get() {
        return this.form.dateOfBirth;
      },
      set(newValue) {
        this.form.dateOfBirth = newValue;
      },
    },
  },
  mounted() {
    fetch("https://countriesnow.space/api/v0.1/countries/cities",
        {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country: "ukraine" })})
        .then(response => response.json())
        .then(json => {this.towns = json})
    UserService.getUserById(this.$route.params.id).then((res) => {
      this.form = res.data
    })
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD.MM.yyyy')
    },
  }
}
</script>

<style scoped>
.reg-form {
  margin-top: 43px;
  width: 615px;
  margin-left: auto;
  margin-right: auto;
}
.towns {
  width: 615px;
  height: 50px;
  border: 1px solid #C5C5C5;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 28px;
  position: relative;
  z-index: 1;
}
.textarea-height {
  margin-bottom: 28px;
}
</style>