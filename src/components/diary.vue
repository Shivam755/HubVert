<template>
  <div v-if="id === null">
      <Forbidden />
  </div>
   <div v-else>
     <Nav />
   <header><h1 class="title">My Personal Journal</h1></header>
    <!-- Journal Entry Section -->
    <section class="section journal-section container container-row container-row-journal container-item container-item-journal">
      <form id="entryForm" action="">
        <label for="entry-title" class="journal-label">Entry Title</label>
        <input
          type="text"
          name="entry-title"
          id="entry-title"
          class="entry-text-title"
          placeholder="Name of entry ✏️"
          v-model="title"
          :disabled="disabled"
        />
        <label for="entry" class="journal-label">Today's Entry</label>
        <textarea
          name="daily-entry"
          id="entry"
          class="entry-text-box"
          placeholder="What's on your mind today? 💭"
          v-model="todayEntry"
          :disabled="disabled"
        ></textarea>
        <router-link to='/diary' v-if="disabled"><button class="btn-main entry-submit-btn" type="submit" >Current entry</button></router-link>
        <button class="btn-main entry-submit-btn" type="submit" @click.prevent="submit()" :disabled="disabled" v-else>Submit</button>
        
      </form>
    </section>

    <!-- Journal Entry Results -->
    <section class="section sectionEntryResults container container-row entryResultRow" id="entryResultsSection">
      <ul>
        <li v-for="entry in journalEntries" @click="loadPrevious(entry)" :key="entry.title">{{entry.title}}({{entry.date}})</li>
      </ul>
    </section>
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
              this.userId = Users.users[i].id;
            }
        }
    }
    // let today = date.getDate() +"/" +date.getMonth()+"/"+date.getFullYear();
    // for (let i = 0; i < this.journalEntries.length; i++){
    //   if(this.journalEntries[i].date === today){
    //     this.title = this.journalEntries[i].title;
    //     this.todayEntry = this.journalEntries[i].entry;
    //   }
    // }
    return;
  }
}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

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

li:hover{
  text-decoration: underline;
  cursor: pointer;
}

h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

p {
  font-size: 1rem;
}

form,
textarea {
  font-size: 1rem;
}

button {
  display: block;
  font-size: 1.2rem;
  padding: 0.5em 1em;
  border: none;
  background-color: aquamarine;
  color: #0a2472;
  font-family: 'Space Mono', monospace;
}

/* Section Container Positions, Spacing, Utilities */

header {
  text-align: center;
  margin: 1em auto;
}

.section {
  padding: 1em 1em;
  width: 100%;
  margin: 1em auto;
}

.container {
  width: 100%;
  margin: 0 auto;
  padding: 1em 1em;
}

.container-row {
  width: 90%;
  margin: 0 auto;
}

/* Button Standard */

.btn-main,
.btn-light,
.btn-dark {
  display: block;
  padding: 0.6rem 2rem;
  margin: 1rem;
  transition: all 0.1s;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}

.btn-main {
  color: lightgoldenrodyellow;
  background-color: lightcoral;
}

.btn-light {
  color: #0a2472;
  background-color: white;
}

.btn-dark {
  color: white;
  background-color: #0a2472;
}

button[class^='btn-']:hover,
a[class^='btn-']:hover,
input[class^='btn-']:hover {
  background-color: lightgoldenrodyellow;
  color: lightcoral;
  font-weight: 700;
  transform: scale(1.08);
}

/* Project Starts Here */

/* Journal Entry Section */

/* Title */

.entry-text-title {
  width: 20em;
  margin: 1em auto;
  padding: 1em;
  border-radius: 2px;
  border: unset;
  background-color: lightgoldenrodyellow;
  font-family: 'Space Mono', monospace;
}

.entry-text-title:focus {
  outline-color: lightcoral;
  font-family: 'Space Mono', monospace;
  color: lightcoral;
  font-size: 1rem;
}

.entry-text-title::placeholder {
  color: lightcoral;
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
}

.entry-text-title::-ms-value {
  color: lightcoral;
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
}

/* Text Box */

.container-row-journal {
  display: flex;
  justify-content: center;
}

.entry-form {
  max-width: 100%;
  margin: 0 auto;
}

.journal-label {
  display: block;
  line-height: 1.6;
  font-size: 1.2rem;
  font-weight: 700;
}

.entry-text-box {
  width: 100%;
  height: 20em;
  margin: 1em auto;
  padding: 1em;
  border-radius: 2px;
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
    border-radius: 2px;
    border: unset;
    background-color: lightgoldenrodyellow;
    font-family: 'Space Mono', monospace;
  }
}

.entry-text-box:focus {
  outline-color: lightcoral;
  font-family: 'Space Mono', monospace;
  color: lightcoral;
  font-size: 1rem;
}

.entry-text-box::placeholder {
  color: lightcoral;
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
}

.entry-submit-btn {
  margin: 0;
}

/* Journal Results Section */

.sectionEntryResults {
  width: 100%;
  margin: 0 auto;
}

.entryResultRow {
  /* display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  margin: 1em auto; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.single-entry-div {
  max-width: 100%;

  margin: 1em auto;
  padding: 1em 1em;
}

.single-entry-date {
  background-color: lightgoldenrodyellow;
  width: 100%;
}

.heading-results {
  text-align: center;
  text-decoration: underline;
  text-decoration-color: lightgoldenrodyellow;
}


</style>