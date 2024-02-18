<template>
  <nav-bar />
  <div class="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center" style="background-image: url('/images/bank-banner.jpg'); height: 820px">
    <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed" style="background-color: rgba(0, 0, 0, 0.6)">
      <div class="flex h-full items-center justify-center">
        <div v-if="user" class="text-white">
          <h2 class="mb-4 text-2xl font-semibold">Please insert your IBAN(International Bank Account Number) to validate.</h2>

          <form @submit.prevent="checkValidity">
            <label for="search" class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
            <div class="relative">
              <input type="text"
                     v-model="iba_number"
                     id="search"
                     class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                     placeholder="IBA Number"
                     required />
              <button type="submit" class="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Check</button>
            </div>
          </form>

          <div v-if="isSubmitted" class="my-2">
            <div v-if="successMessage" class="mb-4 flex items-center rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-800 dark:border-green-800 dark:bg-gray-800 dark:text-green-400" role="alert">
              <svg class="me-3 inline h-4 w-4 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <div><span class="font-medium">Success!</span> <br> {{ returningMessage }}</div>
            </div>
            <div v-else class="mb-4 flex items-center rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg class="me-3 inline h-4 w-4 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <div><span class="font-medium">Error!</span> {{ returningMessage }}</div>
            </div>
          </div>
        </div>
        <div v-else class="text-white">
          <h2 class="mb-4 text-2xl font-semibold">Please login or sign up to validate your IBAN(International Bank Account Number).</h2>
          <router-link to="/login">
            <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Proceed to Login
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/nav-bar.vue";
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: 'home-page',
  components: {
    NavBar
  },
  data() {
    return {
      iba_number: '',
      successMessage: false,
      returningMessage: '',
      isSubmitted: false,
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async checkValidity() {
      this.isSubmitted = true;
      await axios.post('check-validity', {
        iba_number: this.iba_number
      }).then(res => {
        this.successMessage = true;
        this.returningMessage = res.response?.data?.message ?? 'Your IBA Number is valid.';
      }).catch(error => {
        this.successMessage = false;
        this.returningMessage = error.response?.data?.message ?? 'Invalid IBA Number.';
      });
    }
  }
}
</script>