<template>
    <div v-if="id === null">
        <Forbidden />
    </div>
    <div v-else>
    <Nav/>
    <h2>Current Profile Pic: </h2>
    <img :src="avatar" alt="Current Picture" id='profilePic' width="300" height="320"/>
    <div id='avatar-list'>
        <h2>Select another avatar:</h2>
        <img v-for="ava in listAvatars" :class="selected===ava.id ? 'marked': ''" :key=ava.id :src="ava.pic" :alt="ava.id" id="profilePic" width="300" height="320" @click="selectImage(ava.id)" />
    </div>
    <button @click="UpdateImage()">Confirm avatar</button>
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
#avatar-list{
    padding: 10px 10px;
}
img{
    padding: 10px;
}

.marked{
    border: 3px solid rgb(25, 198, 241);
}
</style>