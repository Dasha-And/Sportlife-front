<template>
  <div class="wrapper">

    <div class="header">
      <h2 class="logo">Sportlife</h2>
      <div class="nav">
        <p class="nav-item selected">Головна</p>
        <p class="nav-item">Про продукт</p>
        <p class="nav-item">Зв'язатися</p>
        <a class="button nav-item-sign-in" href="">Увійти</a>
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

.wrapper {
  width: 1160px;
  margin: 0 auto;
}
h2 {
  font-family: 'Ubuntu',serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  text-transform: uppercase;
  color: #000000;
}
.logo {
  height: fit-content;
  margin-top: auto;
  margin-bottom: auto;
}
p {
  font-family: 'Montserrat',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
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
.selected {
  font-weight: 800;
  color: #F4924A;
}
.button {
  background: linear-gradient(180deg, #F4924A 0%, #F4BB4A 100%);
  border-radius: 7px;
  color: white;
  text-decoration: none;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  width: 142px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
}
.button:hover {
  transform: scale(1.06);
  transition-duration: 0.5s;
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
h1 {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 900;
  font-size: 30px;
}
h3 {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #FFFFFF;
}
li {
  color: white;
}
.title {
  margin-bottom: 51px;
  color: #FFFFFF;
}
.nearest-events {
  margin-top: 100px;
}
.events-item {
  width: 330px;
  height: 344px;
  background: #FFFFFF;
  box-shadow: 0px 0px 26px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
}
.events-item:hover {
  transform: scale(1.05);
  transition-duration: 0.3s;
}
.nearest-events-title {
  margin-bottom: 100px;
}
.events {
  display: grid;
  column-gap: 80px;
  row-gap: 78px;
  grid-template-columns: auto auto auto;
}
.events-item-title {
  text-align: center;
}
.events-item-text {
  text-align: center;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
}
h4 {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  color: #000000;
}
</style>