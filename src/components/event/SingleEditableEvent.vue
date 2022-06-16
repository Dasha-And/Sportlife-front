<template>
  <div class="events-item" >
    <div class="clickable" @click="goToEvent">
      <h4 class="events-item-title">{{title}}</h4>
      <p class="events-item-text">Автор: {{author}}</p>
      <img :src="getImgUrl(image)" alt="" class="center">
      <p class="date">{{formatDate(date)}}</p>
      <p class="events-item-text bottom">{{town}}</p>
      <p class="events-item-text">Записалося {{amount}} чол.</p>
    </div>
    <a class="button edit-button" @click="goToEditEvent">Редагувати</a>
  </div>

</template>

<script>
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
      path: ""
    }
  },
  methods: {
    getImgUrl(image) {
      return require("../../img/" + image + ".svg")
    },
    formatDate(date) {
      return moment(date).format('DD.MM.yyyy HH:mm')
    },
    goToEvent() {
      this.$router.push('/event/' + this.$props.id)
    },
    goToEditEvent() {
      this.$router.push('edit_event/' + this.$props.id)
    }
  }
}
</script>

<style scoped>
.date {
  color: #C5C5C5;
  font-size: 14px;
  margin-top: 11px;
}
.edit-button {
  width: 220px;
  height: 38px;
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.events-item {
  cursor: pointer;
  width: 330px;
  height: 344px;
  background: #FFFFFF;
  box-shadow: 0px 0px 26px rgba(0, 0, 0, 0.25);
  text-align: center;
  border-radius: 10px;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
}
.events-item:hover {
  transform: scale(1.05);
  transition-duration: 0.3s;
}
.events {
  display: grid;
  column-gap: 80px;
  row-gap: 78px;
  grid-template-columns: 330px 330px 330px;
}
.events-item-title {
  text-align: center;
  margin-bottom: 11px;
}
.events-item-text {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  margin-top: 0;
}
.bottom {
  margin-bottom: 8px;
}
</style>