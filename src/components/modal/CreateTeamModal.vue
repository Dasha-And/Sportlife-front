<template>
  <transition name="modal-fade">

    <div class="dark-background">
      <div class="popup">
        <a href="" ><img src="../../img/close.svg" alt="" class="close-icon" @click="close"></a>
        <h3 class="popup-text">Створення команди</h3>
        <input type="text" name="name" placeholder="Назва команди" class="sports height" v-model="team.name">
        <Multiselect
            v-model="team.count"
            :options="options"
            class="sports"
            placeholder="Оберіть кількість людей у команді"
        />
        <Multiselect
            v-model="members"
            :options="users"
            class="sports members"
            mode="tags"
            searchable="searchable"
            placeholder="Додайте людей за бажанням"
        />
        <button class="button next-button" @click="createTeam">Створити</button>
      </div>
    </div>

  </transition>

</template>

<script>
import Multiselect from "@vueform/multiselect";
import UserService, {API_BASE_URL, USER_ID, USER_NAME_SESSION_ATTRIBUTE_NAME, USER_PASSWORD} from "@/UserService";

export default {
  name: "CreateTeamModal",
  props: ['minCountTeam', 'maxCountTeam', 'id'],
  components: {
    Multiselect,
  },
  data() {
    return {
      showSecondStep: false,
      amount: 0,
      members: [],
      min: this.minCountTeam,
      max: this.maxCountTeam,
      searchable: true,
      users: [],
      usersIds: [],
      options: ['6'],
      team: {
        name: '',
        sportEventId: this.id,
        count: ''
      }
    }
  },
  mounted() {
    // console.log(this.min)
    // console.log(this.max)
    fetch( API_BASE_URL + "/users",
        {method: "GET", headers: { "Content-Type": "application/json" , "Authorization": UserService.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD))}})
        .then(response => response.json())
        .then(json => {Array.from(json).forEach(sport =>
            this.users.push(sport.name + ' ' + sport.surname))
          Array.from(json).forEach(sport =>
            this.usersIds.push(sport.id))
        }).catch((ex) => {
          console.log(ex)
    })
    // if (this.max === this.min) {
    //   this.options.push(this.min)
    // } else {
    //   for (let i = this.min; i <= this.max; i++) {
    //     console.log(i)
    //     this.options.push(i)
    //   }
    // }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    showSecond() {
      this.showSecondStep = true
    },
    toggleSport(sport) {
      this.$data.sport = sport
      console.log(' >> '+ this.$data.sport )
    },
    toggleType(type) {
      this.$data.type = type
      console.log(' >> '+ this.$data.type )
    },
    createTeam() {
      UserService.createTeam(this.team).then((res) => {
        console.log(this.team)
        console.log(res)
        if (res.status === 201) {
          location.reload()
        }
        console.log(this.members)
        let userTeam;
        let userEvent;
        Array.from(this.members).forEach(member => {
          userTeam = {profileId : member.id, teamId: res.data.id}
          UserService.createUserTeam(userTeam)
          userEvent = {userId: member.id, sportEventId: this.team.sportEventId}
          UserService.createUserEvent(userEvent)
        })
      }).catch((ex) => {
        console.log(this.team)
        console.log(ex)
      })
    }
  }
}
</script>

<style scoped>
.popup {
  position: absolute;
  width: 572px;
  height: 450px;
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
  height: 150vh;
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
.members {
  height: 94px;
  margin-top: 26px;
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
.height {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>