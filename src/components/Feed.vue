<template>
    <Nav :avatar="avatar"/>

    <div class="feedbox">
        <div class="emojibox">
            <span v-for="mood in moods" :class="mood === currentMood? 'marked':''" :key=mood.id 
            @click="selectMood(mood)">{{mood.emoji}}</span>
        </div>
            
        <div class="searchcont">
            <div class="srchbarcat">
                <input type="text" name="word" v-model="word" class="search_in" placeholder="Search text">&emsp;
                <div class="categorybox">
                    <div>
                        <input label="Quote" type="radio" id="Quote" name="keyword" value="quotes" v-model="type" @change="Search()" >
                        <input label="Pictures" type="radio" id="Images" name="keyword" value="images" v-model="type" @change="Search()" checked>
                        <input label="Videos" type="radio" id="Video" name="keyword" value="videos" v-model="type" @change="Search()">
                    </div>
                </div>
            </div>            
        
            <button class="srchbutton" type="submit" @click.prevent="Search()">
                <i class="fa fa-search" ></i>
            </button>
        </div>
        <br>
        <div class="container1" ></div>

    </div>
</template>


<script>
import Nav from "./nav.vue";
import { moodTypes,DailyMoods,Users,interests } from '../database';

import Swal from 'sweetalert2';
import SHA256 from 'crypto-js/sha256';
import $ from 'jquery';
const YTkey="AIzaSyCGGV6g7Uh_aFD9C-nC9o7S8bj5Kzj6g0M";
const PXkey="22933344-7a49660678780afe61e61b1d4";
var video='';
var photo='';
export default {
    data:()=> {
        return{
            word:'',
            type:'images',
            avatar:'',
            moods: moodTypes,
            userId: '',
            currentMood:"",
            userInterest:[]
        }
    },
    components:{
        Nav
    },
    methods:{
        Search: function(){
            console.log(this.type)
            if (this.type === 'quotes'){
                this.quoteSearch();
            }else if (this.type === 'images'){
                this.photoSearch();
            }else {
                this.videoSearch();
            }
        },
        quoteSearch: function () {
            // console.log(this.word);
            try{
                $(".container1").empty();
                
                fetch("https://quotable.io/quotes?limit=100")
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        $(".container1").empty();

                        data.results.forEach(item => {
                            let quote = `
                            <div class="quotestyle">
                            <p style="background:blue;font-size: 12pt ;font-family:'Fredoka One',cursive;">${item.content}</p>
                            <small>${item.author}</small>
                            </div>
                            `
                            $(".container1").append(quote);
                        });
                    }
                )
                
            }
            catch{
                let error = `<h1>Oops... there's some problem with the api.Please Try again.</h1>`
                $(".container1").append(error);

            }
        },
        videoSearch: function(){
            try{
            $.get("https://www.googleapis.com/youtube/v3/search?key="+YTkey+"&type=video&part=snippet&maxResults=50&q="+this.word,function(data){
                console.log(data);
                $(".container1").empty();

                data.items.forEach(item => {
                    video = `
                    <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    `
                    $(".container1").append(video);
                });
            });}
            catch{
                let error = `<h1>Oops... there's some problem with the api.Please Try again.</h1>`
                $(".container1").append(error);

            }
        },
        photoSearch: function(){
            const getPhotos = function(type,word="",category=""){
                if (type !== 'images'){
                    return;
                }
                // console.log(word, category);
                $.get("https://pixabay.com/api/?key="+PXkey+"&q="+word+"+"+category+"&image_type=photo&per_page=200",function(data){
                    console.log(word, category, data);
                    $(".container1").empty();
                    if(data.total != 0){
                        data.hits.forEach(hit => {
                        photo = `
                        <img width="420" height="315" src=${hit.webformatURL} frameborder="1" ></img>
                        `
                        $(".container1").append(photo)
                        });
                    }else{
                        let notFound = `<h1>We searched high and low but we couldn't find any thing related to your search</h1>`
                        $(".container1").append(notFound);
                    }
                    
                });
            }
            try{
                if(this.word.trim()!==''){
                    getPhotos(this.type,this.word)
                }
                else{
                    let ind = Math.floor((Math.random() * 100));
                    let key = ind % this.userInterest.length;
                    console.log(this.currentMood.search,this.userInterest[key].topic);
                    getPhotos(this.type,this.currentMood.search,this.userInterest[key].topic);
                }
            }catch(err){
                let error = `<h1>Oops... there's some problem with the api.Please Try again.</h1>`
                console.log(err);
                $(".container1").append(error);

            }
        },
        selectMood:function(mood){
            let date = new Date();
            let today = date.getDate()+"/"+date.getMonth()+"/"+ date.getFullYear();
            DailyMoods.addMood(this.userId,today,mood.id);
            this.currentMood = mood;
            console.log(mood.mood);
            this.Search();
        },
        askInterest:function(){
            let interestHtml = `<form name="InterestForm">`;
            for (let i = 0; i < interests.length; i++){
                interestHtml += `<input type="checkbox" name="interest" id=${interests[i].topic} /> <label for=${interests[i].topic}>${interests[i].topic}</label> `
            }
            interestHtml += `</form>`
            Swal.fire({
                icon: 'info',
                title: 'Please select some of the interests',
                html: interestHtml,
                confirmButtonText: 'Done'
            }).then(()=>{
                for(let i=0; i<document.InterestForm.length;i++){
                    if (document.InterestForm.elements[i].type == 'checkbox' && document.InterestForm.elements[i].checked){
                        for(let j=0; j<interests.length; j++){
                            
                            if(interests[j].topic === document.InterestForm.elements[i].id){
                                this.userInterest.push(interests[j]);
                                break;
                            }
                        }
                    }
                }
                if(Users.UpdateInterest(this.userId, this.userInterest)){
                    Swal.fire({
                        icon:"success",
                        title:"Interests added successfully!!"
                    });
                }else{
                    Swal.fire({
                        icon:"error",
                        title:"Couldn't find your account!!"
                    })
                }
            })
        }
    },
    beforeMount: function () {
        this.id= JSON.parse(sessionStorage.getItem("User"));
        let date = new Date();
        let today = date.getDate()+"/"+date.getMonth()+"/"+ date.getFullYear();
        if (this.id){
            for(let i=0; i<Users.users.length; i++) {

                if (SHA256(Users.users[i].email).toString() === this.id.toString()) {
                    this.userId=Users.users[i].id;
                    this.avatar=require("../assets/"+Users.users[i].avatar);
                    this.userInterest=Users.users[i].interest;
                    // console.log(Users.users[i].interest);
                }
            }
            // console.log(this.userInterest);
            for(let i = 0; i < DailyMoods.dailyMood.length; i++){
                if(DailyMoods.dailyMood[i].userId === this.userId && DailyMoods.dailyMood[i].date === today){
                    for (let j = 0; j < moodTypes.length; j++){
                        if(moodTypes[j].id === DailyMoods.dailyMood[i].moodId){
                            this.currentMood = moodTypes[j];
                        }
                    }
                }
            }
            if(this.userInterest.length===0){
                this.askInterest();
            }
        }
        return;
    },
    mounted:function(){
        this.Search();
    }
}

