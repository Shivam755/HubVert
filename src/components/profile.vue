<template>
    <div v-if="id === null">
        <Forbidden />
    </div>
   <div v-else>
       <Nav :avatar="avatar"/>
       <div class="container">
            <div class="main">
                <div class="align">
                    <div class="pic">
                        <img :src="avatar" id='profilePic' alt="avatar" width="300" height="320">
                        <router-link to="/changeProfilePic"><button class="edit">✏️</button></router-link>
                    </div>
                    <div class="details">
                        <div class='content'>
                            <label for="name"><strong> Name: {{name}} </strong></label>
                            <label for="userid"><b>User ID: {{userId}} </b></label>
                            <label for="dob"> <strong> Date of Birth: {{dob}}</strong></label>
                            <label for="gender"><b> Gender: {{gender}} </b></label>
                            <label for="email"><b>Email ID: {{email}} </b></label>
                        </div>
                    </div>
                    <div class="top">
                        <button id="logout" @click.prevent = "logout()"><i class="fa fa-power-off"></i></button>
                    </div>
                </div>
                    <label id="interest" for="interest"><b class="label">Interests: </b>
                    <span v-for ="interest in userInterests" :key="interest.id">{{interest.topic}}{{interest.icon}},</span></label>
                <div class="bottom">
                    <div class="interest_bldup">
                    <button style="margin-left: 20vw;" class="interest-hover color-3" @click="askInterest()">Edit Interest</button>
                    </div>
                    <router-link to='/changePassword'><button id="editpass" @mouseover="symbol()" @mouseout=text()>Change Password</button></router-link>
                    <button id="delete" @click="deleteAccount()"><i class="fa fa-trash"></i></button>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SHA256 from 'crypto-js/sha256';
import Swal from 'sweetalert2';
import router from '../router/index';

import {Users,interests} from "../database";
import Nav from "./nav.vue";
import Forbidden from './forbidden.vue';

