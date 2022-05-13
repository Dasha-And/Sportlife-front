<template>
<div class="wrapper">

  <AuthorizedHeader v-bind:selected="selected" ></AuthorizedHeader>

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
      selected: 'main'
    }
  }
}
</script>

<style scoped>

</style>