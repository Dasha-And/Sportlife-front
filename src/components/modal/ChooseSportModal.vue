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
            :options="['Баскетбол', 'Футбол', 'Стрітбол', 'Біг', 'Фітнес-аеробіка']"
            searchable = true
            class="sports"
            placeholder="Оберіть вид спорту"
            @select="toggleSport"
        />
        <Multiselect
            v-model="type"
            v-show="showSecondStep"
            :options="['Змагання', 'Тренування', 'Спортивна гра']"
            class="sports"
            placeholder="Оберіть тип події"
            @select="toggleType"
        />
        <button class="button next-button" v-show="!showSecondStep" @click="showSecond">Далі</button>
        <router-link class="button next-button" v-show="showSecondStep" :to="{ name: 'create_event', params: { sport: sport, type: type } }">Далі</router-link>
      </div>
    </div>

  </transition>

</template>

<script>
import Multiselect from "@vueform/multiselect";

export default {
  name: "ChooseSportModal",
  components: {
    Multiselect,
  },
  data() {
    return {
      showSecondStep: false,
      sport: "init",
      type: "init"
    }
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
    }
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