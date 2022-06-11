<template>
<div class="wrapper">
  <div class="text-center">
    <h2 class="logo">Sportlife</h2>
    <h1>Реєстрація</h1>
    <form action="" class="reg-form" v-on:submit.prevent="submitForm">
      <input type="text" name="name" placeholder="Введіть ваше ім’я" class="height" v-model="form.name">
      <input type="text" name="surname" placeholder="Введіть ваше прізвище" class="height" v-model="form.surname">
      <input type="text" name="email" placeholder="Електронна пошта" class="height" v-model="form.email">
      <vue-tel-input placeholder="Телефон" class="height" v-model="form.phone" :value="phone" @input="onInput"></vue-tel-input>
      <textarea name="description" v-model="form.description" placeholder="Розкажіть про себе та ваші досягнення в спорті (не обов'язково)" class="textarea-height" ></textarea>
      <Multiselect
          v-model="form.town"
          :options="towns.data"
          searchable=searchable
          class="towns"
          name="town"
          placeholder="Оберіть місто"
      />
      <input type="text" id="dateOfBirth" name="dateOfBirth" v-model="form.dateOfBirth" placeholder="Дата народження" class="height" onfocus="(this.type='date')" onblur="(this.type='text')">
      <input type="password" name="password" placeholder="Введіть пароль (від 8 символів)" class="height" v-model="form.password">
      <button class="button reg-button" type="submit">Зареєструватися</button>
    </form>
    <div class="go-to-auth">
      <p class="go-to-auth-text">Вже з нами? <router-link to="/authorization">Увійдіть у свій акаунт SPORTLIFE</router-link></p>
    </div>
  </div>
</div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import axios from "axios";
import UserService, {API_BASE_URL, USER_ID, USER_NAME_SESSION_ATTRIBUTE_NAME, USER_PASSWORD} from "@/UserService";
import {reactive, toRefs} from "vue";

export default {
  // setup: () => {
  //   const state = reactive({
  //     phone: null
  //   })
  //
  //   const onInput = (phone, phoneObject) => {
  //     if (phoneObject?.formatted) {
  //       state.phone = phoneObject.formatted
  //       console.log(state.phone)
  //     }
  //   }
  //
  //   return {
  //     ...toRefs(state),
  //     onInput
  //   }
  // },
  components: {
    Multiselect
  },
  name: "Registration",
    data() {
    return {
      selectTown: "Оберіть місто",
      towns: [],
      value: null,
      phone: '',
      options: [
        'Batman',
        'Robin',
        'Joker',
      ],
      searchable: true,
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
  mounted() {
    fetch("https://countriesnow.space/api/v0.1/countries/cities",
        {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country: "ukraine" })})
        .then(response => response.json())
        .then(json => {this.towns = json})
  },
  methods: {
    myChangeEvent(val){
      console.log(val);
    },
    mySelectEvent({id, text}){
      console.log({id, text})
    },
    onInput(phone, phoneObject) {
      if (phoneObject?.formatted) {
        this.form.phone = phoneObject.formatted
        console.log(this.form.phone)
      }
    },
    submitForm(){

      console.log(this.form)
      axios.post(API_BASE_URL + '/user', this.form)
          .then((res) => {
            //Perform Success Action
            console.log(res)
            let user = res.data
            UserService.registerSuccessfulLogin(user.email, this.form.password, user.id)
            UserService.saveFullName(user.name, user.surname)
            if(res.status === 201) {
              // UserService.registerSuccessfulLogin(user.email, user.password, user.id)
              // UserService.saveFullName(user.name, user.surname)
            }
          })
          .catch((error) => {
            // error.response.status Check status code
            console.log(error)
          })
      .finally(() => {
        this.$router.push(`/profile/` + sessionStorage.getItem(USER_ID))
      });
    }
  }
}

</script>

<style scoped>
@import '../../node_modules/@vueform/multiselect/themes/default.css';
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