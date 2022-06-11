<template>
<div class="wrapper">
  <Loader v-if="loading"></Loader>

  <div class="content" v-else-if="author !== '' && event !== {}">
    <AuthorizedHeader/>
    <h1 class="title-event">{{event.name}}</h1>
    <p class="author">Автор: {{author}}</p>
    <p class="description">Опис: {{event.description}}</p>
    <h3 class="bottom">Команди</h3>

    <div class="teams-block">
<!--      <div v-bind:class="getClass()">-->
<!--        -->
<!--      </div>-->
      <carousel :items-to-show="amount" :snap-align="start" class="carousel">
        <slide v-for="slide in 9" :key="slide">
          <Team
              v-bind:members="members"
              v-bind:max-count="maxCount"
          ></Team>
        </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
      <button class="create-team" v-on:click="showModal()">Створити команду</button>
    </div>
    <h3 class="address">Адреса: {{event.address}}</h3>
  </div>

</div>
  <CreateTeamModal
      v-show="isCreateTeamModalVisible"
      @close="closeModal"
  />
</template>

<script>
import AuthorizedHeader from "@/components/header/AuthorizedHeader";
import Team from "@/components/team/Team";
import CreateTeamModal from "@/components/modal/CreateTeamModal";
import UserService from "@/UserService";
import Loader from "@/components/loader/Loader";
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
  name: "EventPage",
  components: {
    AuthorizedHeader,
    Team,
    CreateTeamModal,
    Loader,
    Carousel,
    Slide,
    Pagination,
    Navigation
  },
  data() {
    return {
      members: ['Іван Русанов', 'Костя Молчанов', 'Влад Сіроус', 'Ілля Шутєєв', 'Сергій Мельник'],
      isCreateTeamModalVisible: false,
      eventId: this.$route.params.id,
      event: {},
      loading: true,
      author: '',
      maxCount: 5
    }
  },
  computed: {
    amount() { return Math.floor(15/this.maxCount)}
  },
  methods: {
    showModal() {
      this.isCreateTeamModalVisible = true;
      console.log(this.isCreateTeamModalVisible)
    },
    closeModal() {
      this.isCreateTeamModalVisible = false;
    },
    getClass() {
      return {
        'teams' : Math.ceil(this.maxCount/5) === 1,
        'teams-2': Math.ceil(this.maxCount/5) === 2
      }
    },
    getAmount() {
      return {
        3: this.$data.maxCount === 5,
        2: this.$data.maxCount ,
        1: this.$data.maxCount > 10
      }
    }
  },
  mounted() {
    UserService.getEvent(this.eventId).then((res) => {
      this.event = res.data
      UserService.getUserById(this.event.profileId).then((res) => {
        this.author = res.data.name + " " + res.data.surname
      })
    })

    setTimeout(()=> {
      this.loading = false
    }, 1000)
  }
}
</script>

<style>
.author {
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 50px;
}
.description {
  line-height: 174.9%;
  margin-bottom: 50px;
}
.teams-block {
  width: 1163px;
  height: 467px;
  margin-left: auto;
  margin-right: auto;
  background: #E4E4E4;
  border-radius: 10px;
}
.teams {
  display: grid;
  column-gap: 72px;
  row-gap: 78px;
  grid-template-columns: 286px 286px 286px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 37px;
  width: 1001px;
}
.teams-2 {
  margin-left: auto;
  margin-right: auto;
  padding-top: 37px;
  width: 1001px;
}
.title-event {
  margin-top: 56px;
  margin-bottom: 50px;
}
.bottom {
  margin-bottom: 50px;
}
.create-team {
  width: 227px;
  height: 38px;
  background: #FFFFFF;
  border: 1px solid #F4924A;
  border-radius: 7px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  color: #F4924A;
  cursor: pointer;
  margin: 20px auto 23px;
  display: block;
}
.address {
  margin-top: 50px;
}
.carousel {
  padding-top: 30px;
}
.carousel__prev, .carousel__next {
  background-color: #F4924A;
}
.carousel__pagination-button--active {
  background-color: #F4924A;
}
:root {
  --vc-clr-primary: #F4924A;
  --vc-clr-secondary: #8e98f3;
  --vc-clr-white: #ffffff;
  --vc-icn-width: 1.2em;
  --vc-nav-width: 30px;
  --vc-nav-color: #ffffff;
  --vc-nav-background-color: #F4924A;
  --vc-pgn-width: 10px;
  --vc-pgn-height: 5px;
  --vc-pgn-margin: 5px;
  --vc-pgn-border-radius: 0;
  --vc-pgn-background-color: #FFFF;
  --vc-pgn-active-color: var(--vc-clr-primary);
}
</style>