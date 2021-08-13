<template>
    <div id="menu">
    <div id="list">
    <ul>
      <div v-if="email == null">
        <li><router-link to="/">Home</router-link> |</li>
        <li><router-link to="/sign-up">Sign-up</router-link> |</li>
      </div>
      <div v-else>
        <li><router-link to="/profile">Profile</router-link> |</li>
        <li><router-link to="/diary">Diary</router-link> |</li>
        <li><router-link to="/feed">Feed</router-link> |</li>
      </div>
      <li><router-link to="/about">About</router-link> |</li>
      
    </ul>
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
      console.log(this.email);
    }
}
</script>