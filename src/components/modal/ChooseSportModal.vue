<template>
  <transition name="modal-fade">

    <div class="dark-background">
      <div class="popup">
        <a href="" ><img src="../../img/close.svg" alt="" class="close-icon" @click="close"></a>
        <h3 class="popup-text" v-show="!showSecondStep">Яким спортом будемо займатись?</h3>
        <h3 class="popup-text" v-show="showSecondStep">Якого типу буде подія?</h3>
        <Multiselect
            v-model="sport"
            v-show="!showSecondStep"
            :options="sports"
            searchable = searchable
            class="sports"
            placeholder="Оберіть вид спорту"
            @select="toggleSport"
        />
        <Multiselect
            v-model="type"
            v-show="showSecondStep"
            :options="types"
            class="sports"
            placeholder="Оберіть тип події"
            @select="toggleType"
        />
        <button class="button next-button" v-show="!showSecondStep" @click="showSecond">Далі</button>
        <router-link class="button next-button" v-show="showSecondStep" :to="{ name: 'create_event', params: { sport: sport, type: type, activityType: activityType, id: id } }">Далі</router-link>
      </div>
    </div>

  </transition>

</template>

<script>
import Multiselect from "@vueform/multiselect";
import UserService, {API_BASE_URL, USER_NAME_SESSION_ATTRIBUTE_NAME, USER_PASSWORD} from "@/UserService";

export default {
  name: "ChooseSportModal",
  components: {
    Multiselect,
  },
  data() {
    return {
      showSecondStep: false,
      sport: "init",
      type: "init",
      searchable: true,
      sports: [],
      options: [],
      types: [],
      activityTypes: [],
      activityType: "init",
      ids: [],
      id: 0
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    showSecond() {
      let index = this.sports.indexOf(this.sport)
      let type = this.options[index]
      this.activityType = this.activityTypes[index]
      this.id = this.ids[index]
      if (type === 'ALL') {
        this.types = ['Змагання', 'Тренування', 'Гра']
      } else if (type === 'TRAINING_AND_COMPETITION') {
        this.types = ['Змагання', 'Тренування']
      } else if (type === 'ONLY_TRAINING') {
        this.types = ['Тренування']
      }
      this.showSecondStep = true
    },
    toggleSport(sport) {
      this.$data.sport = sport
      console.log(' >> '+ this.$data.sport )
    },
    toggleType(type) {
      this.$data.type = type
      console.log(' >> '+ this.$data.type )
    }
  },
  mounted() {
    fetch( API_BASE_URL + "/sports",
        {method: "GET", headers: { "Content-Type": "application/json" , "Authorization": UserService.createBasicAuthToken(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), sessionStorage.getItem(USER_PASSWORD))}})
        .then(response => response.json())
        .then(json => {Array.from(json).forEach(sport =>
            this.sports.push(sport.name))
        Array.from(json).forEach(sport =>
            this.options.push(sport.sportEventTypeOpportunities))
          Array.from(json).forEach(sport =>
              this.activityTypes.push(sport.activityType))
          Array.from(json).forEach(sport =>
              this.ids.push(sport.id))
        })

  }
}
</script>

<style scoped>
.popup {
  position: absolute;
  width: 630px;
  height: 260px;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
  z-index: 3;
  background: #FFFFFF;
  border-radius: 10px;
}
.popup-text {
  margin-left: 50px;
  margin-top: 32px;
  margin-bottom: 49px;
}
.dark-background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.37);
  z-index: 2;
}
.close-icon {
  position: absolute;
  right: 24px;
  top: 24px;
}
.sports {
  height: 50px;
  width: 476px;
  border: 1px solid #C5C5C5;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
}
.next-button {
  width: 156px;
  margin-top: 44px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
</style>