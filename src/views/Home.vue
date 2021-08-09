<template>
  <div class="home">
    <Login />
    <Register />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/login.vue";
import Register from "@/components/register.vue";

export default {
  name: 'App',
  components:{
    Login,
    Register
  }
}
</script>
