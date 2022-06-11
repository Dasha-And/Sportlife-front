<template>
  <div class="events-item">
    <h4 class="events-item-title">{{title}}</h4>
    <p class="events-item-text">Автор: {{author}}</p>
    <img :src="getImgUrl(image)" alt="" class="center">
    <p class="date">{{date}}</p>
    <p class="events-item-text">{{town}}</p>
    <p class="events-item-text">Записалося {{amount}} чол.</p>
    <a href="">Докладніше про подію</a>
  </div>
</template>

<script>
export default {
  name: "SingleEvent",
    props: {
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
    }
  },
  methods: {
    getImgUrl(image) {
      return require("../../img/" + image + ".svg")
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