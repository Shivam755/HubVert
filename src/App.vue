<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/sign-up">Sign-up</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/diary">Diary</router-link> |

  <Nav/>
  <router-view/>
  <center>
  <H5 style=" bottom-padding: 3rem;">This website developed by Quality Debuggers<SUP>&copy;</SUP>
    . All rights reserved. </H5></center>
</template>

<script>
import Nav from "./components/nav.vue";
export default{
  name:'App',
  components:{
    Nav
  }
}

</script>

<style scoped>
/* #app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;
} */

#menu {
  padding: 10px;
  background: #28d0d6;
  /* float:left;
  align-content: left; */
}

ul{
  list-style-type: none;
}

.list{
  list-style-type: none;
} 
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