</script>



<style scoped>


img{
    border-radius: 10rem;
}

.heading1{
  font-family: 'Lobster', cursive;
  display: flex;
  flex-direction:row;
  justify-content:space-between;
  font-size: 4vw;
  margin:0;
  padding-top:2rem;
  background : #80c9fa;
  
}

.feedbox{
    display:flex;
    flex-direction: column;
}

.emojibox{
    display:flex;
    flex-direction: row;
    background: #a7ff83;
    /* width: 10%; */
    font-size:4vw;   
}

span{
    border-radius: 50%;
}
span:hover{
    cursor: pointer;
    font-size:5vw;
}
span.marked{
    /* border: 3px solid #0f0; */
    font-size:5vw;
}

/* to keep search and category */
.searchcont{
    display:flex;
    flex-direction:row;
    background: #46c3db;
    justify-content: space-around;
    align-items: center;
    padding-top:0.8rem;
    padding-bottom:0.8rem;
}

.srchbarcat{
    display:flex;
    flex-direction:column;
    width: 70%;
    justify-content:space-between;
    /* padding-right:3rem; */
}

/* searchbox itself */
.search_in{
    /* width: 100%; */
    width:80vw;
    padding: 0.5rem 0.8rem ;

    /* background-color: transparent; */
    background-color: #98d6e2;
    transition: transform 250ms ease-in-out;
    font-size: 1.5rem;
    line-height: 18px;
        
    color: #575756;
    /* background-color: transparent; */

    background-repeat: no-repeat;
    background-size: 18px 18px;
    background-position: 95% center;
    border-radius: 50px;
    /* border: 1px solid #575756; */
    transition: all 250ms ease-in-out;
    backface-visibility: hidden;
    transform-style: preserve-3d;
}

