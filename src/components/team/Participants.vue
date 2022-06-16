<template>
  <div class="team-3">
    <div class="team_ohne_button">
      <div class="member" v-for="member in members">
        <img src="../../img/user-icon.svg" alt="" class="img">
        <p class="member-name">{{member.name + ' ' + member.surname}}</p>
      </div>
      <div class="member" v-for="n in actualCount">
        <img src="../../img/question.svg" alt="" class="question">
      </div>
    </div>
    <button class="disabled button" v-show="actualCount === 0">Запис закрито</button>
    <button class="disabled button" v-show="already && actualCount !== 0">Ви вже записані</button>
    <button class="button" v-show="actualCount !== 0 && !already" @click="createUserEvent">Записатися</button>
  </div>
</template>

<script>
import UserService, {API_BASE_URL, USER_ID, USER_NAME_SESSION_ATTRIBUTE_NAME, USER_PASSWORD} from "@/UserService";

export default {
  name: "Participant",
  props: ['maxCount', 'id'],
  data() {
    return {
      minCount: 5,
      actualCount: 0,
      width: Math.ceil(this.$props.maxCount/5),
      members: [],
      already: false,
      userEvent: {
        userId: localStorage.getItem(USER_ID),
        sportEventId: this.$props.id
      }
    }
  },
  mounted() {
    this.width = Math.ceil(this.maxCount/5)
    console.log(this.width)
    fetch(API_BASE_URL + '/user-event/user/' + this.$props.id,
        {method: "GET", headers: { "Content-Type": "application/json" , "Authorization": UserService.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD))}})
        .then(response => response.json())
        .then(json => {
          console.log(json)
          this.members = json;
          Array.from(json).forEach(member => {
                if(member.id === localStorage.getItem(USER_ID)){
                  this.already = true
                  console.log(this.already)
                }
              }
          )
          this.actualCount = this.maxCount - json.length
        })

  },
  methods: {
    createUserEvent() {
      UserService.createUserEvent(this.userEvent).then((res) => {
        console.log(res)
        location.reload();
      })
    }
  }

}
</script>

<style scoped>
.team-3 {
  width: calc(286px * 4);
  height: 375px;
  background: #FFFFFF;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 12px;
}
.team_ohne_button {
  display: grid;
  grid-template-rows: 51px 51px 51px 51px 51px;
  grid-template-columns: 280px 280px 280px;
  grid-auto-flow: column;
  padding-top: 12px;
}
.member {
  display: flex;
  margin-left: 30px;
  margin-right: 30px;
  justify-content: flex-start;
}
/*.member:first-child {*/
/*  margin-top: 12px;*/
/*}*/
.member-name {
  margin-left: 14px;
}
.question {
  margin-top: 6px;
  margin-bottom: 6px;
  height: 40px;
  margin-left: -2px;
}
.img {
  height: 43px;
}
.disabled {
  width: 156px;
  height: 38px;
  background: #9E9E9E;
  border-radius: 7px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.button {
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 30px;
}
.disabled:hover {
  transform: none;
}
</style>