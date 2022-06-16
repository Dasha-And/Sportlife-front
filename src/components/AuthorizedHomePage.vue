<template>

  <Loader v-if="loading"></Loader>
  <div class="content" v-else-if="events !== []">
    <div class="wrapper">
    <AuthorizedHeader v-bind:selected="selected" ></AuthorizedHeader>
    <h1>Всі події</h1>
    <h3>Фільтри</h3>
    <div class="filters">
      <Multiselect
          :options="towns.data"
          searchable=searchable
          class="towns height"
          placeholder="Оберіть місто"
          v-model="town"
      />
      <Multiselect
          :options="sports"
          searchable=searchable
          class="towns height"
          placeholder="Оберіть вид спорту"
          v-model="activity"
      />
      <input type="date" placeholder="Оберіть дату" v-model="date" class="height">
    </div>
    <button class="button" @click="getFilteredEvents">Фільтрувати</button>
    <div class="events">
      <SingleEvent
          v-for="event in this.events"
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

    <div class="footer">
  </div>
</div>
</template>

<script>
import AuthorizedHeader from "@/components/header/AuthorizedHeader";
import UserService, {API_BASE_URL, USER_NAME_SESSION_ATTRIBUTE_NAME, USER_PASSWORD} from "@/UserService";
import Multiselect from "@vueform/multiselect";
import SingleEvent from "@/components/event/SingleEvent";
import Loader from "@/components/loader/Loader";

export default {
  name: "AuthorizedHomePage",
  components: {
    AuthorizedHeader,
    Multiselect,
    SingleEvent,
    Loader
  },
  data() {
    return {
      selected: 'main',
      searchable: true,
      towns: [],
      sports: [],
      sportsId: [],
      activity: null,
      town: null,
      date: null,
      events: [],
      author: '',
      loading: true
    }
  },
  mounted() {
    fetch(API_BASE_URL + '/events',
      {method: "GET", headers: { "Content-Type": "application/json" , "Authorization": UserService.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD))}})
      .then(response => response.json())
      .then(json => {
        this.events = json;
      })
    fetch("https://countriesnow.space/api/v0.1/countries/cities",
        {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country: "ukraine" })})
        .then(response => response.json())
        .then(json => {this.towns = json})
    fetch(API_BASE_URL + '/sports', {method: "GET", headers: { "Content-Type": "application/json" }})
        .then(response => response.json())
        .then(json => {Array.from(json).forEach(sport =>
            this.sports.push(sport.name))
          Array.from(json).forEach(sport =>
              this.sportsId.push(sport.id))
        })
    // API_BASE_URL + '/events?activityId=' + this.activity + '&startDate=' + this.date + '&town=' + this.town
    setTimeout(()=> {
      this.loading = false
    }, 1500)

  },
   methods: {
    getFilteredEvents() {
      let index = this.sports.indexOf(this.activity)
      this.activity = this.sportsId[index]
      let params = {}
      if (this.activity != null) {
        params.activityId = this.activity
      }
      if (this.date != null) {
        params.startDate = this.date
      }
      if (this.town != null) {
        params.town = this.town
      }
      console.log(params)
      fetch(API_BASE_URL + '/events?' + new URLSearchParams(params).toString(),
          {method: "GET", headers: { "Content-Type": "application/json" , "Authorization": UserService.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD))}})
          .then(response => response.json())
          .then(json => {
            this.events = json;
          })
    }
   }
}
</script>

<style scoped>
.filters {
  display: flex;
}
.height {
  width: 369px;
}
.button {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 142px;
  height: 38px;
  margin-top: 51px;
  margin-bottom: 51px;

}
.footer {
  height: 350px;
  background: #F4924A;
  margin-top: 84px;
}
</style>