.search_in:hover, .search_in:focus{
    padding: 0.5rem 0.8rem;
    outline: 0;
    background-color: #98d6e2;
    border: 0.1vw solid #05c0e6;
    /* border-bottom: 0.3vw solid #575756; */
    border-radius: 1rem;
    background-position: 100% center;
}

.srchbutton{
    border-radius:5vw;
    width:3vw;
    height:3vw;
    font-size:1.8vw;
    align-self:flex-start;
    border:none;
}
.srchbutton:hover{
    cursor:pointer;
}


.categorybox{
    display:flex;
    flex-direction:row;
    justify-content: center;
    background: inherit;
    width:80vw;
	padding: 4px;
}

.categorybox input {
	width: auto;
	height: 100%;
    padding:0.5vw 0.8vw;
    margin:0vw 1vw;
	appearance: none;
	outline: none;
	cursor: pointer;
	border-radius: 2px;
	background: #454857;
    color:black;
	font-size: 14px;
	font-family: 'Fredoka One',cursive;
	transition: all 100ms linear;
}

.categorybox input:checked {
	background-image: linear-gradient(180deg, #95d891, #74bbad);
	color: #fff;
	box-shadow: 0 1px 1px #0000002e;
	text-shadow: 0 1px 0px #79485f7a;
}

.categorybox input:before {
	content: attr(label);
	display: inline-block;
	text-align: center;
	width: 100%;
}

.container1{
    background:orange;
}


.quotestyle{
    color: pink;
    background-color:blue;
    margin: 0 auto;
    padding: 1em;
    border-left: 5px solid #999;
}

.quotestyle:before {
    display: none;
}

.quotestyle :not(:first-of-type) {
  margin-top: 0.5rem;
}

p{
  color: #555;
  font-size: 12pt;
  line-height: 1.4;
  font-family: 'Times New Roman';
}
small{
  margin-top: .5em;
  padding: 0;
  color: #777;
  font-size: 12pt;
  text-align: left;
  font-style: italic;
}
small:before{
  content: '— ';
}
.quotestyle:nth-of-type(even){
  text-align: right;
  border-left: none;
  border-right: 5px solid #999;
}
.quotestyle:nth-of-type(even) small {
  text-align: right;
}
.quotestyle:nth-of-type(even) small:before {
  content: '';
}
.quotestyle:nth-of-type(even) small:after {
  content: ' —';
}
/* @media 'quotestyle' and (min-width: 300px) {
  blockquote {
    padding: 1em 20% 1em 1em;
  }
  blockquote p {
    font-size: 14pt;
  }
  blockquote:nth-of-type(even) {
    padding: 1em 1em 1em 20%;
  }} */




















</style>