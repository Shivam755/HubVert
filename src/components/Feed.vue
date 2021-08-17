<template>
    <Nav :avatar="avatar"/>

    <!-- starting the feed base t=11:14am(16-8-21) -->
    <!-- <div class="mainbox"> -->
        <div class="feedbox">
            <div class="emojibox">
                <span v-for="mood in moods" :class="mood === currentMood? 'marked':''" :key=mood.id 
                @click="selectMood(mood)">{{mood.emoji}}</span>
            
            </div>
                
            <div class="searchcont">
                    
                <div class="srchbarcat">
                    

                    <!-- <h1><b><font color="orange">FEED</font></b></h1> -->
                    <input type="text" name="word" v-model="word" class="search_in">&emsp;

                    <div class="categorybox">
                    
                    

                    <input label="Quote" type="radio" id="Quote" name="keyword" value="Quote">
                        <!-- <label for="Quote" ><i class="fa fa-quote-left"></i>Quotes</label> -->
                    
                    <input label="Pictures" type="radio" id="Images" name="keyword" value="Image" checked>
                    <!-- <i class="fa fa-image"></i>	             -->
                    <input label="Videos" type="radio" id="Video" name="keyword" value="Video">
                    <!-- <i class="fa fa-video"></i> -->

                    <br><br>

                    <select name="Type" id="type" v-model="type" @change="Search()">
                    <option value="quotes">Quotes</option>
                    <option value="images">Images</option>
                    <option value="videos">Videos</option>
                    </select>
                    </div>
                </div>            
            
                <button class="srchbutton" type="submit" @click.prevent="Search()">
                    <i class="fa fa-search" style="font-size:4vw"></i>
                    <br>Search</button>
            </div>
            <br>
                <!-- <div>
                    <a href="" @click.prevent="quoteSearch()">Quotes</a> | 
                    <a href="" @click.prevent="photoSearch()">Images</a> | 
                    <a href="" @click.prevent="videoSearch()">Videos</a>
                </div> -->
                <!-- <hr> -->
            <div id="container" ></div>

        </div>
        

        <!-- <div>
        <h1><b><font color="orange">MOOD</font></b></h1>
        <span v-for="mood in moods" :class="mood === currentMood? 'marked':''" :key=mood.id 
        @click="selectMood(mood)">{{mood.emoji}}</span>
        </div>-->

    <!-- </div>  -->

    

    
    
    
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
    // let i;
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
                $("#container").empty();
                if(this.word.trim()!==''){
                    fetch("https://quotable.io/quotes?limit=100")
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            // console.log(data);
                            $("#container").empty();

                            data.results.forEach(item => {
                                let quote = `
                                <div>
                                <p>${item.content}</p>
                                <sub>${item.author}</sub>
                                </dv>
                                `
                                $("#container").append(quote);
                            });
                        }
                    )
                }
            }
            catch{
                let error = `<h1>Oops... there's some problem with the api.Please Try again.</h1>`
                $("#container").append(error);

            }
        },
        videoSearch: function(){
            try{
            $.get("https://www.googleapis.com/youtube/v3/search?key="+YTkey+"&type=video&part=snippet&maxResults=50&q="+this.word,function(data){
                console.log(data);
                $("#container").empty();

                data.items.forEach(item => {
                    video = `
                    <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    `
                    $("#container").append(video);
                });
            });}
            catch{
                let error = `<h1>Oops... there's some problem with the api.Please Try again.</h1>`
                $("#container").append(error);

            }
        },
        photoSearch: function(){
            const getPhotos = function(type,word="",category=""){
                if (type !== 'images'){
                    return;
                }
                // console.log(word, category);
                $.get("https://pixabay.com/api/?key="+PXkey+"&q="+word+"&image_type=photo&category="+category+"&per_page=200",function(data){
                    console.log(data);
                    $("#container").empty();
                    if(data.total != 0){
                        data.hits.forEach(hit => {
                        photo = `
                        <img width="420" height="315" src=${hit.webformatURL} frameborder="1" ></img>
                        `
                        $("#container").append(photo)
                        });
                    }else{
                        let notFound = `<h1>We searched high and low but we couldn't find any thing related to your search</h1>`
                        $("#container").append(notFound);
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
                    getPhotos(this.type,this.currentMood.search,this.userInterest[key].topic);
                }
            }catch{
                let error = `<h1>Oops... there's some problem with the api.Please Try again.</h1>`
                $("#container").append(error);

            }
        },
        selectMood:function(mood){
            let date = new Date();
            let today = date.getDate()+"/"+date.getMonth()+"/"+ date.getFullYear();
            DailyMoods.addMood(this.userId,today,mood.id);
            this.currentMood = mood;
            console.log(mood.mood);
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
    }
}

</script>



<style scoped>


img{
    border-radius: 10rem;
}
/* h1{
    text-shadow:2px 2px 5px red;
} */






    /* body{margin:0; */
    /* background:linear-gradient(90deg, rgb(55, 59, 68), rgb(66, 134, 244)); */
    /* background:linear-gradient(to left, rgb(41, 128, 185), rgb(109, 213, 250), rgb(255, 255, 255)); */
    /* background: linear-gradient(to left, rgb(255, 239, 186), rgb(255, 255, 255)); */
    /* background:linear-gradient(to right , rgb(163, 134, 231), rgb(233, 228, 240)); */
    /* background:linear-gradient(-45deg , rgb(163, 134, 231), rgb(233, 228, 240)); */
    /* background:linear-gradient(-45deg, rgb(255, 175, 189), rgb(255, 195, 160));          nice*/
    /* background:linear-gradient(-45deg, rgb(224, 234, 252), rgb(207, 222, 243));          nice */
    /* background:linear-gradient(-45deg,  rgb(255, 78, 80), rgb(249, 212, 35));        nice */
    /* background:linear-gradient(-45deg,  rgb(252, 74, 26), rgb(247, 183, 51)); */
    /* background:linear-gradient(-45deg,  rgb(242, 153, 74), rgb(242, 201, 76)); */
    /* background:linear-gradient(-45deg,  rgb(242, 112, 156), rgb(255, 148, 114)); */
    /* background:linear-gradient(109.8deg, rgb(250, 111, 152) 5.6%, rgb(255, 189, 55) 91.5%); */
    /* background:linear-gradient(179.5deg, rgb(255, 230, 69) 3.3%, rgb(255, 157, 73) 96%); }*/





.heading1{
  /* background: #f1efb9; */
  font-family: 'Lobster', cursive;
  display: flex;
  flex-direction:row;
  /* align-items:center; */
  justify-content:space-between;
  /* text-shadow:#ffffff; */
  font-size: 4vw;
  margin:0;
  padding-top:2rem;
  background : #80c9fa;
  
}

#profilePic
  {
    border-radius: 50%;
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
    border: 1px solid #575756;
    transition: all 250ms ease-in-out;
    backface-visibility: hidden;
    transform-style: preserve-3d;
}

.search_in:hover, .search_in:focus{
    padding: 0.5rem 0.8rem;
    outline: 0;
    background-color: #98d6e2;
    border: 1px solid red;
    border: 0.1vw solid #05c0e6;
    border-bottom: 0.3vw solid #575756;
    border-radius: 1rem;
    background-position: 100% center;
}

.srchbutton{
    /* display:flex; */
    /* flex-direction:column; */
    width:7vw;
    height:7vw;
}



.categorybox{
    
    display:flex;
    flex-direction:row;
    justify-content: space-around;
    /* background: #454857; */
    background: inherit;
	padding: 4px;
	border-radius: 10px solid black;
	box-shadow: inset 0 0 0 3px rgba(35, 33, 45, 0.3),
		0 0 0 3px rgba(185, 185, 185, 0.3);
	position: relative;
}

/* .categorybox input : label{
    content:'\f2b9' ;} */

.categorybox input {
	width: auto;
	height: 100%;
	appearance: none;
	outline: none;
	cursor: pointer;
	border-radius: 2px;
	padding: 4px 8px;
	background: #454857;
    /* background: inherit; */
	/* color: #585858bd; */
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

#container{
    background:transparent;
}

</style>