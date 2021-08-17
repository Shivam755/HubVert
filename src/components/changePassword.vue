<template>
    <div v-if="id === null">
        <Forbidden />
    </div>
    <div v-else class="outer">
        <Nav :avatar="avatar"/>
        <div class="Container">
            <h1>Change Password</h1>
            <label for="old"></label>
            <input type="password" name="old" id="old" placeholder="Current Password" v-model="old">

            <label for="new"></label>
            <input type="password" name="new" id="new" placeholder="New Password" v-model="newPass">

            <label for="repeat"></label>
            <input type="password" name="repeat" id="repeat" placeholder="Repeat New Password" v-model="repeat">
            
            <input @click="changePassword()" type="button" value="Confirm">
        </div>
    </div>
</template>

<script>
import SHA256 from 'crypto-js/sha256';
import router from '../router/index';
import Swal from 'sweetalert2';

import Nav from "./nav.vue";
import { Users } from '../database';
export default {
    name:'ChangePassword',
    data:()=>{
        return {
            old: '',
            newPass: '',
            repeat: '',
            pass: '',
            email: '',
            avatar: ''
        }
    },
  components:{
    Nav
  },
    mounted:function(){
        this.email = JSON.parse(sessionStorage.getItem("User"));
        this.pass = JSON.parse(sessionStorage.getItem("Password"));
        if (this.email){
            for(let i=0; i<Users.users.length; i++) {
                if (SHA256(Users.users[i].email).toString() === this.email.toString()) {
                    this.avatar=require("../assets/"+Users.users[i].avatar);
                }
            }
        }
        return;
    }
    ,
    methods:{
        changePassword:function(){
            if (!this.old){
                Swal.fire({
                    icon:"warning",
                    title:"Oops...",
                    text:"Please enter a current password"
                });
                return;
            }else if (!this.newPass){
                Swal.fire({
                    icon:"warning",
                    title:"Oops...",
                    text:"Please enter a new password"
                });
                return;
            }else if(!this.repeat){
                Swal.fire({
                    icon:"warning",
                    title:"Oops...",
                    text:"Please enter repeat new password"
                });
                return;
            }
            if (SHA256(this.old).toString() === this.pass.toString()){
                if (this.newPass === this.repeat){
                    for(let i=0; i<Users.users.length; i++) {
                        if (SHA256(Users.users[i].email).toString() === this.email.toString()) {
                            if (Users.UpdatePassword(Users.users[i].id,SHA256(this.newPass).toString())){
                                Swal.fire({
                                    icon:"success",
                                    title:"Great Job",
                                    text:"Password changed successfully!"
                                }).then(()=>{
                                    sessionStorage.setItem('Password',JSON.stringify(SHA256(this.newPass).toString()));
                                    router.push('/profile')
                                });
                                
                            }else{
                                Swal.fire({
                                    icon:"error",
                                    title:"Oops...",
                                    text:"Couldn't find your account!!"
                                });
                                return;
                            }
            
                        }
                    }
                }else{
                    Swal.fire({
                        icon:"error",
                        title:"Oops...",
                        text:"New and repeat password does not match."
                    });
                }
            }else{
                Swal.fire({
                    icon:"error",
                    title:"Oops...",
                    text:"Current password is wrong"
                });
                return;
            }
            
        }
    }
}
</script>

<style scoped>
.outer{
    display: flex;
    flex-direction: column;
    background-image: url("../assets/pass3.png");
    background-repeat: no-repeat;
    background-size: cover;
    /* align-items: flex-end; */
}
.Container{
    margin-top:2vw;
    margin-bottom:1vw;
    margin-right:3vw;
    display: flex;
    width:30vw;
    padding:2vw 3vw;
    align-self: flex-end;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    border-radius: 1vw;
    /* box-shadow: 1px 1px 10px rgb(253, 145, 95); */
    background: linear-gradient(
        114deg,
        rgba(255, 255, 255, 0.48) 1.41%,
        rgba(255, 255, 255, 0.34) 99.96%
    );
    backdrop-filter: blur(8px);
    border: 1px solid rgba(80, 80, 80, 0.445);
    background-repeat: no-repeat;
}
.Container h1{
    color:rgb(6, 2, 56);
    font-size:3vw;
}
.Container input{
    color:rgb(6, 2, 56);
    /* color:rgb(5, 5, 5); */
}
.Container input[type="password"]{
    margin: 0.5vw 0vw;
    color:rgb(5, 5, 5);
    font-size: 1.3vw;
    background:transparent;
    padding:0.5vw 0.8vw;
    border-radius:0.3vw;
    border:0.2vw solid rgba(5, 5, 5, 0.671);
}
.Container input[type="password"]:hover{
    transform: translate(0,-3px);
    cursor:pointer;
    transition:0.5s;
    background:linear-gradient(to right, rgb(65, 227, 255), rgb(43, 255, 220));
}
.Container input[type="password"]:focus{
    /* border:none; */
    cursor:pointer;
    color:rgb(5, 5, 5);
    transition:0.5s;
    background:linear-gradient(to right, rgb(162, 241, 255), rgb(141, 255, 236));
}
.Container input[type="password"]::placeholder{
    color:rgba(5, 5, 5, 0.671);
}
.Container input[type="password"]:hover::placeholder{
    color:rgb(5, 5, 5);
}
.Container input[type="button"]{
    margin-top:1vw;
    padding:1vh 1vw;
    border-radius: 0.3vw;
    height: 2.5vw;
    border:none;
    font-size:1.3vw;
    font-family: 'Nunito';
    color:rgb(6, 2, 56);
    background:linear-gradient(to right, rgb(65, 227, 255), rgb(43, 255, 220));
}
.Container input[type="button"]:hover{
    /* border:none; */
    transform: translate(0,-3px);
    cursor:pointer;
    transition:0.5s;
    background:linear-gradient(to right, rgb(65, 255, 166), rgb(43, 255, 220)) ;
    /* background-color:rgb(182, 241, 64); */
}
.Container input[type="button"]:active{
    background-color:rgba(72, 217, 253, 0.835);
    transform: translate(0,5px);
}
</style>