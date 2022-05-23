<template>
  <div class="wrapper">

    <NonAuthorizedHeader></NonAuthorizedHeader>

    <div class="banner">
    <h1 class="title">Перша платформа для організації сумісних тренувань</h1>
      <ul>
        <li><h3 class="white">Спортивне життя на відстані двох кліків</h3></li>
        <li><h3 class="white">Збирайся з однодумцями легко, будь-коли і будь де!</h3></li>
        <li><h3 class="white">Завантажуй наш додаток щоб мати постійний зв’язок із командою</h3></li>
      </ul>
    </div>

    <div class="nearest-events">
      <h1 class="nearest-events-title">Найближчі події</h1>

      <div class="events">
        <SingleEvent
            v-for="event in this.events"
            :title="event.title"
            :author="event.author"
            :image="event.image"
            :date="event.date"
            :town="event.town"
            :amount="event.amount"
        />

      </div>

    </div>

    <div class="about">
      <h1 class="about-title">Про продукт</h1>
      <p class="about-text">    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
      </p>
        <p class="about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
   </p>
    </div>
  </div>
  <div class="footer">

  </div>
</template>

<script>
import NonAuthorizedHeader from "@/components/header/NonAuthorizedHeader";
import SingleEvent from "@/components/event/SingleEvent";

export default {
  components: {
    NonAuthorizedHeader,
    SingleEvent
  },
  data() {
    return {
      events: [
        {
          title: "Баскетбольна гра",
          author: "Іван Русанов",
          image: "football",
          date: "24.05.22 13:00",
          town: "Lviv",
          amount: "8"
        },
        {
          title: "Баскетбольна гра",
          author: "Іван Русанов",
          image: "football",
          date: "24.05.22 13:00",
          town: "Lviv",
          amount: "8"
        },
        {
          title: "Баскетбольна гра",
          author: "Іван Русанов",
          image: "football",
          date: "24.05.22 13:00",
          town: "Lviv",
          amount: "8"
        },
        {
          title: "Баскетбольна гра",
          author: "Іван Русанов",
          image: "football",
          date: "24.05.22 13:00",
          town: "Lviv",
          amount: "8"
        },
        {
          title: "Баскетбольна гра",
          author: "Іван Русанов",
          image: "football",
          date: "24.05.22 13:00",
          town: "Lviv",
          amount: "8"
        },
        {
          title: "Баскетбольна гра",
          author: "Іван Русанов",
          image: "football",
          date: "24.05.22 13:00",
          town: "Lviv",
          amount: "8"
        }
      ]
    }
  }
}
</script>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: fit-content;
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
  margin-bottom: 100px;
}
.nearest-events-title {
  margin-bottom: 100px;
}
.about-text {
  line-height: 192.9%;
}
.about-title {
  margin-bottom: 84px;
}
.footer {
  height: 350px;
  background: #F4924A;
  margin-top: 84px;
}
</style>