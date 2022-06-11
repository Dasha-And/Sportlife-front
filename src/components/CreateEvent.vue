<template>
<div class="wrapper">
  <AuthorizedHeader></AuthorizedHeader>
  <h1 class="create-title">Створення {{ type}} з: {{ $route.params.sport }}</h1>

  <div class="create-form" name="game">
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
    <button class="button create-button" @click="createEvent">Створити подію</button>
  </div>

</div>
</template>

<script>
import AuthorizedHeader from "@/components/header/AuthorizedHeader";
import Multiselect from "@vueform/multiselect";
import UserService, {USER_ID} from "@/UserService";
export const ADDRESS = "";
export default {
  name: "CreateEvent",
  data() {
    return {
      towns: [],
      map: 'init',
      searchable: true,
      type: this.$route.params.type.toLowerCase(),
      event: {
        name: this.$route.params.type + " з: " + this.$route.params.sport,
        sportEventType: this.$route.params.type.toLowerCase(),
        startDate: "",
        description: "",
        profileId: localStorage.getItem(USER_ID),
        town: "Kyiv",
        address: "",
        activityId: this.$route.params.id,
        minCount: null,
        maxCount: null,
        minCountTeam: null,
        maxCountTeam: null
      }
    }
  },
  components: {
    AuthorizedHeader,
    Multiselect
  },
  mounted() {
    // const map = new window.google.maps.Map(document.getElementById('map'),{
    //   center: { lat: 34.855273888888888, lng: 135.30649 }, //自由な緯度・経度を入力
    //   zoom: 10,
    // });
    console.log(localStorage.getItem(USER_ID))
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
        alert("Something got wrong " + status);
      }
    });
    if (this.$route.params.type === 'Гра') this.$data.type = 'гри'
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
    createEvent() {
      this.event.address = sessionStorage.getItem(ADDRESS)
      UserService.createEvent(this.event).then((res) => {
        console.log(this.event)
        console.log(res.status)
        if (res.status === 201) {
          this.$router.push(`/profile/` + localStorage.getItem(USER_ID))
        }
      }).catch((ex) => {
        console.log(this.event)
        console.log(ex)
      })
    }
  }
}
</script>

<style>
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
.create-form {
  margin-top: 36px;
  width: 615px;
  margin-left: auto;
  margin-right: auto;
}
.create-title {
  margin-top: 72px;
  margin-bottom: 70px;
}
.multiselect-placeholder {
  color: #B4B4B4;
  font-weight: 400;
  padding-left: 31px;
}
.multiselect-search {
  padding-left: 31px;
}
.multiselect-single-label {
  padding-left: 31px;
}
.textarea-height {
  height: 170px;
  padding-top: 15px;
  resize: none;
}
.choose-place {
  margin-top: 70px;
  margin-bottom: 70px;
}
.pac-item {
  font-family: Montserrat;
}
.pac-matched {
  color: #F4924A;
}
.search {
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 28px;
}
.create-button {
  width: 220px;
}
</style>