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
    this.getAdminUser();
  },
  methods: {
    async getUser() {
      const response = await axios.get('user');
      this.$store.dispatch('setUser', response.data);
    },
    async getAdminUser() {
      const response = await axios.get('admin-user');
      this.$store.dispatch('setAdminUser', response.data);
    },
  }
}
</script>
