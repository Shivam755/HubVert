<template>
  <router-view/>
  <center>
  <h5 style=" bottom-padding: 3rem;">This website developed by Quality Debuggers<sup>&copy;</sup>
    . All rights reserved. </h5></center>
</template>

<script>
export default{
  name:'App'
}

</script>

<style>
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
