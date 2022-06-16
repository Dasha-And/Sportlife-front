<template>
<div v-bind:class="getClass()">
  <p>{{name}}</p>
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
  <button class="button" v-show="actualCount !== 0 && !already" @click="createUserTeam">Записатися</button>
</div>
</template>

<script>
import UserService, {API_BASE_URL, USER_ID, USER_NAME_SESSION_ATTRIBUTE_NAME, USER_PASSWORD} from "@/UserService";

export default {
  name: "Team",
  props: ['maxCount', 'name', 'id', 'eventId'],
  data() {
    return {
      minCount: 5,
      actualCount: 0,
      width: Math.ceil(this.$props.maxCount/5),
      members: [],
      already: false,
      userTeam: {
        profileId: localStorage.getItem(USER_ID),
        teamId: this.$props.id
      },
      userEvent: {
        userId: localStorage.getItem(USER_ID),
        sportEventId: this.$props.eventId
      }
    }
  },
  mounted() {
    this.width = Math.ceil(this.maxCount/5)
    console.log(this.width)
    fetch(API_BASE_URL + '/user-team/user/' + this.$props.id,
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
    getClass() {
      // console.log(Math.ceil(this.$props.maxCount/5))
      // if (Math.ceil(this.$props.maxCount/5) === 2) {
      //   return 'team-2'
      // } else if (Math.ceil(this.$props.maxCount/5) === 3) {
      //   return 'team-3'
      // }
      // return 'team-1'
      return {
        'team-2' : this.width === 2,
        'team-3' : this.width === 3,
        'team-1' : this.width === 1
      }
    },
    createUserTeam() {
      UserService.createUserTeam(this.userTeam).then((res) => {
        console.log(res)
        UserService.createUserEvent(this.userEvent).then((res) => {
          console.log('userEvent:> ' + res)
        }).catch((ex) => {
          console.log(ex)
        })
        location.reload();
      })
    }
  },
  computed: {
    cssProps() {
      return {
        '--width': 2
      }
    }
  }
}
</script>

<style scoped>
.team-1 {
  /*display: inline-block;*/
  /*width: 286px;*/
  width: 286px;
  height: 375px;
  background: #FFFFFF;
  border-radius: 10px;
}
.team-2 {
  /*display: inline-block;*/
  /*width: 286px;*/
  width: calc(286px * 2);
  height: 375px;
  background: #FFFFFF;
  border-radius: 10px;
}
.team-3 {
  /*display: inline-block;*/
  /*width: 286px;*/
  width: calc(286px * 3);
  height: 375px;
  background: #FFFFFF;
  border-radius: 10px;
}
.team_ohne_button {
  display: grid;
  grid-template-rows: 51px 51px 51px 51px 51px;
  grid-template-columns: 280px 280px 280px;
  grid-auto-flow: column;
  margin-top: 12px;
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
  margin-top: 12px;
}
.disabled:hover {
  transform: none;
}
</style>