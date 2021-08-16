<template>
  <div id="top">
    <div id="webName">
      <h1>Hubvert</h1>
      <div class="avatar" v-if="email != null"><router-link to="/profile"><img :src="avatar" alt=""></router-link></div>
    </div>
    <div id="menu">
      <div v-if="email == null">
        <router-link to="/"><div class='nav-item'>Login</div></router-link>
        <router-link to="/sign-up"><div class='nav-item'>Register</div></router-link>
        <router-link to="/about"><div class='nav-item'>About us</div></router-link>
      </div>
      <div v-else>
        <router-link to="/feed"><div class='nav-item'>Feed</div></router-link>
        <router-link to="/diary"><div class='nav-item'>Diary</div></router-link>
        <router-link to="/profile"><div class='nav-item'>Profile</div></router-link>
        <router-link to="/about"><div class='nav-item'>About us</div></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SHA256 from 'crypto-js/sha256';

import {Users} from '../database';
export default {
  name:'Nav',
  data:()=>{
    return {
      email:'',
      avatar:'',
    }
  },
  created:function(){
    this.email = JSON.parse(sessionStorage.getItem("User"));
    if (this.id){
      for(let i=0; i<Users.users.length; i++) {
        console.log(i);
        if (SHA256(Users.users[i].email).toString() === this.id.toString()) {
          this.avatar=require("../assets/"+Users.users[i].avatar);
          console.log(this.avatar);
        }
      }
    }
  },
  updated:function(){
    this.email = JSON.parse(sessionStorage.getItem("User"));
    if (this.id){
      for(let i=0; i<Users.users.length; i++) {
        console.log(i);
        if (SHA256(Users.users[i].email).toString() === this.id.toString()) {
          this.avatar=require("../assets/"+Users.users[i].avatar);
          console.log(this.avatar);
        }
      }
    }
  }
}
</script>


<style scoped>
#top{
  overflow:visible;
  padding: 0;
  background: #28d0d6;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#webName{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#webName h1{
  font-size: 50px;
  padding: 0px 20px;
  display: inline-block;
}

#menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: inherit;
  width:100vw;
}
#menu a {
  font-weight: bold;
  font-family: 'Nunito';
  font-size: 20px;
  color: #2c3e50;
}
.nav-item{
  padding: 10px 10px 10px 10px;
  display: inline-block;
  text-decoration: none;
}
.nav-item:hover{
  background: #55eff5;
  text-decoration: underline;
}
a{
  padding:10px;
}
a.router-link-exact-active{
  background: #55eff5;
}
.sticky{
  position:fixed;
  margin: 0;
  padding: 0;
}
</style>