export default {
    data: ()=> {
        return{
            avatar:'',
            name:'',
            gender:'',
            dob:'',
            email:'',
            userId:'',
            userInterests:[],
            id:''
        }
    },
    components:{
        Forbidden,
        Nav
    },
    methods:{
        logout:function(){
            Swal.fire({
            title: 'Do you really want to log out?',
            icon:'question',
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Thanks for visiting.See you soon!','','success').then(()=>{
                        sessionStorage.clear();
                        router.push('/');
                    });
                    
                } else if (result.isDenied) {
                    Swal.fire("We're glad you decided to stay!", "", "info")
                }
            })
        },
        symbol:()=>{
            document.getElementById("editpass").innerHTML = `<i class="fa fa-key"><i>`
        },
        text:()=>{
            document.getElementById("editpass").innerHTML = "Change password"
        },
        askInterest:function(){
            let interestHtml = `<form name="InterestForm">`;
            for (let i = 0; i < interests.length; i++){
                let checked = false;
                for (let j = 0; j < this.userInterests.length; j++){
                    if (this.userInterests[j].id === interests[i].id){
                        checked = true;
                        break;
                    }
                }
                interestHtml += `<input type="checkbox" name="interest" id=${interests[i].topic} ${checked?"checked":""}  /> 
                <label for=${interests[i].topic}>${interests[i].topic}${interests[i].icon}</label> `;
            }
            interestHtml += `</form>`
            this.userInterests = [];
            Swal.fire({
                icon: 'info',
                title: 'Please select some of the interests',
                html: interestHtml,
                confirmButtonText: 'Done'
            }).then(()=>{
                for(let i=0; i<document.InterestForm.length;i++){
                    if (document.InterestForm.elements[i].type == 'checkbox' && document.InterestForm.elements[i].checked){
                        for(let j=0; j<interests.length; j++){
                            console.log(interests[j].topic,document.InterestForm.elements[i].id);
                            
                            if(interests[j].topic === document.InterestForm.elements[i].id){
                                this.userInterests.push(interests[j]);
                                console.log(interests[j]);
                                break;
                            }
                        }
                    }
                }
                if(Users.UpdateInterest(this.userId, this.userInterests)){
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
        },
        deleteAccount:function(){
            Swal.fire({
                icon:'warning',
                title:"Do you really want to delete this account?",
                text:"You won't be able to recover any of the info once the account is deleted!!",
                showDenyButton:true,
                confirmButtonText:'Yes',
                denyButtonText:'No'
            }).then((result)=>{
                if(result.isConfirmed){
                    if(Users.DeleteUser(this.userId)){
                        Swal.fire({
                            icon:'success',
                            title:'Account deletion successful',
                            text:"We hope you had a great time here!"
                        });
                        sessionStorage.clear();
                        router.push('/');
                    }else{
                        Swal.fire({
                            icon:'error',
                            title:"Couldn't find your account!!",
                            text:"We're having some problems at the server. Please bare with us"
                        });
                    }
                }else{
                    Swal.fire({
                        icon:'success',
                        title:'Account deletion aborted',
                        text:"Thank you for staying with us!!!"
                    });
                }
            });
            
        }
    },
    mounted: function () {
        this.id= JSON.parse(sessionStorage.getItem("User"));
        if (this.id){
            for(let i=0; i<Users.users.length; i++) {
                if (SHA256(Users.users[i].email).toString() === this.id.toString()) {
                    this.userId=Users.users[i].id
                    this.name= Users.users[i].name;
                    this.gender=Users.users[i].gender;
                    this.dob=Users.users[i].dob;
                    this.email=Users.users[i].email;
                    this.avatar=require("../assets/"+Users.users[i].avatar);
                    this.userInterests=Users.users[i].interest;
                }
            }
        }
        return;
    }
}
</script>


<style scoped>
label{
    font-size: 2vw;
    font-family: 'Merriweather', cursive;
    color:rgb(71, 13, 25);
    padding:1vw 0vw
}
.container{
    display: flex;
    flex-direction: column;
    background-image:url('../assets/profileBack3.jpg');
    background-repeat: no-repeat;
    background-size:cover;
    justify-content: center;
    align-items: center;
}
.top{
    display: flex;
    flex-direction:column;
    /* justify-content: center; */
    padding:2vw;
}
.main{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin:2vw 0vw;
    width:80vw;
    padding:2vw 1vw;
    border-radius: 1vw;
    background: linear-gradient(
        114deg,
        rgba(255, 255, 255, 0.48) 1.41%,
        rgba(255, 255, 255, 0.34) 99.96%
    );
    backdrop-filter: blur(12px);
    border: 1px solid rgba(80, 80, 80, 0.445);
    background-repeat: no-repeat;
}
.align{
    display: flex;
    justify-content: space-between;

}
.pic{
    margin: 0vw 3vw;
    align-items: center ;
    justify-content: center;
    align-self: flex-start;
    position:relative;
}
.edit{
    position: absolute;
    top:18vw;
    right:3vw;
    border-radius:50vw;
    height:3.5vw;
    width:3.5vw;
    outline:0;
    border:0;
    z-index:5;
    background:#ffc9da;
    border: 0.2vw solid black;
    color:white;
    font-size: 1.5vw;
    box-shadow: 0.1vw 0.2vw 0.2vw grey;
}
.edit:hover{
    cursor:pointer;
}
.details{
    display: flex;
    flex-direction: column;
}
.content{
    display: flex;
    /* margin: 5vw 0vw; */
    flex-direction: column;
    height: 20vw;
    padding:2vw;
    justify-content: space-evenly;
}
.bottom{
    display: flex;
    justify-content: space-between;
}
.label{
    font-size: 3vw;
    font-family: 'Oleo Script', cursive;
    font-weight:bolder;
    background:linear-gradient(to right,rgb(74, 232, 253), rgb(60, 78, 243), rgb(159, 5, 230));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
#editpass{
    /* width: 15vw;
    height: 7vh; */
    margin: 2vw 2vw;
    padding: 1.5vw 2vw;
    font-family:"Concert One", cursive;
    font-size:1.5vw;
    border-radius:0.6vw;
    border:none;
    background:pink;
    border-radius: 50px;
    box-shadow: 0 4px 15px 0 rgba(107, 107, 107, 0.75);
}

#editpass:hover{
    background:linear-gradient(to right,rgb(81, 204, 253), rgb(108, 154, 252));
    border-radius:50px;
    border:black;
    cursor: pointer;
}
#editpass:hover{
   
}
#delete{
    border-radius:50vw;
    width: 5vw;
    height: 5vw;
    margin: 2vw 2vw;
    font-size: 3vw;
    background-color:white;
    color:red;
    align-self: flex-end;
}
#delete:active{
    background-color:red;
    color: white;
}
#delete:hover{
    cursor:pointer;
}
#logout{
    align-self: flex-start;
    border-radius:50vw;
    width: 5vw;
    height: 5vw;
    font-size: 3vw;
    background-color:white;
    color:red;
}
#logout:active{
    background-color:red;
    color: white;
}
#logout:hover{
    cursor:pointer;
}

#interest{
    padding:0;
    margin:0vw 3vw;
    text-align:center;
}

.interest_bldup{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.interest{
    margin: 10%;
    text-align: center;
}

.interest-hover {
    margin: 2vw 2vw;
    padding: 1.5vw 2vw;
    font-family:"Concert One", cursive;
    font-size:1.5vw;
    /* border-radius:0.6vw; */
    /* border:none; */
    /* width: 200px; */
    /* font-size: 16px; */
    /* font-weight: 600; */
    color: rgb(0, 0, 0);
    font-family: "Concert One",cursive;
    cursor: pointer;
    /* margin: 20px; */
    /* height: 55px; */
    text-align:center;
    border: none;
    background-size: 300% 100%;

    
    border-radius: 50px;
    transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.interest-hover:hover {
    /* -webkit-box-sizing: border-box; */
    /* -moz-box-sizing: border-box; */
    /* box-sizing: border-box; */
    background-position: 100% 0;
    transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.interest-hover:focus {
    /* -webkit-box-sizing: border-box; */
    /* -moz-box-sizing: border-box; */
    /* box-sizing: border-box; */
    /* box-sizing: border-box; */
    outline: none;
}

.interest-hover.color-3 {
    /* background-image: linear-gradient(to right, #667eea, #764ba2, #6B8DD6, #8E37D7); */
    background-image: linear-gradient(to right, rgb(86, 48, 192), rgb(74, 187, 253));
    box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}


#profilePic
{
    width: 20vw;
    height: 20vw;
    padding:0.8vw;
    background-color: white ;
    border:0.3vw solid black;
    border-radius: 50%;
}
</style>