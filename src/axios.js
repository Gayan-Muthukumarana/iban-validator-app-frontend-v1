import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('admin-token');
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = false;
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';