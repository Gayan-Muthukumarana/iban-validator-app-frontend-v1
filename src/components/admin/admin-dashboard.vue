<template>
  <nav-bar />
  <div class="p-10">
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        perPage: 10,
        position: 'bottom',
        setCurrentPage: 1,
        jumpFirstOrLast : true,
        firstLabel : 'First Page',
        lastLabel : 'Last Page',
        nextLabel: 'next',
        prevLabel: 'prev',
        ofLabel: 'of',
        pageLabel: 'page',
        allLabel: 'All',
        infoFn: (params) => `page ${params.firstRecordOnPage}`,
      }">
    </vue-good-table>
  </div>

</template>

<script>
  import axios from "axios";
  import NavBar from "@/components/nav-bar.vue";
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table-next';

  export default {
    name: 'admin-dashboard',
    components: {
      NavBar,
      VueGoodTable
    },
    data() {
      return {
        email: '',
        password: '',
        columns: [
          {
            label: 'User Name',
            field: 'name',
          },
          {
            label: 'User Email',
            field: 'email',
          },
          {
            label: 'IBA Number',
            field: 'iba_number',
          },
          {
            label: 'Created On',
            field: 'createdAt',
            type: 'date',
            dateInputFormat: 'yyyy-MM-dd',
            dateOutputFormat: 'yyyy MMM dd',
          },
        ],
        rows: [],
      }
    },
    created() {
      this.loadIbaNumbersList();
    },
    methods: {
      async submitLoginForm() {
        const response = await axios.post('admin-login', {
          email: this.email,
          password: this.password
        });

        localStorage.setItem('admin-token', response.data.data.token);
        this.$store.dispatch('setAdminUser', response.data.data.user);
        this.$router.push('/admin-dashboard');
      },
      async loadIbaNumbersList() {
        const response = await axios.get('iban-data');
        this.rows = response.data.map(item => ({
            id: item.id,
            name: item.user.name,
            email: item.user.email,
            iba_number: item.iba_number,
            createdAt: item.created_at.split('T')[0]
        }));
      },
    }
  }
</script>