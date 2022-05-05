<template>
  <div class="wrapper">

    <div class="header">
      <h2 class="logo">Sportlife</h2>
      <div class="nav">
        <p class="nav-item selected">Головна</p>
        <p class="nav-item">Про продукт</p>
        <p class="nav-item">Зв'язатися</p>
        <router-link class="button nav-item-sign-in" to="/authorization">Увійти</router-link>
      </div>
    </div>

    <div class="banner">
    <h1 class="title">Перша платформа для організації сумісних тренувань</h1>
      <ul>
        <li><h3>Спортивне життя на відстані двох кліків</h3></li>
        <li><h3>Збирайся з однодумцями легко, будь-коли і будь де!</h3></li>
        <li><h3>Завантажуй наш додаток щоб мати постійний зв’язок із командою</h3></li>
      </ul>
    </div>

    <div class="nearest-events">
      <h1 class="nearest-events-title">Найближчі події</h1>

      <div class="events">
        <div class="events-item">
          <h4 class="events-item-title">Баскетбольна гра</h4>
          <p class="events-item-text">Автор: Іван Русанов</p>
        </div>
        <div class="events-item">
          <h4 class="events-item-title">Баскетбольна гра</h4>
          <p class="events-item-text">Автор: Іван Русанов</p>
        </div>
        <div class="events-item">
          <h4 class="events-item-title">Баскетбольна гра</h4>
          <p class="events-item-text">Автор: Іван Русанов</p>
        </div>
        <div class="events-item">
          <h4 class="events-item-title">Баскетбольна гра</h4>
          <p class="events-item-text">Автор: Іван Русанов</p>
        </div>
        <div class="events-item">
          <h4 class="events-item-title">Баскетбольна гра</h4>
          <p class="events-item-text">Автор: Іван Русанов</p>
        </div>
        <div class="events-item">
          <h4 class="events-item-title">Баскетбольна гра</h4>
          <p class="events-item-text">Автор: Іван Русанов</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

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
  width: 583px;
}
.nav-item {
  cursor: pointer;
  display: block;
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
.nav-item-sign-in {
  margin-top: auto;
  margin-bottom: auto;
}
.banner {
  height: 499px;
  background-image: url("../../img/home-banner.jpeg");
  background-repeat: no-repeat;
  background-size: 100%;
  padding-top: 61px;
  padding-left: 29px;
}
.title {
  margin-bottom: 51px;
  color: #FFFFFF;
}
.nearest-events {
  margin-top: 100px;
}
.nearest-events-title {
  margin-bottom: 100px;
}
</style>