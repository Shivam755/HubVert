<template>
    <div v-if="id === null">
        <Forbidden />
    </div>
    <div class='outer' v-else>
        <Nav :avatar="avatar"/>
        <div class="Container">
            <div class="cur">
                <h2>Current Profile Pic</h2>
                <img :src="avatar" alt="Current Picture" id='profilePic' width="300" height="320"/>
            </div>
            
            <div id='avatar-list'>
                <h2>Select another avatar:</h2>
                <img v-for="ava in listAvatars" :class="selected===ava.id ? 'marked': ''" :key=ava.id :src="ava.pic" :alt="ava.id" width="300" height="320" @click="selectImage(ava.id)" />
            </div>
            <button @click="UpdateImage()">Confirm avatar</button>
        </div>
    </div>
</template>

<script>
import router from '../router/index';
import SHA256 from 'crypto-js/sha256';
import Swal from 'sweetalert2';

import Forbidden from './forbidden.vue';
import Nav from "./nav.vue";
import {avatars, Users} from '../database';
export default {
    name:"ChangePic",
    data:()=>{
        return {
            id: "",
            avatar: "",
            listAvatars : [],
            selected:'',
            userId:''
        }
    },
  components:{
    Nav,
    Forbidden
  },
    methods:{
        selectImage:function(id){
            this.selected = id;
        },
        UpdateImage:function(){
            if (this.selected === ""){
                Swal.fire({
                    icon:"warning",
                    title:"Oops...",
                    text:"No Pic selected!!"
                })
                return;
            }
            if(Users.UpdateAvatar(this.userId, this.selected)){
                Swal.fire({
                    icon:"success",
                    title:"Great Job!",
                    text:"Avatar successfully changed!!"
                }).then(()=>{
                    router.push('/profile');
                })
            }else{
                Swal.fire({
                    icon:"error",
                    title:"Oops...",
                    text:"Couldn't find your account!!"
                })
                return;
            }
        }


    },
    mounted: function () {
        this.id= JSON.parse(sessionStorage.getItem("User"));
        let gender ;
        if (this.id){
            for(let i=0; i<Users.users.length; i++) {
                if (SHA256(Users.users[i].email).toString() === this.id.toString()) {
                    this.avatar=require("../assets/"+Users.users[i].avatar);
                    this.userId = Users.users[i].id;
                    gender = Users.users[i].gender;
                    for (let j = 0; j < avatars[gender].length; j++){
                        this.listAvatars.push({id:avatars[gender][j],pic:require("../assets/"+avatars[gender][j])});
                    }
                }
            }
        }

        // return;
    }
}
</script>

<style scoped>
.outer{
    display: flex;
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
    background-image:url("../assets/changeAvatar4.jpg");
    background-position: center;
}
.Container{
    margin-top:5vw;
    margin-bottom:2vw;
    margin-right:3vw;
    display: flex;
    width:75vw;
    padding:3vw;
    align-self: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    border-radius: 1vw;
    background: linear-gradient(
        114deg,
        rgba(255, 255, 255, 0.48) 1.41%,
        rgba(255, 255, 255, 0.34) 99.96%
    );
    backdrop-filter: blur(8px);
    border: 1px solid rgba(80, 80, 80, 0.445);
    background-repeat: no-repeat;
}
.Container h2{
    color:rgb(6, 2, 56);
    font-size:3vw;
}
.Container button{
    border-radius:0.3vw;
    outline:none;
    border:none;
    padding:0.8vw;
    font-size:1.5vw;
    /* background-color:#ef904b; */
    background-color: #ea5f52;
}
.Container button:hover{
    transform:translate(0,-0.4vw);
    cursor: pointer;
}
.Container button :active{

}
#profilePic{
    width: 20vw;
    height: 20vw;
    background-color: white ;
    border:0.3vw solid black;
}
#avatar-list{
    padding: 10px 10px;
}
img{
    padding:0.8vw;
    width:12vw;
    height: 12vw;
    border-radius: 50%;
}
.marked{
    border: 3px solid rgb(25, 198, 241);
}
</style>