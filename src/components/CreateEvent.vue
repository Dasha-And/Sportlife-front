<template>
<div class="wrapper">
  <AuthorizedHeader></AuthorizedHeader>
  <h1 class="create-title">Створення {{ type}} з: {{ $route.params.sport }}</h1>
  <form action="" class="create-form" name="game" v-show="$route.params.type === 'Спортивна гра'">
    <input type="datetime-local" name="date" placeholder="Дата та час" class="height">
    <Multiselect
        v-model="value"
        :options="towns.data"
        searchable=true
        class="towns"
        placeholder="Оберіть місто"
        name="town"
    />
    <input type="text" name="minimum-amount" placeholder="Введіть мінімальну кількість людей" class="height">
    <input type="text" name="maximum-amount" placeholder="Введіть максимальну кількість людей" class="height">
    <textarea name="maximum-amount" placeholder="Опис події" class="textarea-height"></textarea>
    <input
        class="height"
        type="text"
        :value="street"
        ref="streetRef"
        placeholder="Street"/>
  </form>

  <form action="" class="create-form" name="training" v-show="$route.params.type === 'Тренування'">
    <input type="datetime-local" name="date" placeholder="Дата та час" class="height">
    <Multiselect
        v-model="value"
        :options="towns.data"
        searchable=true
        class="towns"
        placeholder="Оберіть місто"
        name="town"
    />
    <input type="text" name="minimum-amount" placeholder="Введіть максимальну кількість людей" class="height">
    <textarea name="maximum-amount" placeholder="Опис події" class="textarea-height"></textarea>
    <input
        class="height"
        type="text"
        :value="street"
        ref="streetRef"
        placeholder="Street"/>
  </form>

  <form action="" class="create-form" name="competition" v-show="$route.params.type === 'Змагання'">
    <input type="datetime-local" name="date" placeholder="Дата та час" class="height">
    <Multiselect
        v-model="value"
        :options="towns.data"
        searchable='true'
        class="towns"
        placeholder="Оберіть місто"
        name="town"
    />
    <input type="text" name="minimum-amount" placeholder="Введіть мінімальну кількість людей у команді" class="height">
    <input type="text" name="minimum-amount" placeholder="Введіть максимальну кількість людей у команді" class="height">
    <textarea name="maximum-amount" placeholder="Опис події" class="textarea-height"></textarea>
    <input
        class="height"
        type="text"
        :value="street"
        ref="streetRef"
        placeholder="Street"/>
  </form>

<h3 class="choose-place">Оберіть місце проведення</h3>
</div>
</template>

<script>
import AuthorizedHeader from "@/components/header/AuthorizedHeader";
import Multiselect from "@vueform/multiselect";
import {onMounted, onUnmounted, ref} from "vue";
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
  },
  setup(props, context) {
    const streetRef = ref();
    let autocomplete;

    onMounted(() => {
      autocomplete = new google.maps.places.Autocomplete(streetRef.value, {
        types: ["address"],
        fields: ["address_components"]
      });

      google.maps.event.addListener(autocomplete, "place_changed", () => {
        const mapping = {
          street_number: "update:streetNumber",
          route: "update:street",
          locality: "update:city",
          postal_code: "update:postcode",
          country: "update:country",
        }

        for(const type in mapping) {
          context.emit(mapping[type], "");
        }

        let place = {
          address_components: [],
          ...autocomplete.getPlace()
        }

        place.address_components.forEach((component) => {
          component.types.forEach((type) => {
            if(mapping.hasOwnProperty(type)){
              context.emit(mapping[type], component.long_name);
            }
          });
        });
      });
    });
    onUnmounted(() => {
      if(autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    });

    return {streetRef};
  }
}
</script>

<style>
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
.create-form {
  margin-top: 36px;
  width: 615px;
  margin-left: auto;
  margin-right: auto;
}
.create-title {
  margin-top: 72px;
  margin-bottom: 70px;
}
.multiselect-placeholder {
  color: #B4B4B4;
  font-weight: 400;
  padding-left: 31px;
}
.multiselect-search {
  padding-left: 31px;
}
.multiselect-single-label {
  padding-left: 31px;
}
.textarea-height {
  height: 170px;
  padding-top: 15px;
}
.choose-place {
  margin-top: 70px;
  margin-bottom: 70px;
}
</style>