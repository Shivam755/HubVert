<template>
    <Nav/>
    <div>
        <h1><b><font color="orange">MOOD</font></b></h1>
        <span v-for="mood in moods" :class="mood === currentMood? 'marked':''" :key=mood.id @click="selectMood(mood)">{{mood.emoji}}</span>
    </div>

    <h1><b><font color="orange">FEED</font></b></h1>
    <input type="text" name="word" v-model="word">&emsp;
    <select name="Type" id="type" v-model="type">
        <option value="quotes">Quotes</option>
        <option value="images">Images</option>
        <option value="videos">Videos</option>
    </select>
    <button type="submit" @click.prevent="Search()">Search</button><br>
    <!-- <div>
        <a href="" @click.prevent="quoteSearch()">Quotes</a> | 
        <a href="" @click.prevent="photoSearch()">Images</a> | 
        <a href="" @click.prevent="videoSearch()">Videos</a>
    </div> -->
    
    <hr>
    <div id="container" v-html="photoSearch()"></div>
</template>
<style scoped>
    img{
        border-radius: 50%;
    }
    h1{
        text-shadow:2px 2px 5px red;
    }
    span{
        border-radius: 50%;
    }
    span:hover{
        cursor: pointer;
    }
    .marked{
        border: 3px solid #0f0;
    }
</style>

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
