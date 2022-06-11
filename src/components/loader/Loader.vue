<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: "Loader"
}
</script>

<style scoped>
.loader {
  border: 12px solid #F4924A; /* Light grey */
  border-top: 12px solid transparent; /* Blue */
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: spin 1.5s linear infinite;
  position: absolute;
  top: 40%;
  left: 45%;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>