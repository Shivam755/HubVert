<template>
  <div id="top">
    <div id="webName">
      <h1 class="label">Hubvert</h1>
      <div class="avatar" v-if="email != null"><router-link to="/profile" style="background:#b9113b;">
      <img :src="avatar" alt="avatar" ></router-link></div>
      </div>
    <div class="navcolor">
    <div v-if="email == null" >
     
        <nav>
        <router-link to="/">Login</router-link>
        
        <router-link to="/sign-up">Register</router-link>
        <router-link to="/about">About us</router-link>
   
        <div class="animation start"></div>

        </nav>
    </div>
    <div v-else>
      
        <nav>
        <router-link to="/feed"><div class='nav-item'>Feed</div></router-link>
        <router-link to="/diary"><div class='nav-item'>Diary</div></router-link>
        <router-link to="/profile"><div class='nav-item'>Profile</div></router-link>
        <router-link to="/about"><div class='nav-item'>About us</div></router-link>
        <div class="animation start"></div>
        </nav>
   
    </div>
    </div>

  </div>
</template>

<script>
// import SHA256 from 'crypto-js/sha256';

// import {Users} from '../database';
export default {
  name:'Nav',
  props:{
    avatar:Object
  },
  data:()=>{
    return {
      email:''
    }
  },
  created:function(){
    this.email = JSON.parse(sessionStorage.getItem("User"));
  }
}
</script>


<style scoped>
.label{
  font-family: 'Oleo Script', cursive;
    font-weight:bolder;
    background:linear-gradient(to right,rgb(74, 232, 253), rgb(60, 78, 243), rgb(159, 5, 230));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
#top{
  overflow:visible;
  padding: 0;
  background: #b9113b;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width:100%;
  color:black;
}

#webName{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#webName h1{
  font-size: 50px;
  padding: 1rem 1rem;
  display: inline-block;
  margin:0rem;
}

.sticky{
  position:fixed;
  margin: 0;
  padding: 0;
}

img{
  padding-top:0.5rem;
  padding-right:0.5rem;
  width:5vw;
  height:auto;
  border-radius: 50%;
  padding:0.5vw;
  margin:0.5vw;
  border: 1px solid black;
}


.navcolor{
  background:#34495e;
  /* background:#ffb97b; */
  display:flex;
  justify-content:center;
  z-index:0;
}


nav {
	position: relative;
	/* width: 590px; */
	height: 50px;
	/* background-color: #34495e; */
	background-color: transparent;
	border-radius: 8px;
	font-size: 0;
}
nav a {
	line-height: 50px;
	height: 100%;
  font-family:"Merriweather",cursive;
	font-size: 15px;
	display: inline-block;
	position: relative;
	z-index: 2;
	text-decoration: none;
	text-transform: uppercase;
	text-align: center;
	color: white;
	cursor: pointer;
}
nav a.router-link-exact-active{
  background:#425e7a;
}
nav .animation {
	position: absolute;
	height: 100%;
	top: 0;
	z-index: 1;
	transition: all .5s ease 0s;
	border-radius: 8px;
}
a:nth-child(1) {
	width: 100px;
}
a:nth-child(2) {
	width: 110px;
}
a:nth-child(3) {
	width: 100px;
}
a:nth-child(4) {
	width: 160px;
}
a:nth-child(5) {
	width: 120px;
}
nav .start-home, a:nth-child(1):hover~.animation {
	width: 100px;
	left: 0;
	background-color: #1abc9c;
}
nav .start-about, a:nth-child(2):hover~.animation {
	width: 110px;
	left: 100px;
	background-color: #e74c3c;
}
nav .start-blog, a:nth-child(3):hover~.animation {
	width: 100px;
	left: 210px;
	background-color: #3498db;
}
nav .start-portefolio, a:nth-child(4):hover~.animation {
	width: 160px;
	left: 310px;
	background-color: #9b59b6;
}
/* nav .start-contact, a:nth-child(5):hover~.animation {
	width: 120px;
	left: 470px;
	background-color: #e67e22;
} */

nav a:nth-child(1).router-link-exact-active{
	background: #1abc9c;
  border-radius: 8px;
}
nav a:nth-child(2).router-link-exact-active{
	background: #e74c3c;
  border-radius: 8px;
}
nav a:nth-child(3).router-link-exact-active{
	background: #3498db;
  border-radius: 8px;
}
nav a:nth-child(4).router-link-exact-active{
	background: #9b59b6;
  border-radius: 8px;
}


</style>
