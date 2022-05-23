<template>
<div class="wrapper">

<AuthorizedHeader v-bind:selected="selected"></AuthorizedHeader>
  <h1 class="title">Мій профіль</h1>
  <div class="profile">

    <div class="info">
      <img src="../img/user-icon.svg" alt="" class="user-icon">
      <div>
        <h3>Іван Русанов</h3>
        <p>Email: s.rusanov4@gmail.com</p>
        <p>Місто: Lviv</p>
      </div>
    </div>

    <a href="" class="button edit-profile-button">Редагувати профіль</a>
  </div>
  <div class="tabs">
    <div class="tabs-item" >
      <p class="tabs-text" @click="showMyEvents" v-bind:class="{selected : !showOtherEvents}">Мої події</p>
      <div class="line" v-show="!showOtherEvents"></div>
    </div>

    <div class="tabs-item" >
      <p class="tabs-text" @click="showOther" v-bind:class="{selected : showOtherEvents}">Відвідані події</p>
      <div class="line" v-show="showOtherEvents"></div>
    </div>

  </div>
  <div class="my-events" v-show="!showOtherEvents">
    <p v-show="myEvents.length === 0" class="no-events-placeholder">Ви ще не створили жодної події</p>
    <div class="events">
      <SingleEditableEvent
          v-for="event in this.myEvents"
          :title="event.title"
          :author="event.author"
          :image="event.image"
          :date="event.date"
          :town="event.town"
          :amount="event.amount"
      />
    </div>
  </div>
  <div class="other-events" v-show="showOtherEvents">
    <p v-show="otherEvents.length === 0" class="no-events-placeholder">Ви ще не записалися до жодної події</p>
    <SingleEvent
        v-for="event in this.otherEvents"
        :title="event.title"
        :author="event.author"
        :image="event.image"
        :date="event.date"
        :town="event.town"
        :amount="event.amount"
    />
  </div>
</div>
</template>

<script>
import AuthorizedHeader from "@/components/header/AuthorizedHeader";
import SingleEditableEvent from "@/components/event/SingleEditableEvent";
import SingleEvent from "@/components/event/SingleEvent";

export default {
  name: "Profile",
  components: {
    AuthorizedHeader,
    SingleEditableEvent,
    SingleEvent
  },
  data() {
    return {
      selected: 'profile',
      showOtherEvents: false,
      myEvents: [
        // {
        //   title: "Баскетбольна гра",
        //   author: "Іван Русанов",
        //   image: "football",
        //   date: "24.05.22 13:00",
        //   town: "Lviv",
        //   amount: "8"
        // },
        // {
        //   title: "Баскетбольна гра",
        //   author: "Іван Русанов",
        //   image: "football",
        //   date: "24.05.22 13:00",
        //   town: "Lviv",
        //   amount: "8"
        // }
      ],
      otherEvents: []
    }
  },
  methods: {
    showMyEvents() {
      this.showOtherEvents = false
    },
    showOther() {
      this.showOtherEvents = true
    }
  }
}
</script>

<style scoped>
.profile {
  width: 917px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
}
.user-icon {
  width: 120px;
  height: 120px;
}
.info {
  display: flex;
  width: 409px;
  justify-content: space-between;
}
.edit-profile-button {
  width: 220px;
  height: 38px;
}
.title {
  margin-top: 55px;
  margin-bottom: 100px;
}
.tabs {
  width: 313px;
  display: flex;
  justify-content: space-between;
  margin: 90px auto 60px;
}
.tabs-text {
  font-family: Montserrat;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2px;
  cursor: pointer;
}
.no-events-placeholder {
  text-align: center;
  font-size: 17px;
  color: #B4B4B4;
}
.selected {
  color: #F4924A;
  transition-duration: 0.2s;
}
.line {
  width: auto;
  height: 0;
  border: 2px solid #F4924A;
}
.tabs-item {
  height: 40px;
}
</style>