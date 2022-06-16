<template>
  <div class="events-item">
    <h4 class="events-item-title">{{title}}</h4>
    <p class="events-item-text">Автор: {{authorName}}</p>
    <img :src="getImgUrl(image)" alt="" class="center">
    <p class="date">{{formatDate(date)}}</p>
    <p class="events-item-text">{{town}}</p>
    <p class="events-item-text">Записалося {{amount}} чол.</p>
    <a @click="goToEvent">Докладніше про подію</a>
  </div>
</template>

<script>
import UserService from "@/UserService";
import moment from "moment";

export default {
  name: "SingleEvent",
    props: {
      id: Number,
      title: String,
      author: String,
      image: String,
      date: Date,
      town: String,
      amount: String
    },
  data() {
    return {
      imageConstructor: "",
      authorName: ''
    }
  },
  mounted() {
    UserService.getUserById(this.$props.author).then(
        (res) => {
          this.authorName = res.data.name + ' ' + res.data.surname
        }).catch((ex) => {
      console.log(ex)
    })
  },
  methods: {
    getImgUrl(image) {
      return require("../../img/" + image + ".svg")
    },
    goToEvent() {
      this.$router.push('/event/' + this.$props.id)
    },
    formatDate(date) {
      return moment(date).format('DD.MM.yyyy HH:mm')
    }
  }
}
</script>

<style scoped>
.date {
  color: #C5C5C5;
  font-size: 14px;
}
a {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 14px;
  color: black;
  text-decoration-line: underline;
  transition-duration: 0.3s;
}
a:hover {
  color: #F4924A;
  transition-duration: 0.3s;
}
</style>