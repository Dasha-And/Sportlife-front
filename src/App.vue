<template>
    <router-view></router-view>
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
.text-center {
  text-align: center;
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
  padding-right: 30px;
}
h2 {
  font-family: 'Ubuntu',serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  text-transform: uppercase;
  color: #000000;
}
p {
  font-family: 'Montserrat',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
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
  border: 0px;
  cursor: pointer;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
}
.button:hover {
  transform: scale(1.06);
  transition-duration: 0.5s;
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
h4 {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  color: #000000;
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
</style>
