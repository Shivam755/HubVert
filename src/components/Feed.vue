<template>
    <Nav/>
    <div>
        <h1><b><font color="orange">MOOD</font></b></h1>
        <span v-for="mood in moods" :class="mood === currentMood? 'marked':''" :key=mood.id @click="selectMood(mood)">{{mood.emoji}}</span>
    </div>

    <h1><b><font color="orange">INTERESTS</font></b></h1>
    <img src="" alt="music profile image" width="100" height="100">
    <img src="" alt="art profile image" width="100" height="100">
    <img src="" alt="dance profile image" width="100" height="100">
    <img src="" alt="sing profile image" width="100" height="100"><br>
    <input type="radio" id="music" name="interest" value="MUSIC">
    <label for="MUSIC">MUSIC</label><input type="radio" id="art" name="interest" value="ART">
    <label for="ART">ART</label><input type="radio" id="dance" name="interest" value="DANCE">
    <label for="DANCE">DANCE</label><input type="radio" id="singing" name="interest" value="SING">
    <label for="SING">SING</label>
    <h1><b><font color="orange">FEED</font></b></h1>
    <input type="text" name="word" v-model="word">&emsp;
    <button type="submit" @click.prevent="Search()">Search</button><br>
    <div>
        <a href="" @click.prevent="quoteSearch()">Quotes</a> | 
        <a href="" @click.prevent="photoSearch()">Images</a> | 
        <a href="" @click.prevent="videoSearch()">Videos</a>
    </div>
    
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
import { moodTypes,DailyMoods,Users } from '../database';
import SHA256 from 'crypto-js/sha256';
import $ from 'jquery';
const key="AIzaSyCGGV6g7Uh_aFD9C-nC9o7S8bj5Kzj6g0M";
var video='';
    // let i;
export default {
    data:()=> {
        return{
            word:'happy',
            moods: moodTypes,
            userId: '',
            currentMood:""
        }
    },
    components:{
        Nav
    },
    methods:{
        Search: function(){

        },
        quoteSearch: function () {
            console.log(this.word);
            if(this.word.trim()!==''){
                fetch("https://quotable.io/quotes?limit=100")
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    }
                )
            }
        },
        videoSearch: function(){
            $.get("https://www.googleapis.com/youtube/v3/search?key="+key+"&type=video&part=snippet&maxResults=10&q="+this.word,function(data){
                console.log(data);
                $("#container").empty();

                data.items.forEach(item => {
                    video = `
                    <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    `
                    $("#container").append(video);
                });
            });
        },
        photoSearch: function(){
            fetch("https://api.pexels.com/v1/search?query="+this.word,{
        headers: {
            Authorization: "563492ad6f917000010000011da5f68fc8c545dc89d3186b2631afc8"
        }
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            var images = data.photos;
            $("#container").empty();
            data.photos.forEach(image =>{
                images = `<img src=${image.src.tiny} />`
                $("#container").append(images)
                })
                console.log(data);
            })
        },
        selectMood:function(mood){
            let date = new Date();
            let today = date.getDate()+"/"+date.getMonth()+"/"+ date.getFullYear();
            DailyMoods.addMood(this.userId,today,mood.id);
            this.currentMood = mood;
            console.log(mood.mood);
        }   
    },
    mounted: function () {
        this.id= JSON.parse(sessionStorage.getItem("User"));
        let date = new Date();
        let today = date.getDate()+"/"+date.getMonth()+"/"+ date.getFullYear();
        if (this.id){
            for(let i=0; i<Users.users.length; i++) {
                if (SHA256(Users.users[i].email).toString() === this.id.toString()) {
                    this.userId=Users.users[i].id;
                    //this.interest=Users.users[i].interest;
                }
            }
            for(let i = 0; i < DailyMoods.dailyMood.length; i++){
                if(DailyMoods.dailyMood[i].userId === this.userId && DailyMoods.dailyMood[i].date === today){
                    for (let j = 0; j < moodTypes.length; j++){
                        if(moodTypes[j].id === DailyMoods.dailyMood[i].moodId){
                            this.currentMood = moodTypes[j];
                        }
                    }
                }
            }
        }
        return;
    }
}

</script>
