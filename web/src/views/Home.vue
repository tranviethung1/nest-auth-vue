<template>
  <div class="container">
    <header class="jumbotron">
      <div v-for="(user, key) in data" :key="key">
        <span>{{user.username}}</span> - 
        <span>{{user.email}}</span> - <span>{{user.roles}}</span>
      </div>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      data: {}
    };
  },
  create : {
     $route() {
        document.title ='Some Default Title';
    },
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.data = response.data;
      },
      error => {
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString() ;
      }
    );
  }
};
</script>
