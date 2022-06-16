<template>
  <div class="wrapper">
    <AuthorizedHeader v-bind:selected="selected"></AuthorizedHeader>
    <h1>Редагувати подію</h1>
    <form action="" class="reg-form" v-on:submit.prevent="submitForm">
      <input type="datetime-local" name="startDate" placeholder="Дата та час" class="height" v-model="event.startDate">
      <Multiselect
          v-model="event.town"
          :options="towns.data"
          searchable=searchable
          class="towns"
          placeholder="Оберіть місто"
          name="town"
          @select="onTownSelected"
      />
      <input type="text" name="minCount" placeholder="Введіть мінімальну кількість людей" class="height" v-show="$route.params.type === 'Гра'" v-model="event.minCount">
      <input type="text" name="maxCount" placeholder="Введіть максимальну кількість людей" class="height" v-show="$route.params.type === 'Тренування' || 'Гра'" v-model="event.maxCount">
      <input type="text" name="minCountTeam" placeholder="Введіть мінімальну кількість людей у команді" class="height" v-show="$route.params.type === 'Змагання' && $route.params.activityType === 'TEAM'" v-model="event.minCountTeam">
      <input type="text" name="minCountTeam" placeholder="Введіть максимальну кількість людей у команді" class="height" v-show="$route.params.type === 'Змагання' && $route.params.activityType === 'TEAM'" v-model="event.maxCountTeam">
      <textarea name="description" placeholder="Опис події" class="textarea-height" v-model="event.description"></textarea>
      <input
          id="autocomplete"
          class="height search"
          type="text"
          ref="autocomplete"
          v-model="event.address"
          name="address"
          placeholder="Введіть адресу місця проведення"/>
      <button class="button reg-button" type="submit">Зберегти</button>
    </form>
  </div>

</template>

<script>

import AuthorizedHeader from "@/components/header/AuthorizedHeader";
import UserService, {
  API_BASE_URL,
  USER_FULLNAME,
  USER_ID,
  USER_NAME_SESSION_ATTRIBUTE_NAME,
  USER_PASSWORD
} from "@/UserService";
import Multiselect from "@vueform/multiselect";
import axios from "axios";
import {ADDRESS} from "@/components/CreateEvent";
import moment from "moment";

export default {
  name: "EditProfile",
  components: {
    AuthorizedHeader,
    Multiselect
  },
  data() {
    return {
      selected: 'profile',
      towns: [],
      address: '',
      event: {
        name: '',
        sportEventType: '',
        startDate: '',
        description: '',
        profileId: '',
        town: '',
        address: '',
        activityId: '',
        minCount: '',
        maxCount: '',
        minCountTeam: '',
        maxCountTeam: ''
      }
    }
  },
  computed: {
    date: {
      get() {
        return this.form.dateOfBirth;
      },
      set(newValue) {
        this.form.dateOfBirth = newValue;
      },
    },
  },
  mounted() {
    UserService.getEvent(this.$route.params.id).then((res) => {
      this.event = res.data
      this.event.startDate = moment(this.event.startDate).format("YYYY-MM-DDTkk:mm")
      this.address = res.data.address
    })
    var options = {
      componentRestrictions: {country: "ua"}
    };
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': this.event.town
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var Lat = results[0].geometry.location.lat();
        var Lng = results[0].geometry.location.lng();
        let autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            {
              bounds: new google.maps.LatLngBounds(
                  new google.maps.LatLng(Lat, Lng)
              )
            },
            options
        )
        google.maps.event.addListener(autocomplete, "place_changed", () => {
          sessionStorage.setItem(ADDRESS, autocomplete.getPlace().formatted_address);
          console.log(autocomplete.getPlace().formatted_address)
        });
      } else {
        console.log("Something got wrong " + status + results);
      }
    });

    fetch("https://countriesnow.space/api/v0.1/countries/cities",
        {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country: "ukraine" })})
        .then(response => response.json())
        .then(json => {this.towns = json})

  },
  methods: {

    onTownSelected() {
      var options = {
        componentRestrictions: {country: "ua"}
      };
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'address': this.event.town
      }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var Lat = results[0].geometry.location.lat();
          var Lng = results[0].geometry.location.lng();
          let autocomplete = new google.maps.places.Autocomplete(
              document.getElementById("autocomplete"),
              {
                bounds: new google.maps.LatLngBounds(
                    new google.maps.LatLng(Lat, Lng)
                )
              },
              options
          )
          google.maps.event.addListener(autocomplete, "place_changed", () => {
            sessionStorage.setItem(ADDRESS, autocomplete.getPlace().formatted_address);
            console.log(autocomplete.getPlace().formatted_address)
          });
          this.event.address = address
        } else {
          alert("Something got wrong " + status);
        }
      });
    },
    handleInput(value) {
      this.event.address = value
    },
    submitForm(){
      this.event.address = this.address
      console.log(this.event)
      if (this.event.sportEventType === 'TRAINING') this.event.sportEventType = 'тренування'
      if (this.event.sportEventType === 'GAME') this.event.sportEventType = 'гра'
      if (this.event.sportEventType === 'COMPETITION') this.event.sportEventType = 'змагання'
      axios.put(API_BASE_URL + '/event/' + this.$route.params.id, this.event, { headers: { authorization: UserService.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }})
          .then((res) => {
            //Perform Success Action
            console.log(res)
          })
          .catch((error) => {
            // error.response.status Check status code
            console.log(error)
          })
          .finally(() => {
            this.$router.push(`/profile/` + localStorage.getItem(USER_ID))
          });
    }
  }
}
</script>

<style scoped>
.reg-form {
  margin-top: 43px;
  width: 615px;
  margin-left: auto;
  margin-right: auto;
}
.towns {
  width: 615px;
  height: 50px;
  border: 1px solid #C5C5C5;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 28px;
  position: relative;
  z-index: 1;
}
.textarea-height {
  margin-bottom: 28px;
}
.reg-button {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.hidden {
  display: none;
}
</style>