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
    <button type="submit" @click.prevent="videoSearch()">Search</button>
    <hr>
    <div class="container"></div>
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
import SHA256 from 'crypto-js';
import $ from 'jquery'
    const key="AIzaSyCGGV6g7Uh_aFD9C-nC9o7S8bj5Kzj6g0M";
    // var video='';
    // let i;
export default {
    data:()=> {
        return{
            word:'',
            moods: moodTypes,
            userId: '',
            currentMood:""
        }
    },
    components:{
        Nav
    },
    methods:{
        // searchthis: function () {
        //     console.log(this.word);
        //     if(this.word.trim()!==''){
        //         fetch("https://quotable.io/quotes?limit=100")
        //             .then(response => response.json())
        //             .then(data => {
        //                 console.log(data)
        //             }
        //         )
        //     }
        // },
        videoSearch: function(){
            $.get("https://www.googleapis.com/youtube/v3/search?key="+key+"&type=video&part=snippet&maxResults=10&q="+this.word,function(data){
                console.log(data);
                data.items.forEach(item => {
                    let video = `
                    <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    `
                    $(".container").append(video)
                });
            });
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
