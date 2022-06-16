<template>
<div class="wrapper">
  <Loader v-if="loading"></Loader>
  <div class="content" v-else-if="user !== {}">
    <AuthorizedHeader v-bind:selected="selected"></AuthorizedHeader>

    <h1 class="title">Мій профіль</h1>
    <div class="profile">

      <div class="info">
        <img src="../img/user-icon.svg" alt="" class="user-icon">
        <div>
          <h3>{{user.name}} {{user.surname}}</h3>
          <p>Email: {{user.email}}</p>
          <p>Місто: {{user.town}}</p>
          <p>Телефон: {{user.phone}}</p>
          <p>Дата народження: {{formatDate(user.dateOfBirth)}}</p>
        </div>
      </div>

      <a class="button edit-profile-button" @click="goToEditProfile">Редагувати профіль</a>

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
            :id="event.id"
            :title="event.name"
            :author="author"
            :image="event.activityId"
            :date="event.startDate"
            :town="event.town"
            :amount="event.amount"
        />
      </div>
    </div>
    <div class="other-events" v-show="showOtherEvents">
      <p v-show="otherEvents.length === 0" class="no-events-placeholder">Ви ще не записалися до жодної події</p>
      <div class="events">
        <SingleEvent
            v-for="event in this.otherEvents"
            :id="event.id"
            :title="event.name"
            :author="event.profileId"
            :image="event.activityId"
            :date="event.startDate"
            :town="event.town"
            :amount="event.amount"
        />
      </div>
    </div>

  </div>

</div>
  <div class="footer"></div>
</template>

<script>
import AuthorizedHeader from "@/components/header/AuthorizedHeader";
import SingleEditableEvent from "@/components/event/SingleEditableEvent";
import SingleEvent from "@/components/event/SingleEvent";
import UserService, {USER_FULLNAME, USER_ID, USER_NAME_SESSION_ATTRIBUTE_NAME, USER_PASSWORD} from "@/UserService";
import Loader from "@/components/loader/Loader";
import moment from "moment";

export default {
  name: "Profile",
  components: {
    AuthorizedHeader,
    SingleEditableEvent,
    SingleEvent,
    Loader
  },
  data() {
    return {
      selected: 'profile',
      showOtherEvents: false,
      myEvents: [

      ],
      otherEvents: [],
      user: {},
      loading: true,
      author: localStorage.getItem(USER_FULLNAME),
      id: localStorage.getItem(USER_ID)
    }
  },
  methods: {
    showMyEvents() {
      this.showOtherEvents = false
    },
    showOther() {
      this.showOtherEvents = true
    },
    getImage(activityId) {
      fetch( "http://localhost:8080/sport/" + activityId,
          {method: "GET", headers: { "Content-Type": "application/json" , "Authorization": UserService.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD))}})
          .then(response => response.json())
          .then(json => {
            return json.name})
    },
    formatDate(date) {
      return moment(date).format('DD.MM.yyyy')
    },
    goToEditProfile() {
      this.$router.push('/edit_profile/' + this.$route.params.id)
    }
  },
  mounted() {
    this.user = UserService.getUserById(this.$route.params.id).then(
        (res) => {
          this.user = res.data
        }).catch((ex) => {
      console.log(ex)
    })
    setTimeout(()=> {
      this.loading = false
    }, 500)


    fetch( "http://localhost:8080/event?userId=" + this.$route.params.id,
        {method: "GET", headers: { "Content-Type": "application/json" , "Authorization": UserService.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD))}})
        .then(response => response.json())
        .then(json => {
          this.myEvents = json;
        })
    fetch( "http://localhost:8080/user-event/event/" + this.$route.params.id,
        {method: "GET", headers: { "Content-Type": "application/json" , "Authorization": UserService.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD))}})
        .then(response => response.json())
        .then(json => {
          console.log(json)
          this.otherEvents = json;
        })
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