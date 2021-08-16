<template>
  <router-view/>
   
  <p class="credits">
    <center>
    This website is developed and managed by Quality Debuggers. 
    All rights reserved. 
    <br>
    &copy; 2020-21 Quality Debuggers
    </center>
  </p>
  
</template>

<script>
export default{
  name:'App',
  methods:{
    scrollLoad:function(){
      var menu1 = document.getElementById("menu");
      var sticky = menu1.offsetTop;
      if (window.pageYOffset >= sticky){
        menu1.classList.add("sticky")
      }
      else {
        menu1.classList.remove("sticky");
      }
    }
  },
  created:function(){
    window.onscroll=this.scrollLoad;
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


credits{
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-self:flex-end;
  /* padding: 3rem; */
  
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
