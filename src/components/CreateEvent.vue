<template>
<div class="wrapper">
  <AuthorizedHeader></AuthorizedHeader>
  <h1>Створення {{ type}} з: {{ $route.params.sport }}</h1>
  <input type="datetime-local" name="date" placeholder="Електронна пошта" class="height">
  <Multiselect
      v-model="value"
      :options="towns.data"
      searchable=true
      class="towns"
      placeholder="Оберіть місто"
  />

</div>
</template>

<script>
import AuthorizedHeader from "@/components/header/AuthorizedHeader";
import Multiselect from "@vueform/multiselect";
export default {
  name: "CreateEvent",
  data() {
    return {
      type: this.$route.params.type.toLowerCase(),
      towns: []
    }
  },
  components: {
    AuthorizedHeader,
    Multiselect
  },
  mounted() {
    if (this.$route.params.type === 'Спортивна гра') this.type = 'гри'
    fetch("https://countriesnow.space/api/v0.1/countries/cities",
        {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country: "ukraine" })})
        .then(response => response.json())
        .then(json => {this.towns = json})
  }

}
</script>

<style scoped>
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
</style>