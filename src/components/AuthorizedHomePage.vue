<template>
<div class="wrapper">

  <AuthorizedHeader v-bind:selected="selected" ></AuthorizedHeader>
  <h1>Всі події</h1>
  <h3>Фільтри</h3>
  <div class="filters">
    <Multiselect
        :options="towns.data"
        searchable=searchable
        class="towns"
        placeholder="Оберіть місто"
    />
    <Multiselect
        :options="sports"
        searchable=searchable
        class="towns"
        placeholder="Оберіть вид спорту"
    />
    <input type="date" placeholder="Оберіть дату">
  </div>
</div>
</template>

<script>
import AuthorizedHeader from "@/components/header/AuthorizedHeader";

export default {
  name: "AuthorizedHomePage",
  components: {
    AuthorizedHeader
  },
  data() {
    return {
      selected: 'main',
      searchable: true,
      towns: [],
      sports: []
    }
  },
  mounted() {
    fetch("https://countriesnow.space/api/v0.1/countries/cities",
        {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country: "ukraine" })})
        .then(response => response.json())
        .then(json => {this.towns = json})
  }
}
</script>

<style scoped>
.filters {
  display: flex;
}
</style>