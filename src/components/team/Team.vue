<template>
<div v-bind:class="getClass()">
  <div class="team_ohne_button">
    <div class="member" v-for="member in this.$props.members">
      <img src="../../img/user-icon.svg" alt="" class="img">
      <p class="member-name">{{member}}</p>
    </div>
    <div class="member" v-for="n in actualCount">
      <img src="../../img/question.svg" alt="" class="question">
    </div>
  </div>
  <button class="disabled button" v-show="actualCount === 0">Запис закрито</button>
  <button class="button" v-show="actualCount !== 0">Записатися</button>
</div>
</template>

<script>
export default {
  name: "Team",
  props: ['members', 'maxCount'],
  data() {
    return {
      minCount: 5,
      actualCount: 0,
      width: Math.ceil(this.$props.maxCount/5)
    }
  },
  mounted() {
    this.actualCount = this.maxCount - this.$props.members.length
    this.width = Math.ceil(this.maxCount/5)
    console.log(this.width)
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
  height: 325px;
  background: #FFFFFF;
  border-radius: 10px;
}
.team-2 {
  /*display: inline-block;*/
  /*width: 286px;*/
  width: calc(286px * 2);
  height: 325px;
  background: #FFFFFF;
  border-radius: 10px;
}
.team-3 {
  /*display: inline-block;*/
  /*width: 286px;*/
  width: calc(286px * 3);
  height: 325px;
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