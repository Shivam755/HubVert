<template>
  <Nav/>
    <h1><b><font color="orange">MOOD</font></b></h1>
    <img src="https://th.bing.com/th/id/OIP.bjEc692svnnjSPoWamxjeAHaHa?w=180&h=180&c=7&o=5&dpr=1.25&pid=1.7" alt="team member" width="100" height="100">
    <input type="radio" id="angry" name="mood" value="ANGRY"><label for="SAD">SAD</label>&emsp;
    <img src="https://th.bing.com/th/id/OIP.k4e2qw39PCpvMZdV3C6iVAHaKz?w=126&h=184&c=7&o=5&dpr=1.25&pid=1.7" alt="team member" width="100" height="100">
    <input type="radio" id="happy" name="mood" value="HAPPY"><label for="ANGRY">ANGRY</label>&emsp;
    <img src="https://th.bing.com/th/id/OIP.iADgkyH2pg4yb2Jg5zSNugHaHa?w=204&h=204&c=7&o=5&dpr=1.25&pid=1.7" alt="team member" width="100" height="100"/>
    <input type="radio" id="tired" name="mood" value="TIRED"><label for="HAPPY">HAPPY</label>&emsp;
    <img src="https://th.bing.com/th/id/OIP.bCbUtGyUdw4KFnH18zVz1QHaHa?w=198&h=198&c=7&o=5&dpr=1.25&pid=1.7" alt="team member" width="100" height="100">
    <input type="radio" id="sad" name="mood" value="SAD"><label for="TIRED">TIRED</label>&emsp;
    <!-- <form action=""> -->

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
<style>
    img{
        border-radius: 50%;
    }
    h1{
        text-shadow:2px 2px 5px red;
    }
</style>


// // var word="sad";
//         fetch("https://quotable.io/quotes?limit=100")
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data)
//                 data.results.forEach(result => {
//                     document.writeln(`<b><i>`+result.content+`</i></b>`+" -"+`<b><br>`+result.author+`</b><br>`);
//                 });
//             })
// export default ({
//     data:()=>{
//         return{
//             search:''
//         }
//     },
//     methods
// })

<script>
import Nav from "./nav.vue";
import $ from 'jquery'
    const key="AIzaSyCGGV6g7Uh_aFD9C-nC9o7S8bj5Kzj6g0M";
    // var video='';
    // let i;
export default ({
    data:()=> {
        return{
            word:'',
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
}}})
</script>
