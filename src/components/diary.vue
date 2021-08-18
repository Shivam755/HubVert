<template>
  <div v-if="id === null">
      <Forbidden />
  </div>
   <div class='outer' v-else>
    <Nav :avatar="avatar" />
    <div class="Container">
      <div class="notebook">
   <header><h1>My Personal Journal</h1></header>
    <!-- Journal Entry Section -->
    <section class="page">
        <input
          type="text"
          name="entry-title"
          id="entry-title"
          class="entry-text-title"
          @focus="highlight()"
          @blur="unhighlight()"
          placeholder="Title ✏️"
          v-model="title"
          :disabled="disabled"
        />
        <textarea
          name="daily-entry"
          id="entry"
          class="entry-text-box"
          placeholder="What's on your mind today? 💭"
          v-model="todayEntry"
          :disabled="disabled"
        ></textarea>
        <button class="btn-main entry-submit-btn" type="submit" @click.prevent="submit()" :disabled="disabled" v-if="! disabled">Submit</button>
        
    </section>
    </div>
    <!-- Journal Entry Results -->
    <aside id="index">
      <h3>Entries</h3>
      <ul>
        <li v-for="entry in journalEntries" @click="loadPrevious(entry)" :key="entry.title">{{entry.title}}({{entry.date}})</li>
      </ul>
      <button id="back" type="submit" @click.prevent="loadCurrent()" ><i class='fa fa-arrow-left'>  New Page</i></button>
    </aside>
    </div>
  </div>
</template>

<script>
import router from '../router/index';
import Swal from 'sweetalert2';
import SHA256 from 'crypto-js/sha256';

import {Users, Diaries} from "../database";
import Nav from "./nav.vue";
import Forbidden from './forbidden.vue';

export default {
  data:()=>{
    return {
      id:'',
      journalEntries:'',
      userId: '',
      avatar:'',
      todayEntry: '',
      title: '',
      disabled:false
    }
  },
  methods:{
    submit:function(){
      let date = new Date();
      if (this.title.trim() === ""){
        Swal.fire({
          icon:"warning",
          title:"Oops..",
          text:"PLEASE ENTER A TITLE!!"
        });
        return;
      }
      if(this.todayEntry.trim === ""){
        Swal.fire({
          icon:"warning",
          title:"Oops..",
          text:"No content to add in diary!!!"
        });
        return;
      }
      Diaries.addEntry(this.userId,date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear(),this.title, this.todayEntry);
      Swal.fire({
        icon:"success",
        title:"Great Job!",
        text:"Entry added"
      }).then(()=>{
        router.go();
      });
    },
    loadPrevious:function(entry){
      let date = new Date();
      this.disabled = entry.date === date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()?false:true;
      this.todayEntry = entry.entry;
      this.title = entry.title;
    },
    loadCurrent:function(){
      router.go()
    },
    highlight:function(){
      document.getElementById("entry-title").style = "font-family: 'Space Mono', monospace;font-size: 1rem; color: lightcoral;border: 0.15vw solid lightcoral;";
    },
    unhighlight:function(){
      document.getElementById("entry-title").style = "font-family: 'Space Mono', monospace;font-size: 1rem; color: black;border: none;"
    }
  },
  components:{
      Forbidden,
      Nav
  },
  mounted: function () {
    // let date = new Date();
    this.id= JSON.parse(sessionStorage.getItem("User"));
    if (this.id){
        for(let i=0; i<Users.users.length; i++) {
            if (SHA256(Users.users[i].email).toString() === this.id.toString()) {
              this.journalEntries = Diaries.getEntries(Users.users[i].id);
              this.avatar=require("../assets/"+Users.users[i].avatar);
              this.userId = Users.users[i].id;
            }
        }
    }
    return;
  }
}
</script>

<style scoped>

section{
  display: inline;
}

html {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}

body {
  font-family: 'Space Mono', monospace;
  line-height: 1.6;
  background: rgba(255, 255, 255, 0.3);
  color: lightcoral;
  margin: 0 auto;
  padding: 0;
  max-width: 900px;
}

/* Global Typography */
ul{
  list-style: none;
  height: 30vw;
  overflow-y: scroll;
}
ul::-webkit-scrollbar {
  width: 0;
}
li{
  font-size:1.8vw;
}
li:hover{
  text-decoration: underline;
  cursor: pointer;
}

h1 {
  font-size: 3rem;
}

h3 {
  font-size: 3vw;
}

textarea {
  font-size: 1rem;
}

button {
  display: block;
  font-size: 1.2rem;
  padding: 0.5em 1em;
  border: none;
  font-family: 'Space Mono', monospace;
}

header {
  text-align: center;
  margin-top: 3vw;
}

.Container{
  display: flex;
  width:100vw;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/db7.jpg');
  background-size: contain;
  background-position:center;
}

/* Button Standard */

.btn-main {
  display: block;
  padding: 0.6rem 2rem;
  margin: 0;
  transition: all 0.1s;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  border: 0.15vw solid lightcoral;
  background-color: lightgoldenrodyellow;
  color: lightcoral;
}

.btn-main:hover {
  font-weight: 700;
  color: lightgoldenrodyellow;
  background-color: lightcoral;
  transform: scale(1.08);
}

#index{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
}
.outer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#back{
  border-radius: 0.5vw;
  background-color: #f06faf;
}
#back:hover{
  cursor: pointer;
}
.notebook{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:1vw;
  margin:5vh 0vh;
  border-radius:3vw;
  color:rgb(151, 90, 49);
  background-color:lightgoldenrodyellow;
}
.page{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:1vw;
  border-radius:3vw;
  background-color:lightgoldenrodyellow;
}
.entry-text-title {
  width: 20em;
  margin: 1em auto;
  padding: 1em;
  border-radius: 0.5vw;
  background-color: lightgoldenrodyellow;
  font-family: 'Space Mono', monospace;
}

.entry-text-title::placeholder {
  color: lightcoral;
  font-family: 'Space Mono', monospace;
  text-align:center;
  font-size: 1rem;
}
.entry-text-box {
  width: 100%;
  height: 20em;
  margin: 1em auto;
  padding: 1em;
  border: unset;
  background-color: lightgoldenrodyellow;
  font-family: 'Space Mono', monospace;
}

@media (min-width: 769px) {
  .entry-text-box {
    width: 40em;
    height: 20em;
    margin: 1em auto;
    padding: 1em;
    border: unset;
    background-color: lightgoldenrodyellow;
    font-family: 'Space Mono', monospace;
  }
}

.entry-text-box:focus {
  outline-color: lightcoral;
  font-family: 'Space Mono', monospace;
  color: lightcoral;
  border-radius: 0.5vw;
  font-size: 1rem;
}

.entry-text-box::placeholder {
  color: lightcoral;
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
  text-align:center;
}

</style>