<script>
import WeatherComponent from './Weather.vue'
export default {
  components:{WeatherComponent},
  data: () => ({
    apiResponse: null
  }),

  created() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      const url = 'http://127.0.0.1:8000/'
      this.apiResponse = await (await fetch(url)).json()
    }
  }
}
</script>

<template>
  <div class="">
    <div v-if="!apiResponse">
      Pinging the api...
    </div>

    
    <div v-else>
      <weather-component :data="apiResponse" ></weather-component>
    </div>

  </div>
  <!-- <div v-if="apiResponse">
    The api responded with: <br />
    <code>
    {{ apiResponse }}
    </code>
  </div> -->

  
</template>