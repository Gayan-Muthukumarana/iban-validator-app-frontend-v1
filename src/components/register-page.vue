<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div class="py-5">
        <app-name />
      </div>
      <div class="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an account</h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="submitRegisterForm">
            <div>
              <label for="name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Your name
              </label>
              <input type="text"
                     v-model="name"
                     name="name"
                     id="name"
                     class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                     placeholder="Name"
                     required="" />
            </div>
            <div>
              <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input type="email"
                     v-model="email"
                     name="email"
                     id="email"
                     class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                     placeholder="name@domain.com"
                     required="" />
            </div>
            <div>
              <label for="password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input type="password"
                     v-model="password"
                     name="password"
                     id="password"
                     placeholder="••••••••"
                     class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                     required="" />
            </div>
            <div>
              <label for="confirm-password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Confirm password
              </label>
              <input type="password"
                     v-model="password_confirmation"
                     name="password_confirmation"
                     id="confirm-password"
                     placeholder="••••••••"
                     class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                     required="" />
            </div>
            <div v-if="showErrorMessage" class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
              <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Error!</span> <br>{{ errorMessage }}
              </div>
            </div>
            <button type="submit" class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4">
              Sign up
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <router-link to="/login" class="text-primary-600 dark:text-primary-500 font-medium hover:underline">Login here</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from "axios";
  import AppName from "@/components/app-name.vue";

  export default {
    name: 'register-page',
    components: {
      AppName
    },
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        errorMessage: '',
        showErrorMessage: false,
      }
    },
    methods: {
      async submitRegisterForm() {
        await axios.post('register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        }).then(response => {
          this.showErrorMessage = false;
          if (response.data) {
            this.$router.push('/login');
          } else {
            this.$router.push('/register');
          }
        }).catch(error => {
          this.showErrorMessage = true;
          this.errorMessage = error.response?.data?.message ?? 'Invalid data!';
        });
      },
    }
  }
</script>