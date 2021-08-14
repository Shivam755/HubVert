<template>
    <div id="menu">
    <div class="list1">
    <!-- <ul> -->
      <div v-if="email == null">
        <router-link to="/">Home</router-link> |
        <router-link to="/sign-up">Register</router-link> |
        <router-link to="/about">About us</router-link>
      </div>
      <div v-else>
        <router-link to="/profile">Profile</router-link> |
        <router-link to="/diary">Diary</router-link> |
        <router-link to="/feed">Feed</router-link> |
        <router-link to="/about">About us</router-link>
      </div>
        <!-- <router-link to="/about">About us</router-link>  -->
      

      <!-- <div v-if="email == null">
        <li><router-link to="/">Home</router-link> |</li>
        <li><router-link to="/sign-up">Sign-up</router-link> |</li>
      </div>
      <div v-else>
        <li><router-link to="/profile">Profile</router-link> |</li>
        <li><router-link to="/diary">Diary</router-link> |</li>
        <li><router-link to="/feed">Feed</router-link> |</li>
      </div>
      <li><router-link to="/about">About</router-link> |</li> -->
    <!-- </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  name:'Nav',
  data:()=>{
    return {
      email:''
    }
  },
  created:function(){
    this.email = JSON.parse(sessionStorage.getItem("User"));
    // console.log(this.email);
    // window.onscroll=this.scrollLoad;
  }
  // window.onscroll = function() {myfunction()};


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
  overflow:visible;
  padding: 10px;
  background: #28d0d6;
  display: flex;
  justify-content: center;

  /* float:left;
  align-content: left; */
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

ul{
  list-style-type: none;
  /* float: left; */
  display: inline-block;
  color:black;
  text-align: center;
  padding:0;
  
}
.content {
  padding: 16px
}
.list1{

  /* display: inline-block; */
  /* list-style-type: none; */
} 
.sticky{
  position:fixed;
  top: 0;
  width: 100%
  }
.sticky + .content{
  padding-top:60px;
}




</style>
