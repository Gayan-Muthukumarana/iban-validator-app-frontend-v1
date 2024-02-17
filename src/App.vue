<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const response = await axios.get('user');
      this.$store.dispatch('setUser', response.data);
    },
  }
}
</script>

<style>
</style>
